import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { AnimatedSplashScreen } from '../components/AnimatedSplashScreen';
import { DarkTheme } from '../src/theme';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // For now, we'll just simulate a delay or rely on the 3s animation
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady && isAnimationComplete) {
      // This tells the splash screen to hide immediately!
      await SplashScreen.hideAsync();
    }
  }, [isAppReady, isAnimationComplete]);

  if (!isAppReady || !isAnimationComplete) {
    return (
      <AnimatedSplashScreen
        onAnimationComplete={() => setIsAnimationComplete(true)}
      />
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor={DarkTheme.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: DarkTheme.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(client)" />
        <Stack.Screen name="(patrol)" />
      </Stack>
    </View>
  );
}
