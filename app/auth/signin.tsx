// app/signin.tsx
import React, { JSX, useState } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { useModernTheme } from "@/context/ThemeContext";

// Component imports
import { AuthHeader } from "@/components/auth/signin/AuthHeader";
import { AuthFormContainer } from "@/components/auth/signin/AuthFormContainer";
import { InputField } from "@/components/auth/signin/InputField";
import { AuthButton } from "@/components/auth/signin/AuthButton";
import { ErrorMessage } from "@/components/auth/signin/ErrorMessage";
import { AuthDivider } from "@/components/auth/signin/AuthDivider";
import { AuthLink } from "@/components/auth/signin/AuthLink";




interface SignInCredentials {
  email: string;
  password: string;
}

interface FieldError {
  email?: string;
  password?: string;
}

export default function SignInScreen(): JSX.Element {
  const [credentials, setCredentials] = useState<SignInCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

  const router = useRouter();
  const { colors } = useModernTheme();
  const { signIn, loading, error, clearError } = useAuthStore();

  const handleInputChange = (
    field: keyof SignInCredentials,
    value: string
  ): void => {
    setCredentials((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear global error
    if (error) clearError();
  };

  const validateForm = (): boolean => {
    const errors: FieldError = {};
    let isValid = true;

    if (!credentials.email.trim()) {
      errors.email = "Please enter your email";
      isValid = false;
    } else if (!credentials.email.includes("@")) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!credentials.password.trim()) {
      errors.password = "Please enter your password";
      isValid = false;
    } else if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSignIn = async (): Promise<void> => {
    if (!validateForm()) return;

    const result = await signIn(credentials);

    if (result.success) {
      router.replace("/(tabs)");
    }
  };

  const handleForgotPassword = (): void => {
    Alert.alert(
      "Forgot Password",
      "Password reset functionality will be implemented soon.",
      [{ text: "OK" }]
    );
  };

  const handleSignUp = (): void => {
    router.push("./signup");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background.primary }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AuthHeader
          title="Welcome Back"
          subtitle="Sign in to continue your journey"
          iconName="log-in"
        />

        <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 24 }}>
          <AuthFormContainer variant="glass">
            {/* Email Input */}
            <InputField
              label="Email Address"
              placeholder="Enter your email"
              value={credentials.email}
              onChangeText={(text: string) => handleInputChange("email", text)}
              keyboardType="email-address"
              icon="mail-outline"
              error={fieldErrors.email}
            />

            {/* Password Input */}
            <InputField
              label="Password"
              placeholder="Enter your password"
              value={credentials.password}
              onChangeText={(text: string) =>
                handleInputChange("password", text)
              }
              secureTextEntry={!showPassword}
              showToggle={true}
              toggleState={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              icon="lock-closed-outline"
              error={fieldErrors.password}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginTop: -8,
                marginBottom: 24,
                paddingVertical: 8,
                paddingHorizontal: 4,
              }}
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: colors.interactive.primary,
                  fontSize: 14,
                  fontWeight: "600",
                  letterSpacing: 0.2,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Global Error Display */}
            <ErrorMessage
              message={error || ""}
              visible={!!error}
              variant="glass"
            />

            {/* Sign In Button */}
            <AuthButton
              title="Sign In"
              onPress={handleSignIn}
              loading={loading}
              variant="primary"
              icon="log-in-outline"
              iconPosition="right"
            />

            {/* Divider */}
            <AuthDivider text="or continue with" variant="glass" />

            {/* Social Login Options */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
                gap: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <AuthButton
                  title="Google"
                  onPress={() => {
                    /* Handle Google sign-in */
                  }}
                  variant="secondary"
                  icon="logo-google"
                  iconPosition="left"
                />
              </View>
              <View style={{ flex: 1 }}>
                <AuthButton
                  title="Apple"
                  onPress={() => {
                    /* Handle Apple sign-in */
                  }}
                  variant="secondary"
                  icon="logo-apple"
                  iconPosition="left"
                />
              </View>
            </View>

            {/* Sign Up Link */}
            <AuthLink
              text="Don't have an account?"
              linkText="Sign Up"
              onPress={handleSignUp}
            />
          </AuthFormContainer>

          <Button
            title="Test Auth Store"
            onPress={async () => {
              console.log("🧪 Testing verifyAuth directly...");
              try {
                const { verifyAuth } = useAuthStore.getState();
                const result = await verifyAuth();
                console.log("✅ Direct verifyAuth result:", result);
              } catch (error) {
                console.error("❌ Direct verifyAuth error:", error);
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
