// app/signup.tsx
import { useModernTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

// Component imports
import { ErrorDisplay } from "@/components/auth/signup/ErrorDisplay";
import { FooterLink } from "@/components/auth/signup/FooterLink";
import { FormContainer } from "@/components/auth/signup/FormContainer";
import { GradientBackground } from "@/components/auth/signup/GradientBackground";
import { InputField } from "@/components/auth/signup/InputField";
import { SignUpHeader } from "@/components/auth/signup/SignUpHeader";
import { SubmitButton } from "@/components/auth/signup/SubmitButton";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FieldError {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpScreen(): React.JSX.Element {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

  const router = useRouter();
  const { colors } = useModernTheme();
  const { signUp, loading, error, clearError } = useAuthStore();

  const handleInputChange = (field: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error when user starts typing
    if (fieldErrors[field as keyof FieldError]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Clear global error
    if (error) clearError();
  };

  const validateForm = (): boolean => {
    const errors: FieldError = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "Please enter your first name";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Please enter your last name";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
      isValid = false;
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSignUp = async (): Promise<void> => {
    if (!validateForm()) return;

    const result = await signUp({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      // Navigation will be handled automatically by the layout
      // New users will be directed to onboarding after successful signup
      console.log(
        "✅ Sign up successful, navigation will be handled by layout"
      );
    } else {
      Alert.alert(
        "Sign Up Failed",
        result.error || "An error occurred during sign up"
      );
    }
  };

  const handleSignIn = (): void => {
    router.push("./signin");
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
        bounces={true}
      >
        <GradientBackground />

        <View style={{ flex: 1, paddingHorizontal: 24, paddingBottom: 24 }}>
          <SignUpHeader />

          <FormContainer variant="glass">
            {/* Name Fields */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <InputField
                  label="First Name"
                  placeholder="John"
                  value={formData.firstName}
                  field="firstName"
                  onChangeText={handleInputChange}
                  onFocus={setFocusedField}
                  onBlur={() => setFocusedField("")}
                  focusedField={focusedField}
                  autoCapitalize="words"
                  icon="person-outline"
                  error={fieldErrors.firstName}
                />
              </View>
              <View style={{ flex: 1 }}>
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  value={formData.lastName}
                  field="lastName"
                  onChangeText={handleInputChange}
                  onFocus={setFocusedField}
                  onBlur={() => setFocusedField("")}
                  focusedField={focusedField}
                  autoCapitalize="words"
                  icon="person-outline"
                  error={fieldErrors.lastName}
                />
              </View>
            </View>

            {/* Email Field */}
            <InputField
              label="Email Address"
              placeholder="john@example.com"
              value={formData.email}
              field="email"
              onChangeText={handleInputChange}
              onFocus={setFocusedField}
              onBlur={() => setFocusedField("")}
              focusedField={focusedField}
              keyboardType="email-address"
              icon="mail-outline"
              error={fieldErrors.email}
            />

            {/* Password Field */}
            <InputField
              label="Password"
              placeholder="Create a secure password"
              value={formData.password}
              field="password"
              onChangeText={handleInputChange}
              onFocus={setFocusedField}
              onBlur={() => setFocusedField("")}
              focusedField={focusedField}
              secureTextEntry={!showPassword}
              showToggle={true}
              toggleState={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              icon="lock-closed-outline"
              error={fieldErrors.password}
            />

            {/* Confirm Password Field */}
            <InputField
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              field="confirmPassword"
              onChangeText={handleInputChange}
              onFocus={setFocusedField}
              onBlur={() => setFocusedField("")}
              focusedField={focusedField}
              secureTextEntry={!showConfirmPassword}
              showToggle={true}
              toggleState={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              icon="shield-checkmark-outline"
              error={fieldErrors.confirmPassword}
            />

            {/* Global Error Display */}
            <ErrorDisplay error={error} />

            {/* Submit Button */}
            <SubmitButton
              onPress={handleSignUp}
              loading={loading}
              title="Create Account"
            />

            {/* Footer Link */}
            <FooterLink
              message="Already have an account?"
              linkText="Sign In"
              onPress={handleSignIn}
            />
          </FormContainer>

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
