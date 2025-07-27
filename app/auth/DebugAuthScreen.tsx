// components/DebugAuthScreen.tsx
import { useAuthStore } from "@/store/authStore";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export function DebugAuthScreen() {
  const [debugInfo, setDebugInfo] = useState<{
    network: import("@react-native-community/netinfo").NetInfoState | null;
    storeState: {
      isAuthenticated: boolean;
      loading: boolean;
      isFirstTime: boolean;
      user: any;
    } | null;
    apiTest:
      | { status: number; ok: boolean; statusText: string }
      | { error: string }
      | null;
    authTest: { success: boolean; result?: any; error?: string } | null;
    error: string | null;
  }>({
    network: null,
    storeState: null,
    apiTest: null,
    authTest: null,
    error: null,
  });

  const authStore = useAuthStore();

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    console.log("🔬 Running full diagnostics...");

    try {
      // 1. Test Network
      const networkState = await NetInfo.fetch();
      console.log("🌐 Network:", networkState);

      // 2. Test Store State
      const storeState = useAuthStore.getState();
      console.log("🏪 Store State:", storeState);

      // 3. Test API endpoint (replace with your actual endpoint)
      let apiTest = null;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const response = await fetch("https://your-api-endpoint.com/health", {
          method: "GET",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        apiTest = {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText,
        };
      } catch (apiError) {
        clearTimeout(timeoutId);
        apiTest = {
          error:
            apiError instanceof Error ? apiError.message : String(apiError),
        };
      }

      // 4. Test verifyAuth function
      let authTest = null;
      try {
        console.log("🔐 Testing verifyAuth...");
        const authResult = await storeState.verifyAuth();
        authTest = { success: true, result: authResult };
      } catch (authError) {
        authTest = {
          success: false,
          error:
            authError instanceof Error ? authError.message : String(authError),
        };
      }

      setDebugInfo({
        network: networkState,
        storeState: {
          isAuthenticated: storeState.isAuthenticated,
          loading: storeState.loading,
          isFirstTime: storeState.isFirstTime,
          user: storeState.user,
        },
        apiTest,
        authTest,
        error: null,
      });
    } catch (error: unknown) {
      console.error("🚫 Diagnostics failed:", error);
      setDebugInfo((prev) => ({
        ...prev,
        error:
          error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error),
      }));
    }
  };

  const testStoreAction = async (actionName: string) => {
    try {
      const store = useAuthStore.getState();
      console.log(`🧪 Testing ${actionName}...`);

      switch (actionName) {
        case "verifyAuth":
          await store.verifyAuth();
          break;
        case "signOut":
          await store.signOut();
          break;
        default:
          console.log("Unknown action");
      }

      // Refresh debug info after action
      setTimeout(runDiagnostics, 1000);
    } catch (error) {
      console.error(`❌ ${actionName} failed:`, error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔬 Auth Debug Screen</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🌐 Network Status</Text>
        <Text style={styles.code}>
          {JSON.stringify(debugInfo.network, null, 2)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏪 Store State</Text>
        <Text style={styles.code}>
          {JSON.stringify(debugInfo.storeState, null, 2)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📡 API Test</Text>
        <Text style={styles.code}>
          {JSON.stringify(debugInfo.apiTest, null, 2)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔐 Auth Test</Text>
        <Text style={styles.code}>
          {JSON.stringify(debugInfo.authTest, null, 2)}
        </Text>
      </View>

      {debugInfo.error && (
        <View style={styles.section}>
          <Text style={styles.errorTitle}>❌ Error</Text>
          <Text style={styles.error}>{debugInfo.error}</Text>
        </View>
      )}

      <View style={styles.buttons}>
        <Button title="🔄 Refresh Diagnostics" onPress={runDiagnostics} />
        <Button
          title="🧪 Test verifyAuth"
          onPress={() => testStoreAction("verifyAuth")}
        />
        <Button
          title="🚪 Test signOut"
          onPress={() => testStoreAction("signOut")}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Check Console</Text>
        <Text>
          Look at your console logs for detailed information about each test.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  code: {
    fontFamily: "monospace",
    fontSize: 12,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 4,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontFamily: "monospace",
  },
  buttons: {
    gap: 10,
    marginBottom: 20,
  },
});
