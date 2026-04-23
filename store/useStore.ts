import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';
import {
  DocumentType,
  Place,
  Review,
  Trip,
  TripDocument,
  TravelStyle,
  TravelerType,
  MOCK_TRIPS,
} from '@/constants/data';
import { deleteTripFromDb, fetchTripsFromDb, resetTripsDb, upsertTripToDb } from '@/store/tripsDb';
import { generateTripFromForm } from '@/store/tripGenerator';
import { generateTripWithAI } from '@/store/aiTripGenerator';
import {
  changePasswordForUser,
  deleteAccountForUser,
  hydrateAuthStorage,
  loginUser,
  logoutUser,
  oauthLoginUser,
  registerUser,
  resetAuthStorage,
  resetPasswordByEmail,
} from '@/store/authStorage';
import {
  cancelTripNotifications,
  clearAllTripNotifications,
  scheduleTripNotifications,
} from '@/store/notificationsService';
import {
  addDocument as addDocumentDb,
  clearAllDocuments as clearAllDocumentsDb,
  deleteDocumentsByTripId,
  deleteDocument as deleteDocumentDb,
  getAllDocuments as getAllDocumentsDb,
  getDocuments as getDocumentsDb,
} from '@/store/walletDb';
import { clearCachedTrips, removeCachedTrip } from '@/store/offlineService';
import {
  addReview as addReviewDb,
  clearAllReviews as clearAllReviewsDb,
  deleteReview as deleteReviewDb,
  getAllReviews as getAllReviewsDb,
  getReviewsForPlace as getReviewsForPlaceDb,
} from '@/store/reviewsDb';
import {
  FREE_TRIP_LIMIT,
  SubscriptionPlan,
  SubscriptionState,
  countTripsThisMonth,
  isPremiumActive,
  loadSubscriptionState,
  saveSubscriptionState,
} from '@/store/subscriptionService';
import { setAnalyticsUser, track } from '@/store/analyticsService';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  interests: string[];
  travelStyle: TravelStyle;
  travelerType: TravelerType;
  isLoggedIn: boolean;
  onboardingCompleted: boolean;
}

export interface TripForm {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
  travelStyle: TravelStyle;
  preferredHotel: string;
  preferredHotelPricePerNight: number;
  preferredHotelRoomCapacity: number;
  preferredTransportType: 'flight' | 'train' | 'bus' | '';
  preferredTransportCarrier: string;
  preferredTransportTotalPrice: number;
  needsAccessibility: boolean;
}

interface AppStore {
  user: UserProfile;
  trips: Trip[];
  tripForm: TripForm;
  generatedTrip: Trip | null;
  favorites: string[];
  subscription: SubscriptionState;
  tripsHydrated: boolean;
  authHydrated: boolean;
  generatingWithAI: boolean;
  lastGenerationWasAI: boolean;

  setUser: (user: Partial<UserProfile>) => void;
  hydrateAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ ok: boolean; message?: string }>;
  recoverPassword: (email: string, newPassword: string) => Promise<{ ok: boolean; message?: string }>;
  oauthLogin: (provider: 'yandex' | 'google' | 'apple', idToken: string, user: { email: string; name: string }) => Promise<{ ok: boolean; message?: string }>;
  deleteAccount: () => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  completeOnboarding: (interests: string[], style: TravelStyle, type: TravelerType) => void;

  updateTripForm: (form: Partial<TripForm>) => void;
  resetTripForm: () => void;
  hydrateTrips: () => Promise<void>;
  generateTrip: (input?: Partial<TripForm>) => void;
  generateTripAI: () => Promise<void>;
  clearGeneratedTrip: () => void;
  saveTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  resetDemoData: () => Promise<void>;

  toggleFavorite: (routeId: string) => void;
  loadSubscription: () => Promise<void>;
  activateSubscription: (plan: SubscriptionPlan, expiresAt: string) => Promise<void>;
  isPremium: () => boolean;
  canCreateTrip: () => boolean;
  setTripExpense: (tripId: string, category: keyof NonNullable<Trip['expenses']>, amount: number) => void;
  addPlaceToGeneratedDay: (dayIndex: number, place: Place) => void;
  removePlaceFromGeneratedDay: (dayIndex: number, placeId: string) => void;
  movePlaceInGeneratedDay: (dayIndex: number, fromIndex: number, toIndex: number) => void;
  addPlaceToDay: (tripId: string, dayIndex: number, place: Place) => void;
  removePlaceFromDay: (tripId: string, dayIndex: number, placeId: string) => void;
  movePlaceInDay: (tripId: string, dayIndex: number, fromIndex: number, toIndex: number) => void;
  addDocument: (
    tripId: string,
    asset: { uri: string; name: string; mimeType: string; size: number },
    type: DocumentType
  ) => Promise<{ ok: boolean; message?: string }>;
  removeDocument: (docId: string) => Promise<void>;
  getDocumentsForTrip: (tripId: string) => Promise<TripDocument[]>;
  getAllDocuments: () => Promise<TripDocument[]>;
  addReview: (review: Review) => Promise<void>;
  getReviewsForPlace: (placeId: string) => Promise<Review[]>;
  getMyReviews: () => Promise<Review[]>;
  deleteReview: (reviewId: string) => Promise<void>;
}

