import { create } from 'zustand';
import {
  Trip,
  TravelStyle,
  TravelerType,
  MOCK_TRIPS,
} from '@/constants/data';
import { deleteTripFromDb, fetchTripsFromDb, resetTripsDb, upsertTripToDb } from '@/store/tripsDb';
import { generateTripFromForm } from '@/store/tripGenerator';
import {
  changePasswordForUser,
  hydrateAuthStorage,
  loginUser,
  logoutUser,
  registerUser,
  resetAuthStorage,
  resetPasswordByEmail,
} from '@/store/authStorage';

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

interface TripForm {
  from: string;
  to: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  interests: string[];
  travelStyle: TravelStyle;
}

interface AppStore {
  user: UserProfile;
  trips: Trip[];
  tripForm: TripForm;
  generatedTrip: Trip | null;
  favorites: string[];
  tripsHydrated: boolean;
  authHydrated: boolean;

  setUser: (user: Partial<UserProfile>) => void;
  hydrateAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ ok: boolean; message?: string }>;
  recoverPassword: (email: string, newPassword: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
  completeOnboarding: (interests: string[], style: TravelStyle, type: TravelerType) => void;

  updateTripForm: (form: Partial<TripForm>) => void;
  resetTripForm: () => void;
  hydrateTrips: () => Promise<void>;
  generateTrip: (input?: Partial<TripForm>) => void;
  clearGeneratedTrip: () => void;
  saveTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  resetDemoData: () => Promise<void>;

  toggleFavorite: (routeId: string) => void;
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
  tripsHydrated: false,
  authHydrated: false,

  setUser: (userData) =>
    set((state) => ({ user: { ...state.user, ...userData } })),

  hydrateAuth: async () => {
    try {
      const { sessionUser } = await hydrateAuthStorage();
      if (sessionUser) {
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

      set({ authHydrated: true });
    } catch (error) {
      console.warn('Failed to hydrate auth session', error);
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

  logout: async () => {
    await logoutUser();
    set((state) => ({
      user: {
        ...state.user,
        isLoggedIn: false,
        name: '',
        email: '',
      },
    }));
  },

  completeOnboarding: (interests, style, type) =>
    set((state) => ({
      user: {
        ...state.user,
        interests,
        travelStyle: style,
        travelerType: type,
        onboardingCompleted: true,
      },
    })),

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
    set({ generatedTrip: generated });
  },

  clearGeneratedTrip: () => set({ generatedTrip: null }),

  saveTrip: (trip) =>
    set((state) => {
      const savedTrip: Trip = { ...trip, status: 'upcoming' };
      void upsertTripToDb(savedTrip).catch((error) => {
        console.warn('Failed to save trip to database', error);
      });

      const nextTrips = sortTripsForUi([
        ...state.trips.filter((t) => t.id !== savedTrip.id),
        savedTrip,
      ]);

      return {
        trips: nextTrips,
        generatedTrip: null,
      };
    }),

  deleteTrip: (id) =>
    set((state) => {
      void deleteTripFromDb(id).catch((error) => {
        console.warn('Failed to delete trip from database', error);
      });

      return {
        trips: state.trips.filter((t) => t.id !== id),
      };
    }),

  resetDemoData: async () => {
    const wasLoggedIn = get().user.isLoggedIn;
    const prevUser = get().user;

    await resetTripsDb({ reseed: true });
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
      favorites: [],
      authHydrated: true,
      tripsHydrated: true,
    });
  },

  toggleFavorite: (routeId) =>
    set((state) => ({
      favorites: state.favorites.includes(routeId)
        ? state.favorites.filter((id) => id !== routeId)
        : [...state.favorites, routeId],
    })),
}));


