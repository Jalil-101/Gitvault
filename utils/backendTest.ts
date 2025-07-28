// utils/backendTest.ts
import { vaultApiService } from "@/services/VaultApiService";

export const testBackendConnectivity = async (): Promise<void> => {
  console.log("🔍 Testing backend connectivity...");

  try {
    const response = await fetch(
      "https://vault-backend-susi.onrender.com/api/v1/auth/me"
    );
    console.log("✅ Backend is reachable, status:", response.status);
  } catch (error) {
    console.error("❌ Backend connectivity test failed:", error);
  }
};

export const testSpecificEndpoints = async (): Promise<void> => {
  console.log("🔍 Testing specific endpoints...");

  const endpoints = [
    "/api/v1/auth/signup",
    "/api/v1/auth/signin",
    "/api/repositories",
    "/api/repositories/public",
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(
        `https://vault-backend-susi.onrender.com${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`✅ ${endpoint}: ${response.status}`);
    } catch (error) {
      console.error(`❌ ${endpoint}:`, error);
    }
  }
};

export const testRepositoryEndpoints = async (): Promise<void> => {
  console.log("🔍 Testing repository endpoints...");

  try {
    // Test public repositories endpoint (no auth required)
    const publicResponse = await fetch(
      "https://vault-backend-susi.onrender.com/api/repositories/public"
    );
    console.log("✅ Public repositories endpoint:", publicResponse.status);

    // Test repositories endpoint (auth required)
    const privateResponse = await fetch(
      "https://vault-backend-susi.onrender.com/api/repositories"
    );
    console.log("✅ Private repositories endpoint:", privateResponse.status);
  } catch (error) {
    console.error("❌ Repository endpoints test failed:", error);
  }
};

export const testRepositoryEndpointsWithAuth = async (): Promise<void> => {
  console.log("🔍 Testing repository endpoints with auth...");

  try {
    const token = await vaultApiService.getAccessToken();
    if (!token) {
      console.log("❌ No auth token available");
      return;
    }

    const response = await fetch(
      "https://vault-backend-susi.onrender.com/api/repositories",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Authenticated repositories endpoint:", response.status);
  } catch (error) {
    console.error("❌ Authenticated repository endpoints test failed:", error);
  }
};

export const testAuthentication = async (): Promise<void> => {
  console.log("🔍 Testing authentication...");

  try {
    // Test sign-in with dummy credentials
    const signInResponse = await fetch(
      "https://vault-backend-susi.onrender.com/api/v1/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "testpassword",
        }),
      }
    );

    console.log("✅ Sign-in endpoint test:", signInResponse.status);
    const responseText = await signInResponse.text();
    console.log("Response:", responseText);
  } catch (error) {
    console.error("❌ Authentication test failed:", error);
  }
};
