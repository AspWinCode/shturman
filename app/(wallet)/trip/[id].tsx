import React, { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { openTripDocument } from '@/store/walletViewer';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { DocumentType, DOCUMENT_TYPE_LABELS, TripDocument } from '@/constants/data';
import { useStore } from '@/store/useStore';
import { DocumentCard } from '@/components/DocumentCard';
import { useTheme } from '@/hooks/useTheme';

export default function WalletTripScreen() {
  const { colors, isDark } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const subscription = useStore((s) => s.subscription);
  const trips = useStore((s) => s.trips);
  const getDocumentsForTrip = useStore((s) => s.getDocumentsForTrip);
  const addDocument = useStore((s) => s.addDocument);
  const removeDocument = useStore((s) => s.removeDocument);
  const [docs, setDocs] = useState<TripDocument[]>([]);
  const documentTypes = Object.keys(DOCUMENT_TYPE_LABELS) as DocumentType[];
  const isPremium = subscription.plan !== 'none'
    && Boolean(subscription.expiresAt)
    && new Date(subscription.expiresAt as string).getTime() > Date.now();
  const trip = trips.find((item) => item.id === id);

  const loadDocs = useCallback(async () => {
    if (!id) return;
    const items = await getDocumentsForTrip(id);
    setDocs(items);
  }, [getDocumentsForTrip, id]);

  React.useEffect(() => {
    void loadDocs();
  }, [loadDocs]);

  if (!trip || !id) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Поездка не найдена</Text>
        <TouchableOpacity style={[styles.backOnlyBtn, { backgroundColor: colors.primary }]} onPress={() => router.back()}>
          <Text style={[styles.backOnlyBtnText, { color: colors.textInverse }]}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isPremium) {
    return (
      <View style={[styles.container, styles.center, { backgroundColor: colors.background }]}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Travel Wallet — функция Premium</Text>
        <TouchableOpacity style={[styles.backOnlyBtn, { backgroundColor: colors.primary }]} onPress={() => router.push('/(premium)' as never)}>
          <Text style={[styles.backOnlyBtnText, { color: colors.textInverse }]}>Открыть Premium</Text>
        </TouchableOpacity>
      </View>
    );
  }

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

  const handlePickDocument = async () => {
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
          id,
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
      <StatusBar style="light" />
      <View style={[styles.header, { backgroundColor: colors.primary }]}> 
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.textInverse} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { color: colors.textInverse }]}>Документы поездки</Text>
          <Text style={[styles.headerSubtitle, { color: `${colors.textInverse}D9` }]}>{trip.to} · {trip.startDate} — {trip.endDate}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={[styles.addBtn, { borderColor: `${colors.primary}40`, backgroundColor: `${colors.primary}12` }]}
          onPress={() => void handlePickDocument()}
        >
          <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
          <Text style={[styles.addBtnText, { color: colors.primary }]}>Добавить документ</Text>
        </TouchableOpacity>

        {docs.length === 0 ? (
          <View style={[styles.emptyBox, { borderColor: colors.border, backgroundColor: colors.surface }]}> 
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Документов пока нет</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Добавьте билеты, бронь отеля или страховку для этой поездки.</Text>
          </View>
        ) : (
          <View style={styles.docsList}>
            {docs.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onOpen={() => void handleOpenDocument(doc)}
                onDelete={() => handleDeleteDocument(doc)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
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
    fontSize: Typography.sizes.xl,
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
  addBtn: {
    height: 44,
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
  docsList: {
    gap: 8,
  },
  emptyBox: {
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    padding: Spacing.lg,
  },
  emptyTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
  },
  emptyText: {
    marginTop: 4,
    fontSize: Typography.sizes.sm,
    lineHeight: 20,
  },
  backOnlyBtn: {
    marginTop: 12,
    height: 40,
    borderRadius: BorderRadius.md,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backOnlyBtnText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
});
