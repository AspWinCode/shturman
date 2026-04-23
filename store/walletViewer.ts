import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert, Linking, Platform } from 'react-native';
import { TripDocument } from '@/constants/data';

export async function openTripDocument(doc: TripDocument): Promise<void> {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') {
      window.open(doc.uri, '_blank', 'noopener,noreferrer');
      return;
    }
    Alert.alert('Недоступно', 'Просмотр документа не поддерживается в этой среде.');
    return;
  }

  try {
    const contentUri = await FileSystem.getContentUriAsync(doc.uri);
    const canOpen = await Linking.canOpenURL(contentUri);
    if (canOpen) {
      await Linking.openURL(contentUri);
      return;
    }
  } catch {
    // Fallback below.
  }

  const canShare = await Sharing.isAvailableAsync();
  if (canShare) {
    await Sharing.shareAsync(doc.uri, {
      mimeType: doc.mimeType,
      dialogTitle: doc.name,
    });
    return;
  }

  Alert.alert('Недоступно', 'Не удалось открыть документ на этом устройстве.');
}
