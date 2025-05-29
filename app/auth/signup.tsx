import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function SignUp() {
  const router = useRouter();
  const { isDarkTheme, colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // In a real app, you would validate inputs and register with a server
    const newUser = { id: "123", name: name || "New User" };
    await AsyncStorage.setItem("user", JSON.stringify(newUser));
    await AsyncStorage.setItem("seenOnboarding", "true");
    router.replace("/"); // Triggers re-evaluation of guards
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <ThemedText type="title" style={[styles.title, { color: colors.text }]}>
          Create Account
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: isDarkTheme ? "#A0A0A0" : "#707070" }]}>
          Sign up to get started with MyApp
        </ThemedText>
      </View>

      <View style={styles.form}>
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.inputContainer}>
          <ThemedText style={[styles.label, { color: colors.text }]}>Full Name</ThemedText>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkTheme ? "#2A2A2A" : "#F5F5F5",
                color: colors.text,
                borderColor: isDarkTheme ? "#3A3A3A" : "#E0E0E0" 
              }
            ]}
            placeholder="Enter your full name"
            placeholderTextColor={isDarkTheme ? "#808080" : "#A0A0A0"}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.inputContainer}>
          <ThemedText style={[styles.label, { color: colors.text }]}>Email</ThemedText>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkTheme ? "#2A2A2A" : "#F5F5F5",
                color: colors.text,
                borderColor: isDarkTheme ? "#3A3A3A" : "#E0E0E0" 
              }
            ]}
            placeholder="Enter your email"
            placeholderTextColor={isDarkTheme ? "#808080" : "#A0A0A0"}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.inputContainer}>
          <ThemedText style={[styles.label, { color: colors.text }]}>Password</ThemedText>
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkTheme ? "#2A2A2A" : "#F5F5F5",
                color: colors.text,
                borderColor: isDarkTheme ? "#3A3A3A" : "#E0E0E0" 
              }
            ]}
            placeholder="Create a password"
            placeholderTextColor={isDarkTheme ? "#808080" : "#A0A0A0"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(500)}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.tint }]}
            onPress={handleSignUp}
          >
            <ThemedText style={[styles.buttonText, { color: isDarkTheme ? "#000" : "#fff" }]}>
              Sign Up
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.text }]}>
            Already have an account?
          </ThemedText>
          <TouchableOpacity onPress={() => router.replace("/auth/signin")}>
            <ThemedText style={[styles.linkText, { color: colors.tint }]}>
              Sign In
            </ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    height: 55,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 5,
  },
  footerText: {
    fontSize: 14,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
  }
}
);
