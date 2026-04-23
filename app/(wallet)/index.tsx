import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { openTripDocument } from '@/store/walletViewer';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { DocumentType, DOCUMENT_TYPE_LABELS, TripDocument } from '@/constants/data';
import { useStore } from '@/store/useStore';
import { DocumentCard } from '@/components/DocumentCard';
import { useTheme } from '@/hooks/useTheme';

export default function WalletHomeScreen() {
  const { colors, isDark } = useTheme();
  const trips = useStore((s) => s.trips);
  const subscription = useStore((s) => s.subscription);
  const getAllDocuments = useStore((s) => s.getAllDocuments);
  const addDocument = useStore((s) => s.addDocument);
  const removeDocument = useStore((s) => s.removeDocument);
  const [docs, setDocs] = useState<TripDocument[]>([]);
  const documentTypes = Object.keys(DOCUMENT_TYPE_LABELS) as DocumentType[];
  const isPremium = subscription.plan !== 'none'
    && Boolean(subscription.expiresAt)
    && new Date(subscription.expiresAt as string).getTime() > Date.now();

  const loadDocs = useCallback(async () => {
    const items = await getAllDocuments();
    setDocs(items);
  }, [getAllDocuments]);

  React.useEffect(() => {
    void loadDocs();
  }, [loadDocs]);

  const docsByTrip = useMemo(() => {
    const map = new Map<string, TripDocument[]>();
    for (const doc of docs) {
      const bucket = map.get(doc.tripId) ?? [];
      bucket.push(doc);
      map.set(doc.tripId, bucket);
    }
    return map;
  }, [docs]);

  const handleOpenDocument = async (doc: TripDocument) => {
    await openTripDocument(doc);
  };

  const handleDeleteDocument = (doc: TripDocument) => {
    Alert.alert('Удалить документ', `Удалить «${doc.name}»?`, [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => {
          void removeDocument(doc.id).then(loadDocs);
        },
      },
    ]);
  };

  const handlePickDocument = async (tripId: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/jpeg', 'image/png'],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (result.canceled || !result.assets[0]) return;
    const asset = result.assets[0];

    const buttons = documentTypes.map((type) => ({
      text: DOCUMENT_TYPE_LABELS[type],
      onPress: () => {
        void addDocument(
          tripId,
          {
            uri: asset.uri,
            name: asset.name ?? 'Документ',
            mimeType: asset.mimeType ?? 'application/octet-stream',
            size: asset.size ?? 0,
          },
          type
        ).then((res) => {
          if (!res.ok) {
            Alert.alert('Ошибка', res.message ?? 'Не удалось добавить документ');
            return;
          }
          void loadDocs();
        });
      },
    }));

    Alert.alert('Тип документа', 'Выберите тип документа', [
      ...buttons,
      { text: 'Отмена', style: 'cancel' },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <StatusBar style={isPremium ? 'light' : (isDark ? 'light' : 'dark')} />
      {!isPremium ? (
        <View style={styles.gateWrap}>
          <View style={[styles.gateCard, { borderColor: colors.border, backgroundColor: colors.surface }]}> 
            <Text style={styles.gateEmoji}>🔒</Text>
            <Text style={[styles.gateTitle, { color: colors.text }]}>Travel Wallet — функция Premium</Text>
            <Text style={[styles.gateText, { color: colors.textSecondary }]}>
              Оформи Premium, чтобы хранить билеты, брони и документы поездок в одном месте.
            </Text>
            <TouchableOpacity style={[styles.gateBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/(premium)' as never)}>
              <Text style={[styles.gateBtnText, { color: colors.textInverse }]}>Открыть Premium</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={[styles.header, { backgroundColor: colors.primary }]}> 
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={colors.textInverse} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[styles.headerTitle, { color: colors.textInverse }]}>Travel Wallet</Text>
              <Text style={[styles.headerSubtitle, { color: `${colors.textInverse}D9` }]}>Билеты, брони и документы поездок</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {trips.length === 0 ? (
              <View style={[styles.emptyStateCard, { borderColor: colors.border, backgroundColor: colors.surface }]}> 
                <Text style={[styles.emptyStateTitle, { color: colors.text }]}>Поездок пока нет</Text>
                <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>Создайте поездку, чтобы сохранять билеты и брони в Wallet.</Text>
              </View>
            ) : trips.map((trip) => {
              const tripDocs = docsByTrip.get(trip.id) ?? [];
              return (
                <View key={trip.id} style={[styles.tripCard, { borderColor: colors.border, backgroundColor: colors.surface }]}> 
                  <View style={styles.tripHead}>
                    <View>
                      <Text style={[styles.tripTitle, { color: colors.text }]}>{trip.to}</Text>
                      <Text style={[styles.tripMeta, { color: colors.textSecondary }]}>{trip.startDate} — {trip.endDate}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.openTripBtn, { borderColor: colors.border, backgroundColor: colors.surfaceAlt }]}
                      onPress={() => router.push(`/(wallet)/trip/${trip.id}` as never)}
                    >
                      <Text style={[styles.openTripBtnText, { color: colors.text }]}>Открыть</Text>
                    </TouchableOpacity>
                  </View>

                  {tripDocs.length > 0 ? (
                    <View style={styles.docsList}>
                      {tripDocs.map((doc) => (
                        <DocumentCard
                          key={doc.id}
                          doc={doc}
                          onOpen={() => void handleOpenDocument(doc)}
                          onDelete={() => handleDeleteDocument(doc)}
                        />
                      ))}
                    </View>
                  ) : (
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Документов пока нет</Text>
                  )}

                  <TouchableOpacity
                    style={[styles.addBtn, { borderColor: `${colors.primary}40`, backgroundColor: `${colors.primary}12` }]}
                    onPress={() => void handlePickDocument(trip.id)}
                  >
                    <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
                    <Text style={[styles.addBtnText, { color: colors.primary }]}>Добавить документ</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 52,
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: Typography.sizes.sm,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  tripCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  tripHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  tripTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  tripMeta: {
    marginTop: 2,
    fontSize: Typography.sizes.sm,
  },
  openTripBtn: {
    height: 34,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openTripBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.medium,
  },
  docsList: {
    gap: 8,
  },
  emptyText: {
    fontSize: Typography.sizes.sm,
  },
  addBtn: {
    height: 40,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  emptyStateCard: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
  },
  emptyStateTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  emptyStateText: {
    marginTop: 4,
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
  gateWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  gateCard: {
    width: '100%',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  gateEmoji: {
    fontSize: 28,
  },
  gateTitle: {
    marginTop: 8,
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
  },
  gateText: {
    marginTop: 8,
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  gateBtn: {
    marginTop: Spacing.lg,
    height: 42,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gateBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});
