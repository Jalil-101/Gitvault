// components/BottomSheet.tsx
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  snapPoints?: number[];
  enablePanGesture?: boolean;
}

const { height: screenHeight } = Dimensions.get("window");

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  title,
  snapPoints = [0.3, 0.6, 0.9],
  enablePanGesture = true,
}) => {
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const currentSnapIndex = useRef(0);

  useEffect(() => {
    if (isVisible) {
      // Animate to first snap point when opening
      Animated.spring(translateY, {
        toValue: screenHeight * (1 - snapPoints[0]),
        useNativeDriver: true,
      }).start();
    } else {
      // Animate down when closing
      Animated.spring(translateY, {
        toValue: screenHeight,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 20 && enablePanGesture;
      },
      onPanResponderMove: (evt, gestureState) => {
        const newValue =
          screenHeight * (1 - snapPoints[currentSnapIndex.current]) +
          gestureState.dy;
        translateY.setValue(
          Math.max(
            newValue,
            screenHeight * (1 - snapPoints[snapPoints.length - 1])
          )
        );
      },
      onPanResponderRelease: (evt, gestureState) => {
        const velocity = gestureState.vy;
        const currentY =
          screenHeight * (1 - snapPoints[currentSnapIndex.current]) +
          gestureState.dy;

        // Determine which snap point to animate to
        let targetSnapIndex = currentSnapIndex.current;

        if (velocity > 0.5) {
          // Fast downward swipe
          if (currentSnapIndex.current > 0) {
            targetSnapIndex = currentSnapIndex.current - 1;
          } else {
            onClose();
            return;
          }
        } else if (velocity < -0.5) {
          // Fast upward swipe
          if (currentSnapIndex.current < snapPoints.length - 1) {
            targetSnapIndex = currentSnapIndex.current + 1;
          }
        } else {
          // Find closest snap point
          let minDistance = Infinity;
          snapPoints.forEach((snapPoint, index) => {
            const snapY = screenHeight * (1 - snapPoint);
            const distance = Math.abs(currentY - snapY);
            if (distance < minDistance) {
              minDistance = distance;
              targetSnapIndex = index;
            }
          });
        }

        // Check if should close
        if (targetSnapIndex < 0 || gestureState.dy > screenHeight * 0.3) {
          onClose();
          return;
        }

        currentSnapIndex.current = targetSnapIndex;
        Animated.spring(translateY, {
          toValue: screenHeight * (1 - snapPoints[targetSnapIndex]),
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView intensity={50} className="flex-1 bg-black/50">
          <TouchableWithoutFeedback>
            <Animated.View
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"
              style={{
                transform: [{ translateY }],
                minHeight: screenHeight * snapPoints[snapPoints.length - 1],
              }}
              {...(enablePanGesture ? panResponder.panHandlers : {})}
            >
              {/* Handle */}
              <View className="items-center py-3">
                <View className="w-10 h-1 bg-gray-300 rounded-full" />
              </View>

              {/* Title */}
              {title && (
                <View className="px-6 pb-4 border-b border-gray-100">
                  <Text className="text-xl font-semibold text-gray-900">
                    {title}
                  </Text>
                </View>
              )}

              {/* Content */}
              <View className="flex-1 px-6 py-4">{children}</View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
