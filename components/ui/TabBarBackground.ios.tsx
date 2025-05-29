import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useTheme } from '@/context/ThemeContext';

export default function BlurTabBarBackground() {
  const { isDarkTheme } = useTheme();
  
  return (
    <BlurView
      // Use dark or light blur based on theme
      tint={isDarkTheme ? 'dark' : 'light'}
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}

