import { Stack } from 'expo-router';

export default function TripLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="create" />
      <Stack.Screen name="hotel-select" />
      <Stack.Screen name="transport-select" />
      <Stack.Screen name="generating" options={{ animation: 'fade' }} />
      <Stack.Screen name="result" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
