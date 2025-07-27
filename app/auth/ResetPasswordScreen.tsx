import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

interface ResetPasswordScreenProps {}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleReset = async (): Promise<void> => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = (): void => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback to sign-in if no history
      router.replace("/auth/signin");
    }
  };

  const handleSignIn = (): void => {
    router.replace("/auth/signin");
  };

  const handleGotIt = (): void => {
    router.replace("/auth/signin");
  };

  if (isSuccess) {
    return (
      <LinearGradient
        colors={["#0f172a", "#581c87", "#0f172a"]}
        style={{ flex: 1 }}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <BlurView
              intensity={20}
              tint="dark"
              style={{
                width: "100%",
                borderRadius: 24,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: "rgba(148, 163, 184, 0.1)",
              }}
            >
              <View style={{ padding: 32 }}>
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <View
                    style={{
                      width: 64,
                      height: 64,
                      backgroundColor: "rgba(34, 197, 94, 0.2)",
                      borderRadius: 32,
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 24,
                    }}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={32}
                      color="#4ade80"
                    />
                  </View>

                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: 12,
                      textAlign: "center",
                    }}
                  >
                    Check Your Email
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: "#cbd5e1",
                      textAlign: "center",
                      lineHeight: 24,
                    }}
                  >
                    We've sent a password reset link to{" "}
                    <Text style={{ color: "#a855f7", fontWeight: "500" }}>
                      {email}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={handleGotIt}
                  style={{
                    width: "100%",
                    height: 56,
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  <LinearGradient
                    colors={["#9333ea", "#3b82f6"]}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Got it
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#0f172a", "#581c87", "#0f172a"]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 24,
                paddingTop: 16,
                marginBottom: 32,
              }}
            >
              <TouchableOpacity
                onPress={handleBack}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  borderWidth: 1,
                  borderColor: "rgba(148, 163, 184, 0.1)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="arrow-back" size={20} color="#cbd5e1" />
              </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: 24,
              }}
            >
              <BlurView
                intensity={20}
                tint="dark"
                style={{
                  borderRadius: 24,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "rgba(148, 163, 184, 0.1)",
                }}
              >
                <View style={{ padding: 32 }}>
                  {/* Logo and Title */}
                  <View style={{ alignItems: "center", marginBottom: 32 }}>
                    <LinearGradient
                      colors={["#9333ea", "#3b82f6"]}
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 16,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 24,
                      }}
                    >
                      <Ionicons name="logo-github" size={32} color="white" />
                    </LinearGradient>

                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 8,
                        textAlign: "center",
                      }}
                    >
                      Reset Password
                    </Text>

                    <Text
                      style={{
                        fontSize: 16,
                        color: "#94a3b8",
                        textAlign: "center",
                      }}
                    >
                      Enter your email and we'll send you a reset link
                    </Text>
                  </View>

                  {/* Form */}
                  <View style={{ marginBottom: 32 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "500",
                        color: "#cbd5e1",
                        marginBottom: 8,
                      }}
                    >
                      Email Address
                    </Text>

                    <View
                      style={{
                        position: "relative",
                        marginBottom: 24,
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          left: 16,
                          top: 18,
                          zIndex: 1,
                        }}
                      >
                        <Ionicons
                          name="mail-outline"
                          size={20}
                          color="#94a3b8"
                        />
                      </View>

                      <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="your@email.com"
                        placeholderTextColor="#64748b"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{
                          backgroundColor: "rgba(51, 65, 85, 0.5)",
                          borderWidth: 1,
                          borderColor: "rgba(148, 163, 184, 0.2)",
                          borderRadius: 16,
                          height: 56,
                          paddingLeft: 48,
                          paddingRight: 16,
                          fontSize: 16,
                          color: "white",
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      onPress={handleReset}
                      disabled={!email.trim() || isLoading}
                      style={{
                        height: 56,
                        borderRadius: 16,
                        overflow: "hidden",
                        opacity: !email.trim() || isLoading ? 0.6 : 1,
                      }}
                    >
                      <LinearGradient
                        colors={["#9333ea", "#3b82f6"]}
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        {isLoading && (
                          <ActivityIndicator
                            size="small"
                            color="white"
                            style={{ marginRight: 8 }}
                          />
                        )}
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "600",
                          }}
                        >
                          {isLoading
                            ? "Sending Reset Link..."
                            : "Send Reset Link"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/* Footer */}
                  <View
                    style={{
                      paddingTop: 24,
                      borderTopWidth: 1,
                      borderTopColor: "rgba(148, 163, 184, 0.1)",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#94a3b8",
                      }}
                    >
                      Remember your password?{" "}
                      <Text
                        onPress={handleSignIn}
                        style={{
                          color: "#a855f7",
                          fontWeight: "500",
                        }}
                      >
                        Sign In
                      </Text>
                    </Text>
                  </View>
                </View>
              </BlurView>

              {/* Security Note */}
              <View
                style={{
                  alignItems: "center",
                  marginTop: 24,
                }}
              >
                <BlurView
                  intensity={10}
                  tint="dark"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: "rgba(148, 163, 184, 0.1)",
                  }}
                >
                  <Ionicons name="shield-checkmark" size={16} color="#94a3b8" />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#94a3b8",
                      marginLeft: 8,
                    }}
                  >
                    Secured by Vault
                  </Text>
                </BlurView>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ResetPasswordScreen;
