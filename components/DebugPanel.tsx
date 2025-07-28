// components/DebugPanel.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { vaultApiService } from "@/services/VaultApiService";
import { useAuthStore } from "@/store/authStore";
import { useTodoStore } from "@/store/todoStore";
import { DebugUtils } from "@/utils/debugUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DebugPanelProps {
  visible: boolean;
  onClose: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ visible, onClose }) => {
  const { colors, shadows } = useModernTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<string>("Unknown");
  const [authStatus, setAuthStatus] = useState<string>("Unknown");

  const testBackendConnectivity = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Testing backend connectivity...");

      const result = await testBackendConnectivity();
      console.log("Backend test result:", result);

      if (result.basicConnectivity) {
        setBackendStatus("✅ Backend is online");
        Alert.alert(
          "Backend Status",
          `Backend is online. API endpoint status: ${result.apiEndpoint}`
        );
      } else {
        setBackendStatus("❌ Backend is offline");
        Alert.alert("Backend Status", "Backend is offline or unreachable");
      }
    } catch (error) {
      console.error("Backend connectivity test failed:", error);
      setBackendStatus("❌ Backend test failed");
      Alert.alert("Backend Status", "Backend test failed");
    } finally {
      setIsLoading(false);
    }
  };

  const testAuthEndpoint = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Testing auth endpoint...");

      const response = await fetch(
        "https://vault-backend-susi.onrender.com/api/v1/auth/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Auth endpoint response status:", response.status);

      if (response.status === 401) {
        setAuthStatus("✅ Auth endpoint working (401 expected without token)");
        Alert.alert("Auth Status", "Auth endpoint is working correctly");
      } else if (response.ok) {
        setAuthStatus("✅ Auth endpoint working");
        Alert.alert(
          "Auth Status",
          "Auth endpoint is working and you might be authenticated"
        );
      } else {
        setAuthStatus("⚠️ Auth endpoint error");
        Alert.alert(
          "Auth Status",
          `Auth endpoint responded with status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Auth endpoint test failed:", error);
      setAuthStatus("❌ Auth endpoint failed");
      Alert.alert("Auth Status", "Auth endpoint test failed");
    } finally {
      setIsLoading(false);
    }
  };

  const testVaultApiService = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Testing VaultApiService...");

      // Test getCurrentUser method
      await vaultApiService.getCurrentUser();
      Alert.alert(
        "VaultApiService Test",
        "VaultApiService is working correctly"
      );
    } catch (error) {
      console.error("VaultApiService test failed:", error);
      Alert.alert(
        "VaultApiService Test",
        `VaultApiService failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testSpecificEndpoints = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Testing specific endpoints...");

      const results = await testSpecificEndpoints();
      console.log("Endpoint test results:", results);

      const workingEndpoints = results.filter((r) => r.ok).length;
      const totalEndpoints = results.length;

      Alert.alert(
        "Endpoint Test Results",
        `${workingEndpoints}/${totalEndpoints} endpoints are working.\n\nCheck console for detailed results.`
      );
    } catch (error) {
      console.error("Endpoint test failed:", error);
      Alert.alert("Endpoint Test", "Endpoint test failed");
    } finally {
      setIsLoading(false);
    }
  };

  const testRepositoryEndpoints = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Testing repository endpoints...");

      const results = await testRepositoryEndpoints();
      console.log("Repository endpoint test results:", results);

      const workingEndpoints = results.filter((r) => r.ok).length;
      const totalEndpoints = results.length;

      Alert.alert(
        "Repository Endpoint Test Results",
        `${workingEndpoints}/${totalEndpoints} repository endpoints are working.\n\nCheck console for detailed results.`
      );
    } catch (error) {
      console.error("Repository endpoint test failed:", error);
      Alert.alert(
        "Repository Endpoint Test",
        "Repository endpoint test failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const testRepositoryEndpointsWithAuth = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Testing repository endpoints with authentication...");

      const result = await testRepositoryEndpointsWithAuth();

      if (result.success) {
        const workingEndpoints = result.results.filter((r) => r.ok).length;
        const totalEndpoints = result.results.length;

        Alert.alert(
          "Authenticated Repository Test Results",
          `${workingEndpoints}/${totalEndpoints} endpoints are working.\n\nCheck console for detailed results.`
        );
      } else {
        Alert.alert(
          "Authenticated Repository Test",
          `Test failed: ${result.error}`
        );
      }
    } catch (error) {
      console.error("Authenticated repository test failed:", error);
      Alert.alert("Authenticated Repository Test", "Test failed");
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllTokens = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      Alert.alert(
        "Tokens Cleared",
        "All authentication tokens have been cleared"
      );
    } catch (error) {
      Alert.alert("Error", "Failed to clear tokens");
    }
  };

  const runFullDiagnostic = async () => {
    setIsLoading(true);
    try {
      console.log("🔍 Running full diagnostic...");
      await DebugUtils.runFullDiagnostic();
      Alert.alert(
        "Diagnostic Complete",
        "Full diagnostic completed. Check console for details."
      );
    } catch (error) {
      Alert.alert("Diagnostic Error", "Diagnostic failed");
    } finally {
      setIsLoading(false);
    }
  };

  const checkAuthStoreState = async () => {
    try {
      console.log("🔐 Checking auth store state...");
      const authState = checkAuthStoreState();

      if (authState) {
        Alert.alert(
          "Auth Store State",
          `Authenticated: ${authState.isAuthenticated}\n` +
            `Has Token: ${!!authState.token}\n` +
            `Has User: ${!!authState.user}\n` +
            `Loading: ${authState.loading}\n` +
            `Error: ${authState.error || "None"}`
        );
      } else {
        Alert.alert("Auth Store State", "Failed to get auth store state");
      }
    } catch (error) {
      console.error("Auth store check failed:", error);
      Alert.alert("Auth Store Check", "Failed to check auth store state");
    }
  };

  const forceReAuth = async () => {
    try {
      console.log("🔄 Forcing re-authentication...");

      // Clear current auth state
      await useAuthStore.getState().signOut();

      Alert.alert(
        "Re-authentication",
        "Auth state cleared. Please sign in again.",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to sign in screen
              // You can add navigation here if needed
            },
          },
        ]
      );
    } catch (error) {
      console.error("Force re-auth failed:", error);
      Alert.alert("Re-authentication", "Failed to clear auth state");
    }
  };

  const clearAllNotifications = async () => {
    try {
      console.log("🧹 Clearing all existing notifications...");
      await useTodoStore.getState().clearAllExistingNotifications();
      Alert.alert(
        "Notifications Cleared",
        "All existing notifications have been cleared."
      );
    } catch (error) {
      console.error("Failed to clear notifications:", error);
      Alert.alert("Error", "Failed to clear notifications");
    }
  };

  const testAuthStatus = async () => {
    try {
      console.log("🔐 Testing authentication status...");
      const authState = useAuthStore.getState();
      console.log("Auth State:", {
        isAuthenticated: authState.isAuthenticated,
        hasToken: !!authState.token,
        hasRefreshToken: !!authState.refreshToken,
        hasUser: !!authState.user,
        loading: authState.loading,
        error: authState.error,
      });

      // Test token sync
      await authState.syncTokensFromStorage();
      console.log("✅ Token sync completed");

      // Test API call
      const response = await fetch(
        "https://vault-backend-susi.onrender.com/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      console.log("API Test Response:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("API Test Data:", data);
        Alert.alert("Auth Test", "Authentication is working! ✅");
      } else {
        Alert.alert(
          "Auth Test",
          `Authentication failed: ${response.status} ❌`
        );
      }
    } catch (error) {
      console.error("Auth test failed:", error);
      Alert.alert("Auth Test", "Authentication test failed ❌");
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.primary,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 24,
            borderBottomWidth: 1,
            borderBottomColor: colors.border.primary,
            backgroundColor: colors.surface.primary,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: colors.text.primary,
            }}
          >
            Debug Panel
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text
              style={{
                color: colors.interactive.primary,
                fontSize: 18,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, padding: 24 }}>
          {/* Backend Connectivity Test */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔌 Backend Connectivity
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Test if the backend server is online and responding
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.interactive.primary,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={testBackendConnectivity}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Testing..." : "Test Backend Connectivity"}
              </Text>
            </TouchableOpacity>
            {backendStatus !== "Unknown" && (
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text.tertiary,
                  marginTop: 8,
                }}
              >
                Status: {backendStatus}
              </Text>
            )}
          </View>

          {/* Auth Endpoint Test */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔐 Auth Endpoint Test
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Test the authentication endpoint specifically
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.blue.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={testAuthEndpoint}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Testing..." : "Test Auth Endpoint"}
              </Text>
            </TouchableOpacity>
            {authStatus !== "Unknown" && (
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text.tertiary,
                  marginTop: 8,
                }}
              >
                Status: {authStatus}
              </Text>
            )}
          </View>

          {/* Specific Endpoints Test */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              📡 Specific Endpoints Test
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Test all API endpoints individually
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.orange.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={testSpecificEndpoints}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Testing..." : "Test All Endpoints"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Repository Endpoints Test */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              📁 Repository Endpoints Test
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Test repository creation and fetching endpoints
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.green.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={testRepositoryEndpoints}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Testing..." : "Test Repository Endpoints"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* VaultApiService Test */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🛠️ VaultApiService Test
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Test the VaultApiService with authentication
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.green.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={testVaultApiService}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Testing..." : "Test VaultApiService"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Token Management */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🗝️ Token Management
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Clear authentication tokens if needed
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.status.warning.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={clearAllTokens}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                Clear All Tokens
              </Text>
            </TouchableOpacity>
          </View>

          {/* Full Diagnostic */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔍 Full Diagnostic
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Run comprehensive diagnostic tests
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.purple.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={runFullDiagnostic}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Running..." : "Run Full Diagnostic"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Auth Store State Check (new UI) */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔐 Auth Store State Check
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Check authentication state and token status
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.purple.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={checkAuthStoreState}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                Check Auth State
              </Text>
            </TouchableOpacity>
          </View>

          {/* Authentication Test */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔐 Authentication Test
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Test authentication and API connectivity
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.blue.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={testAuthStatus}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Testing..." : "Test Authentication"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Force Re-Authentication */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔄 Force Re-Authentication
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Clear current authentication state and force re-authentication
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.status.error.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={forceReAuth}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                Force Re-Auth
              </Text>
            </TouchableOpacity>
          </View>

          {/* Authenticated Repository Endpoints Test */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔐 Authenticated Repository Test
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Test repository endpoints with authentication token
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.accents.blue.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                opacity: isLoading ? 0.6 : 1,
              }}
              onPress={testRepositoryEndpointsWithAuth}
              disabled={isLoading}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                {isLoading ? "Testing..." : "Test with Auth"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Clear Notifications */}
          <View
            style={{
              backgroundColor: colors.surface.secondary,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.border.primary,
              ...shadows.sm,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              🔔 Clear Notifications
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Clear all existing notifications from the todo list
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.status.info.main,
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={clearAllNotifications}
            >
              <Text style={{ color: colors.text.inverse, fontWeight: "600" }}>
                Clear Notifications
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};
