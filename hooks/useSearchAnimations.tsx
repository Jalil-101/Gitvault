// hooks/useSearchAnimations.ts
import { useRef } from "react";
import { Animated } from "react-native";

export const useSearchAnimations = () => {
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  const filterAnim = useRef(new Animated.Value(0)).current;
  const resultsAnim = useRef(new Animated.Value(0)).current;

  const animateSearchBar = () => {
    Animated.spring(searchBarAnim, {
      toValue: 1,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const resetSearchBar = () => {
    Animated.spring(searchBarAnim, {
      toValue: 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const animateFilters = (show: boolean) => {
    Animated.spring(filterAnim, {
      toValue: show ? 1 : 0,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const animateResults = () => {
    Animated.spring(resultsAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  return {
    searchBarAnim,
    filterAnim,
    resultsAnim,
    animateSearchBar,
    resetSearchBar,
    animateFilters,
    animateResults,
  };
};
