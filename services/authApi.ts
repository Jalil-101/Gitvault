// services/authApi.ts
const BASE_URL = "https://vault-backend-susi.onrender.com/api/v1";

// Types and Interfaces
export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  firstname: string; // Backend returns lowercase
  lastname: string; // Backend returns lowercase
  email: string;
  role: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  refreshToken: string;
  firstName: string;
  lastName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
}

export interface ApiCallOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Generic API call helper
const apiCall = async <T = any>(
  endpoint: string,
  options: ApiCallOptions = {}
): Promise<T> => {
  try {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    // Only try to parse JSON if there is content
    let data: any = null;
    const text = await response.text();
    if (text) {
      data = JSON.parse(text);
    }

    if (!response.ok) {
      throw new Error(
        (data && data.message) || `HTTP error! status: ${response.status}`
      );
    }

    return data as T;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export const authAPI = {
  // Sign up new user - Updated to match backend API
  signUp: async (userData: SignUpRequest): Promise<SignUpResponse> => {
    return await apiCall<SignUpResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      }),
    });
  },

  // Sign in existing user - Updated to match backend API
  signIn: async (credentials: SignInRequest): Promise<SignInResponse> => {
    return await apiCall<SignInResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  },

  // Sign out user - Note: Backend doesn't seem to have this endpoint
  // You might need to handle this client-side only
  signOut: async (token: string): Promise<ApiResponse> => {
    // Since backend doesn't have signout endpoint, we'll handle locally
    // Just return success to maintain compatibility
    return { message: "Signed out successfully" };
  },

  // Verify token - You may need to implement this on backend
  verifyToken: async (token: string): Promise<ApiResponse> => {
    // This endpoint might not exist on your backend
    // You might need to add it or handle token validation differently
    try {
      return await apiCall<ApiResponse>("/auth/verify", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // If endpoint doesn't exist, we can check token expiry locally
      throw new Error("Token verification failed");
    }
  },

  // Refresh token - Backend might have this but not documented
  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return await apiCall<RefreshTokenResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });
  },

  // Get user profile - May need to be implemented on backend
  getProfile: async (token: string): Promise<ApiResponse> => {
    return await apiCall<ApiResponse>("/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
