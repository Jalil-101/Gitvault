import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function TabBarBackground() {
  const { colors } = useTheme();
  
  return (
    <View 
      style={[
        StyleSheet.absoluteFill, 
        { backgroundColor: colors.background }
      ]} 
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}

