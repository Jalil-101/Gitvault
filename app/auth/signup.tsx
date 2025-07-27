// app/signup.tsx
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

// Component imports
import { GradientBackground } from "@/components/auth/signup/GradientBackground";
import { SignUpHeader } from "@/components/auth/signup/SignUpHeader";
import { FormContainer } from "@/components/auth/signup/FormContainer";
import { InputField } from "@/components/auth/signup/InputField";
import { ErrorDisplay } from "@/components/auth/signup/ErrorDisplay";
import { SubmitButton } from "@/components/auth/signup/SubmitButton";
import { FooterLink } from "@/components/auth/signup/FooterLink";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  const router = useRouter();
  const { signUp, loading, error, clearError } = useAuthStore();

  const handleInputChange = (field: string, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) clearError();
  };

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      Alert.alert("Error", "Please enter your first name");
      return false;
    }
    if (!formData.lastName.trim()) {
      Alert.alert("Error", "Please enter your last name");
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return false;
    }
    if (!formData.email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
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
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.replace("/(tabs)") },
      ]);
    } else {
      Alert.alert(
        "Sign Up Failed",
        result.error || "An error occurred during sign up"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
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

          <FormContainer>
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
            />

            {/* Error Display */}
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
              onPress={() => router.push("/(tabs)")}
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
