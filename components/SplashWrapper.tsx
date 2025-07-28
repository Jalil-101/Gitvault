// components/SplashWrapper.tsx
import React, { useState, useEffect } from "react";
import { SplashScreen } from "./SplashScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { vaultApiService } from "@/services/VaultApiService";

interface SplashWrapperProps {
  children: React.ReactNode;
}

export const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if user is authenticated
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          try {
            // Verify token is still valid
            await vaultApiService.getCurrentUser();
            setIsAuthenticated(true);
          } catch (error) {
            // Token is invalid, clear it
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error during app initialization:", error);
        setIsAuthenticated(false);
      }
    };

    initializeApp();
  }, []);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <>{children}</>;
}; 