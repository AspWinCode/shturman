import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@/components/ui/Button';
import Colors from '@/constants/colors';
import { Typography, Spacing } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const HIGHLIGHTS = [
  { emoji: '⚡', text: 'Маршрут за 60 секунд' },
  { emoji: '🧳', text: 'Билеты, жилье и бюджет в одном месте' },
  { emoji: '🤖', text: 'AI-подборка маршрутов' },
];

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={[StyleSheet.absoluteFill, {backgroundColor: '#0F2548'}]} />

      {/* Background circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      {/* Hero image placeholder */}
      <Animated.View
        style={[
          styles.heroContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.globeWrapper}>
          <Text style={styles.globeEmoji}>🌍</Text>
          <View style={styles.planeBadge}>
            <Text style={styles.planeEmoji}>✈️</Text>
          </View>
        </View>
      </Animated.View>

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.tagline}>TravelAI</Text>
        <Text style={styles.title}>
          Планируйте поездки{'\n'}за минуты с
        </Text>
        <Text style={styles.titleAccent}>умным AI</Text>
        <Text style={styles.subtitle}>
          Укажите пару параметров, а приложение соберет готовый план под ваш бюджет
        </Text>

        {/* Feature highlights */}
        <View style={styles.highlights}>
          {HIGHLIGHTS.map((item, index) => (
            <Animated.View
              key={index}
              style={[
                styles.highlightItem,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [0, 40],
                        outputRange: [0, 20 * (index + 1)],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.highlightEmoji}>{item.emoji}</Text>
              <Text style={styles.highlightText}>{item.text}</Text>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {/* CTAs */}
      <Animated.View
        style={[styles.ctas, { opacity: fadeAnim }]}
      >
        <Button
          title="Начать планирование"
          onPress={() => router.push('/(onboarding)/interests')}
          size="lg"
        />
        <Button
          title="У меня уже есть аккаунт"
          onPress={() => router.push('/(auth)/login')}
          variant="ghost"
          textStyle={{ color: 'rgba(255,255,255,0.8)' }}
          size="md"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  circle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(27,58,107,0.4)',
    top: -width * 0.2,
    right: -width * 0.2,
  },
  circle2: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: 'rgba(232,71,43,0.15)',
    bottom: height * 0.3,
    left: -width * 0.2,
  },
  heroContainer: {
    marginTop: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  globeWrapper: {
    position: 'relative',
    width: 180,
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  globeEmoji: {
    fontSize: 100,
  },
  planeBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planeEmoji: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing['2xl'],
  },
  tagline: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 36,
  },
  titleAccent: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.extrabold,
    color: Colors.accent,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.xl,
  },
  highlights: {
    gap: Spacing.sm,
    width: '100%',
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  highlightEmoji: {
    fontSize: 22,
  },
  highlightText: {
    fontSize: Typography.sizes.base,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: Typography.weights.medium,
  },
  ctas: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['3xl'],
    gap: Spacing.sm,
  },
});