const defaultTripForm: TripForm = {
  from: '',
  to: '',
  startDate: '',
  endDate: '',
  budget: 30000,
  travelers: 1,
  interests: [],
  travelStyle: 'standard',
  preferredHotel: '',
  preferredHotelPricePerNight: 0,
  preferredHotelRoomCapacity: 0,
  preferredTransportType: '',
  preferredTransportCarrier: '',
  preferredTransportTotalPrice: 0,
  needsAccessibility: false,
};


function sortTripsForUi(trips: Trip[]): Trip[] {
  const statusPriority: Record<Trip['status'], number> = {
    upcoming: 0,
    draft: 1,
    past: 2,
  };

  return [...trips].sort((a, b) => {
    const statusDiff = statusPriority[a.status] - statusPriority[b.status];
    if (statusDiff !== 0) return statusDiff;

    if (a.status === 'past') {
      return b.startDate.localeCompare(a.startDate);
    }

    return a.startDate.localeCompare(b.startDate);
  });
}

function normalizePlaceTime(index: number): string {
  const defaults = ['10:00', '13:00', '16:00', '19:00', '21:00'];
  return defaults[index] ?? `${String(Math.min(23, 10 + index * 2)).padStart(2, '0')}:00`;
}

function withPlaceDefaults(place: Place, currentDayPlaces: Place[]): Place {
  const safeId = place.id?.trim() ? place.id : `place-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  return {
    ...place,
    id: safeId,
    time: place.time?.trim() ? place.time : normalizePlaceTime(currentDayPlaces.length),
    duration: place.duration?.trim() ? place.duration : '1.5 часа',
    rating: Number.isFinite(place.rating) ? place.rating : 4.5,
    address: place.address?.trim() ? place.address : '',
    emoji: place.emoji?.trim() ? place.emoji : '📍',
  };
}

function applyTimeByOrder(places: Place[]): Place[] {
  return places.map((place, index) => ({
    ...place,
    time: normalizePlaceTime(index),
  }));
}

function moveItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) return items;
  if (fromIndex < 0 || toIndex < 0 || fromIndex >= items.length || toIndex >= items.length) return items;
  const copy = [...items];
  const [moved] = copy.splice(fromIndex, 1);
  if (!moved) return items;
  copy.splice(toIndex, 0, moved);
  return copy;
}

export const useStore = create<AppStore>((set, get) => ({
  user: {
    name: '',
    email: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    interests: ['museums', 'food', 'architecture', 'nature'],
    travelStyle: 'standard',
    travelerType: 'solo',
    isLoggedIn: false,
    onboardingCompleted: true,
  },
  trips: [],
  tripForm: defaultTripForm,
  generatedTrip: null,
  favorites: [],
  subscription: { plan: 'none', expiresAt: null, originalOrderId: null },
  tripsHydrated: false,
  authHydrated: false,
  generatingWithAI: false,
  lastGenerationWasAI: false,

  setUser: (userData) =>
    set((state) => ({ user: { ...state.user, ...userData } })),

  hydrateAuth: async () => {
    try {
      const { sessionUser } = await hydrateAuthStorage();
      const subscription = await loadSubscriptionState();
      set({ subscription });
      if (sessionUser) {
        void setAnalyticsUser(sessionUser.email);
        set((state) => ({
          user: {
            ...state.user,
            email: sessionUser.email,
            name: sessionUser.name,
            isLoggedIn: true,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${sessionUser.email}`,
          },
          authHydrated: true,
        }));
        return;
      }

      void setAnalyticsUser(null);
      set({ authHydrated: true });
    } catch (error) {
      console.warn('Failed to hydrate auth session', error);
      void setAnalyticsUser(null);
      set({ authHydrated: true });
    }
  },

  login: async (email, password) => {
    const result = await loginUser(email, password);
    if (!result.ok) {
      return { ok: false, message: result.message };
    }

    set((state) => ({
      user: {
        ...state.user,
        email: result.user.email,
        name: result.user.name,
        isLoggedIn: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.user.email}`,
      },
    }));
    void setAnalyticsUser(result.user.email);
    return { ok: true };
  },

  register: async (name, email, password) => {
    const result = await registerUser(name, email, password);
    if (!result.ok) {
      return { ok: false, message: result.message };
    }
    return { ok: true };
  },

  changePassword: async (currentPassword, newPassword) => {
    const email = get().user.email;
    if (!email) {
      return { ok: false, message: 'Сессия не найдена, выполните вход' };
    }
    const result = await changePasswordForUser(email, currentPassword, newPassword);
    if (!result.ok) {
      return { ok: false, message: result.message };
    }
    return { ok: true };
  },

  recoverPassword: async (email, newPassword) => {
    const result = await resetPasswordByEmail(email, newPassword);
    if (!result.ok) {
      return { ok: false, message: result.message };
    }
    return { ok: true };
  },

  oauthLogin: async (provider, idToken, oauthUser) => {
    const result = await oauthLoginUser(provider, idToken, oauthUser);
    if (!result.ok) {
      return { ok: false, message: result.message };
    }
    set((state) => ({
      user: {
        ...state.user,
        email: result.user.email,
        name: result.user.name,
        isLoggedIn: true,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${result.user.email}`,
      },
    }));
    void setAnalyticsUser(result.user.email);
    return { ok: true };
  },

  deleteAccount: async () => {
    const result = await deleteAccountForUser();
    if (!result.ok) {
      return { ok: false, message: result.message };
    }
    await clearAllDocumentsDb();
    await clearAllReviewsDb();
    await clearCachedTrips();
    set((state) => ({
      user: {
        ...state.user,
        isLoggedIn: false,
        name: '',
        email: '',
      },
      trips: [],
      favorites: [],
      subscription: { plan: 'none', expiresAt: null, originalOrderId: null },
      generatedTrip: null,
      generatingWithAI: false,
      lastGenerationWasAI: false,
    }));
    void setAnalyticsUser(null);
    return { ok: true };
  },

  logout: async () => {
    await logoutUser();
    set((state) => ({
      user: {
        ...state.user,
        isLoggedIn: false,
        name: '',
        email: '',
      },
      subscription: { plan: 'none', expiresAt: null, originalOrderId: null },
      generatedTrip: null,
      generatingWithAI: false,
      lastGenerationWasAI: false,
    }));
    void setAnalyticsUser(null);
  },

  completeOnboarding: (interests, style, type) =>
    set((state) => {
      void track('onboarding_completed', { interestsCount: interests.length, style, travelerType: type });
      return {
        user: {
          ...state.user,
          interests,
          travelStyle: style,
          travelerType: type,
          onboardingCompleted: true,
        },
      };
    }),

  updateTripForm: (form) =>
    set((state) => ({ tripForm: { ...state.tripForm, ...form } })),

  resetTripForm: () => set({ tripForm: defaultTripForm }),

  hydrateTrips: async () => {
    try {
      const dbTrips = await fetchTripsFromDb();
      set({
        trips: dbTrips.length > 0 ? sortTripsForUi(dbTrips) : sortTripsForUi(MOCK_TRIPS),
        tripsHydrated: true,
      });
    } catch (error) {
      console.warn('Failed to hydrate trips from database', error);
      set({
        trips: sortTripsForUi(MOCK_TRIPS),
        tripsHydrated: true,
      });
    }
  },

  generateTrip: (input) => {
    const current = get().tripForm;
    const nextForm = input ? { ...current, ...input } : current;
    const generated = generateTripFromForm(nextForm);
    set({ generatedTrip: generated, lastGenerationWasAI: false });
  },

  generateTripAI: async () => {
    const form = get().tripForm;

    if (!get().isPremium()) {
      get().generateTrip();
      void track('ai_generation_fallback', { reason: 'free_plan' });
      void track('trip_created', { source: 'template' });
      return;
    }

    void track('ai_generation_started', { to: form.to || '' });
    set({ generatingWithAI: true, generatedTrip: null, lastGenerationWasAI: false });
    try {
      const fallback = () => generateTripFromForm(form);
      const { trip, generatedByAI } = await generateTripWithAI(form, fallback);
      set({
        generatedTrip: trip,
        generatingWithAI: false,
        lastGenerationWasAI: generatedByAI,
      });
      void track(generatedByAI ? 'ai_generation_success' : 'ai_generation_fallback', {
        to: form.to || '',
      });
      void track('trip_created', { source: generatedByAI ? 'ai' : 'template' });
    } catch (error) {
      console.warn('AI generation failed, fallback used', error);
      const generated = generateTripFromForm(form);
      set({
        generatedTrip: generated,
        generatingWithAI: false,
        lastGenerationWasAI: false,
      });
      void track('ai_generation_fallback', { reason: 'exception' });
      void track('trip_created', { source: 'template' });
    }
  },

  clearGeneratedTrip: () => set({ generatedTrip: null, generatingWithAI: false, lastGenerationWasAI: false }),

  saveTrip: (trip) =>
    set((state) => {
      const savedTrip: Trip = { ...trip, status: 'upcoming' };
      void upsertTripToDb(savedTrip).catch((error) => {
        console.warn('Failed to save trip to database', error);
      });
      void scheduleTripNotifications({
        id: savedTrip.id,
        to: savedTrip.to,
        startDate: savedTrip.startDate,
        endDate: savedTrip.endDate,
      }).catch(() => {});

      const nextTrips = sortTripsForUi([
        ...state.trips.filter((t) => t.id !== savedTrip.id),
        savedTrip,
      ]);
      void track('trip_saved', { to: savedTrip.to, days: savedTrip.days.length });

      return {
        trips: nextTrips,
        generatedTrip: null,
        generatingWithAI: false,
        lastGenerationWasAI: false,
      };
    }),

  deleteTrip: (id) =>
    set((state) => {
      void deleteTripFromDb(id).catch((error) => {
        console.warn('Failed to delete trip from database', error);
      });
      void cancelTripNotifications(id).catch(() => {});
      void deleteDocumentsByTripId(id).catch(() => {});
      void removeCachedTrip(id).catch(() => {});
      void track('trip_deleted', { tripId: id });

      return {
        trips: state.trips.filter((t) => t.id !== id),
      };
    }),

  resetDemoData: async () => {
    const wasLoggedIn = get().user.isLoggedIn;
    const prevUser = get().user;

    await resetTripsDb({ reseed: true });
    await clearAllTripNotifications();
    await clearAllDocumentsDb();
    await clearAllReviewsDb();
    await clearCachedTrips();
    if (!wasLoggedIn) {
      await resetAuthStorage();
    }

    const refreshedTrips = await fetchTripsFromDb();

    set({
      user: wasLoggedIn
        ? prevUser
        : {
            name: '',
            email: '',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
            interests: ['museums', 'food', 'architecture', 'nature'],
            travelStyle: 'standard',
            travelerType: 'solo',
            isLoggedIn: false,
            onboardingCompleted: true,
          },
      trips: sortTripsForUi(refreshedTrips),
      tripForm: defaultTripForm,
      generatedTrip: null,
      generatingWithAI: false,
      lastGenerationWasAI: false,
      favorites: [],
      subscription: wasLoggedIn
        ? get().subscription
        : { plan: 'none', expiresAt: null, originalOrderId: null },
      authHydrated: true,
      tripsHydrated: true,
    });
  },

  setTripExpense: (tripId, category, amount) =>
    set((state) => {
      const updatedTrips = state.trips.map((t) => {
        if (t.id !== tripId) return t;
        const updated: Trip = {
          ...t,
          expenses: { ...t.expenses, [category]: amount },
        };
        void upsertTripToDb(updated).catch(() => {});
        return updated;
      });
      const updatedGenerated =
        state.generatedTrip?.id === tripId
          ? { ...state.generatedTrip, expenses: { ...state.generatedTrip.expenses, [category]: amount } }
          : state.generatedTrip;
      return { trips: updatedTrips, generatedTrip: updatedGenerated };
    }),

  addPlaceToGeneratedDay: (dayIndex, place) =>
    set((state) => {
      if (!state.generatedTrip) return state;
      const nextDays = state.generatedTrip.days.map((day, idx) => {
        if (idx !== dayIndex) return day;
        const nextPlace = withPlaceDefaults(place, day.places);
        return { ...day, places: [...day.places, nextPlace] };
      });
      return { generatedTrip: { ...state.generatedTrip, days: nextDays } };
    }),

  removePlaceFromGeneratedDay: (dayIndex, placeId) =>
    set((state) => {
      if (!state.generatedTrip) return state;
      const nextDays = state.generatedTrip.days.map((day, idx) => {
        if (idx !== dayIndex) return day;
        return { ...day, places: day.places.filter((p) => p.id !== placeId) };
      });
      return { generatedTrip: { ...state.generatedTrip, days: nextDays } };
    }),

  movePlaceInGeneratedDay: (dayIndex, fromIndex, toIndex) =>
    set((state) => {
      if (!state.generatedTrip) return state;
      const nextDays = state.generatedTrip.days.map((day, idx) => {
        if (idx !== dayIndex) return day;
        const moved = moveItem(day.places, fromIndex, toIndex);
        return { ...day, places: applyTimeByOrder(moved) };
      });
      return { generatedTrip: { ...state.generatedTrip, days: nextDays } };
    }),

  addPlaceToDay: (tripId, dayIndex, place) =>
    set((state) => {
      let updatedTripForDb: Trip | null = null;
      let updatedDays: Trip['days'] | null = null;
      const nextTrips = state.trips.map((trip) => {
        if (trip.id !== tripId) return trip;
        const nextDays = trip.days.map((day, idx) => {
          if (idx !== dayIndex) return day;
          const nextPlace = withPlaceDefaults(place, day.places);
          return { ...day, places: [...day.places, nextPlace] };
        });
        updatedDays = nextDays;
        updatedTripForDb = { ...trip, days: nextDays };
        return updatedTripForDb;
      });

      if (updatedTripForDb) {
        void upsertTripToDb(updatedTripForDb).catch(() => {});
      }

      const nextGenerated =
        state.generatedTrip?.id === tripId && updatedDays
          ? { ...state.generatedTrip, days: updatedDays }
          : state.generatedTrip;

      return { trips: nextTrips, generatedTrip: nextGenerated };
    }),

  removePlaceFromDay: (tripId, dayIndex, placeId) =>
    set((state) => {
      let updatedTripForDb: Trip | null = null;
      let updatedDays: Trip['days'] | null = null;
      const nextTrips = state.trips.map((trip) => {
        if (trip.id !== tripId) return trip;
        const nextDays = trip.days.map((day, idx) => {
          if (idx !== dayIndex) return day;
          return { ...day, places: day.places.filter((p) => p.id !== placeId) };
        });
        updatedDays = nextDays;
        updatedTripForDb = { ...trip, days: nextDays };
        return updatedTripForDb;
      });

      if (updatedTripForDb) {
        void upsertTripToDb(updatedTripForDb).catch(() => {});
      }

      const nextGenerated =
        state.generatedTrip?.id === tripId && updatedDays
          ? { ...state.generatedTrip, days: updatedDays }
          : state.generatedTrip;

      return { trips: nextTrips, generatedTrip: nextGenerated };
    }),

  movePlaceInDay: (tripId, dayIndex, fromIndex, toIndex) =>
    set((state) => {
      let updatedTripForDb: Trip | null = null;
      let updatedDays: Trip['days'] | null = null;

      const nextTrips = state.trips.map((trip) => {
        if (trip.id !== tripId) return trip;
        const nextDays = trip.days.map((day, idx) => {
          if (idx !== dayIndex) return day;
          const moved = moveItem(day.places, fromIndex, toIndex);
          return { ...day, places: applyTimeByOrder(moved) };
        });
        updatedDays = nextDays;
        updatedTripForDb = { ...trip, days: nextDays };
        return updatedTripForDb;
      });

      if (updatedTripForDb) {
        void upsertTripToDb(updatedTripForDb).catch(() => {});
      }

      const nextGenerated =
        state.generatedTrip?.id === tripId && updatedDays
          ? { ...state.generatedTrip, days: updatedDays }
          : state.generatedTrip;

      return { trips: nextTrips, generatedTrip: nextGenerated };
    }),

  addDocument: async (tripId, asset, type) => {
    try {
      const ext = asset.mimeType === 'application/pdf'
        ? '.pdf'
        : asset.mimeType === 'image/png'
          ? '.png'
          : '.jpg';
      const fileName = `doc_${Date.now()}${ext}`;
      const walletDir = `${FileSystem.documentDirectory}wallet/`;
      const destUri = `${walletDir}${fileName}`;

      await FileSystem.makeDirectoryAsync(walletDir, { intermediates: true });
      await FileSystem.copyAsync({ from: asset.uri, to: destUri });

      const doc: TripDocument = {
        id: `doc_${Date.now()}_${Math.random().toString(36).slice(2)}`,
        tripId,
        type,
        name: asset.name,
        uri: destUri,
        mimeType: asset.mimeType,
        sizeBytes: asset.size,
        uploadedAt: new Date().toISOString(),
      };

      await addDocumentDb(doc);
      void track('wallet_document_added', { type, tripId });
      return { ok: true };
    } catch (error) {
      console.warn('Failed to add wallet document', error);
      return { ok: false, message: 'Не удалось сохранить документ' };
    }
  },

  removeDocument: async (docId) => {
    await deleteDocumentDb(docId);
  },

  getDocumentsForTrip: async (tripId) => {
    return getDocumentsDb(tripId);
  },

  getAllDocuments: async () => {
    return getAllDocumentsDb();
  },

  addReview: async (review) => {
    await addReviewDb(review);
    void track('review_added', { placeId: review.placeId, rating: review.rating });
  },

  getReviewsForPlace: async (placeId) => {
    return getReviewsForPlaceDb(placeId);
  },

  getMyReviews: async () => {
    return getAllReviewsDb();
  },

  deleteReview: async (reviewId) => {
    await deleteReviewDb(reviewId);
  },

  toggleFavorite: (routeId) =>
    set((state) => ({
      favorites: state.favorites.includes(routeId)
        ? state.favorites.filter((id) => id !== routeId)
        : [...state.favorites, routeId],
    })),

  loadSubscription: async () => {
    const state = await loadSubscriptionState();
    set({ subscription: state });
  },

  activateSubscription: async (plan, expiresAt) => {
    const nextState: SubscriptionState = {
      plan,
      expiresAt,
      originalOrderId: null,
    };
    await saveSubscriptionState(nextState);
    set({ subscription: nextState });
  },

  isPremium: () => {
    return isPremiumActive(get().subscription);
  },

  canCreateTrip: () => {
    if (isPremiumActive(get().subscription)) return true;
    return countTripsThisMonth(get().trips) < FREE_TRIP_LIMIT;
  },
}));

