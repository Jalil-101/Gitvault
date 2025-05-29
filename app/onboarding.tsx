import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();
  const { isDarkTheme, colors } = useTheme();

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("seenOnboarding", "true");
    router.replace("/auth/signin");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View 
        entering={FadeInUp.delay(200).duration(1000)}
        style={styles.imageContainer}
      >
        <Image 
          source={require("../assets/images/onboarding.png")} 
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
      
      <Animated.View 
        entering={FadeInDown.delay(400).duration(1000)}
        style={styles.contentContainer}
      >
        <ThemedText type="title" style={styles.title}>
          Welcome to GitVault
        </ThemedText>
        
        <ThemedText style={styles.description}>
          Discover amazing and seemless way to manage your GitVault repositories.
        </ThemedText>
        
        <TouchableOpacity
          onPress={completeOnboarding}
          style={[
            styles.button,
            { backgroundColor: colors.tint }
          ]}
        >
          <ThemedText style={[styles.buttonText, { color: isDarkTheme ? "#000" : "#fff" }]}>
            Get Started
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  }
});
