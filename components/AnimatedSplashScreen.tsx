import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  onAnimationComplete: () => void;
}

export function AnimatedSplashScreen({ onAnimationComplete }: AnimatedSplashScreenProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulsating animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.9,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseAnimation.start();

    // After 3.5 seconds, trigger the completion callback to give more time for the animation
    const timer = setTimeout(() => {
      pulseAnimation.stop();
      onAnimationComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete, scaleAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>PROTECT SEG</Text>
          <Text style={styles.taglineText}>SEGURANÇA 24H • PROTEÇÃO REAL</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // High contrast white background
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#001A3F', // Navy blue from user image
    letterSpacing: 2,
    marginBottom: 8,
  },
  taglineText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A651', // Green from user image
    letterSpacing: 1.5,
  },
});
