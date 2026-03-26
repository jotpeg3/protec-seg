/**
 * PROTEC SEG — Root Layout
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme } from '../src/theme';

export default function RootLayout() {
  return (
    <>
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
    </>
  );
}
