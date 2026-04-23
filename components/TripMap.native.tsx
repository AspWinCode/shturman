import React, { useMemo } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, Polyline } from 'react-native-maps';
import Colors from '@/constants/colors';
import { BorderRadius, Shadows, Spacing, Typography } from '@/constants/theme';
import { DayPlan, Place } from '@/constants/data';
import { track } from '@/store/analyticsService';

interface TripMapProps {
  days: DayPlan[];
  initialCity?: string;
}

interface MapPlace {
  dayIndex: number;
  orderIndex: number;
  place: Place;
  lat: number;
  lng: number;
}

const DAY_COLORS = [Colors.primary, Colors.success, Colors.warning, Colors.secondary, Colors.error];

const DEFAULT_REGION = {
  latitude: 55.7558,
  longitude: 37.6173,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

export function TripMap({ days, initialCity }: TripMapProps) {
  const mapPlaces = useMemo<MapPlace[]>(
    () =>
      days.flatMap((day, dayIndex) =>
        day.places
          .map((place, orderIndex) => {
            if (typeof place.lat !== 'number' || typeof place.lng !== 'number') {
              return null;
            }
            return {
              dayIndex,
              orderIndex,
              place,
              lat: place.lat,
              lng: place.lng,
            };
          })
          .filter((item): item is MapPlace => item !== null)
      ),
    [days]
  );

  if (mapPlaces.length === 0) {
    return (
      <View style={[styles.mapWrap, styles.placeholder]}>
        <Text style={styles.placeholderTitle}>Координаты мест недоступны</Text>
        <Text style={styles.placeholderText}>
          Для поездки{initialCity ? ` в ${initialCity}` : ''} пока нет точек с геопозицией.
        </Text>
      </View>
    );
  }

  const first = mapPlaces[0];
  const initialRegion = {
    latitude: first?.lat ?? DEFAULT_REGION.latitude,
    longitude: first?.lng ?? DEFAULT_REGION.longitude,
    latitudeDelta: DEFAULT_REGION.latitudeDelta,
    longitudeDelta: DEFAULT_REGION.longitudeDelta,
  };

  const openExternalRoute = async (lat: number, lng: number) => {
    void track('yandex_navi_click', { source: 'trip_map', lat, lng });
    const yandexNaviUrl = `yandexnavi://build_route_on_map?lat_to=${lat}&lon_to=${lng}`;
    const googleMapsUrl = `https://maps.google.com/maps?daddr=${lat},${lng}`;
    try {
      const canOpenYandexNavi = await Linking.canOpenURL(yandexNaviUrl);
      if (canOpenYandexNavi) {
        await Linking.openURL(yandexNaviUrl);
        return;
      }
      await Linking.openURL(googleMapsUrl);
    } catch {
      await Linking.openURL(googleMapsUrl);
    }
  };

  return (
    <View style={styles.mapWrap}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {days.map((day, dayIndex) => {
          const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length];
          const dayCoords = day.places
            .filter((place) => typeof place.lat === 'number' && typeof place.lng === 'number')
            .map((place) => ({
              latitude: place.lat as number,
              longitude: place.lng as number,
            }));

          return (
            <React.Fragment key={`day-${day.day}`}>
              {dayCoords.length >= 2 && (
                <Polyline coordinates={dayCoords} strokeColor={dayColor} strokeWidth={3} />
              )}

              {day.places.map((place, orderIndex) => {
                if (typeof place.lat !== 'number' || typeof place.lng !== 'number') {
                  return null;
                }

                return (
                  <Marker
                    key={`day-${day.day}-place-${place.id}-${orderIndex}`}
                    coordinate={{ latitude: place.lat, longitude: place.lng }}
                    pinColor={dayColor}
                  >
                    <Callout tooltip>
                      <View style={styles.callout}>
                        <Text style={styles.calloutTitle}>{place.name}</Text>
                        <Text style={styles.calloutMeta}>День {day.day} · {place.time}</Text>
                        <Text style={styles.calloutMeta}>{place.category}</Text>
                        <TouchableOpacity
                          style={styles.routeBtn}
                          onPress={() => {
                            void openExternalRoute(place.lat as number, place.lng as number);
                          }}
                        >
                          <Text style={styles.routeBtnText}>Маршрут</Text>
                        </TouchableOpacity>
                      </View>
                    </Callout>
                  </Marker>
                );
              })}
            </React.Fragment>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    height: 430,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    ...Shadows.card,
  },
  map: {
    flex: 1,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  placeholderTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  callout: {
    width: 220,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: 4,
    ...Shadows.card,
  },
  calloutTitle: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
    fontWeight: Typography.weights.bold,
  },
  calloutMeta: {
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
  },
  routeBtn: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 8,
    alignItems: 'center',
  },
  routeBtnText: {
    color: Colors.textInverse,
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});
