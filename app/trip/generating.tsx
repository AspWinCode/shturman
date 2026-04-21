import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/colors';
import { Spacing, Typography, BorderRadius } from '@/constants/theme';
import { useStore } from '@/store/useStore';

const { width, height } = Dimensions.get('window');

const MESSAGES = [
  { text: 'Анализируем ваши предпочтения...', emoji: '🧠' },
  { text: 'Подбираем лучшие места...', emoji: '📍' },
  { text: 'Считаем бюджет поездки...', emoji: '💰' },
  { text: 'Строим дневной план...', emoji: '🗓️' },
  { text: 'Оптимизируем маршрут по дням...', emoji: '🧭' },
  { text: 'Формируем итоговый план...', emoji: '🧳' },
  { text: 'Почти готово!', emoji: '✅' },
];

export default function GeneratingScreen() {
  const [currentMsg, setCurrentMsg] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const generatedTrip = useStore((s) => s.generatedTrip);
  const tripForm = useStore((s) => s.tripForm);

  useEffect(() => {
    if (!generatedTrip) {
      router.replace('/trip/create');
      return;
    }

    // Start animations
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Globe rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    // Message cycling
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentMsg((prev) => (prev + 1) % MESSAGES.length);
      setProgress((prev) => Math.min(100, prev + Math.floor(100 / MESSAGES.length)));
    }, 600);

    // Navigate when done
    const timeout = setTimeout(() => {
      clearInterval(interval);
      router.replace('/trip/result');
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [generatedTrip]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const msg = MESSAGES[currentMsg];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.primaryDark }]} />

      {/* Animated circles background */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      <Animated.View
        style={[styles.content, { transform: [{ scale: scaleAnim }] }]}
      >
        {/* Globe */}
        <Animated.View
          style={[styles.globeContainer, { transform: [{ rotate: rotation }] }]}
        >
          <Text style={styles.globeEmoji}>🌍</Text>
        </Animated.View>

        <Text style={styles.title}>Создаем маршрут</Text>
        <View style={styles.destination}>
          <Text style={styles.destinationText}>
            {tripForm.from || 'Москва'} → {tripForm.to || 'Казань'}
          </Text>
        </View>

        {/* Animated message */}
        <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
          <Text style={styles.messageEmoji}>{msg.emoji}</Text>
          <Text style={styles.messageText}>{msg.text}</Text>
        </Animated.View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth, backgroundColor: Colors.accent }]}
          />
        </View>

        {/* Features being built */}
        <View style={styles.features}>
          {['Маршрут по дням', 'Транспорт', 'Отели', 'Бюджет'].map((f, i) => (
            <View
              key={f}
              style={[
                styles.featurePill,
                i <= currentMsg && styles.featurePillActive,
              ]}
            >
              <Text
                style={[
                  styles.featurePillText,
                  i <= currentMsg && styles.featurePillTextActive,
                ]}
              >
                {i <= currentMsg ? '✓ ' : ''}{f}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgCircle1: {
    position: 'absolute',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    top: -width * 0.2,
    left: -width * 0.1,
  },
  bgCircle2: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    bottom: height * 0.1,
    right: -width * 0.15,
  },
  bgCircle3: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(27,58,107,0.3)',
    bottom: height * 0.25,
    left: -width * 0.1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing['2xl'],
    width: '100%',
  },
  globeContainer: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  globeEmoji: {
    fontSize: 72,
  },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: '#fff',
    marginBottom: Spacing.sm,
  },
  destination: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.base,
    paddingVertical: 6,
    marginBottom: Spacing.xl,
  },
  destinationText: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: Typography.weights.medium,
  },
  messageBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.xl,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: Spacing.base,
    paddingVertical: 10,
    borderRadius: 12,
    width: '100%',
  },
  messageEmoji: {
    fontSize: 24,
  },
  messageText: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.9)',
    flex: 1,
  },
  progressContainer: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  featurePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  featurePillActive: {
    backgroundColor: 'rgba(27,58,107,0.5)',
    borderColor: 'rgba(45,90,155,0.6)',
  },
  featurePillText: {
    fontSize: Typography.sizes.sm,
    color: 'rgba(255,255,255,0.5)',
  },
  featurePillTextActive: {
    color: '#fff',
    fontWeight: Typography.weights.medium,
  },
});

