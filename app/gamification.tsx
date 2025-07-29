import React, { createContext, useContext, useState, ReactNode } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

// Types
export type Challenge = {
  id: string;
  type: "daily" | "weekly";
  description: string;
  completed: boolean;
  reward: string;
};

export type Theme = "default" | "purple" | "green" | "dark";
export type Avatar = "avatar1" | "avatar2" | "avatar3";

// Context
interface GamificationContextType {
  xp: number;
  challenges: Challenge[];
  unlockedThemes: Theme[];
  currentTheme: Theme;
  unlockedAvatars: Avatar[];
  currentAvatar: Avatar;
  completeChallenge: (id: string) => void;
  setTheme: (theme: Theme) => void;
  setAvatar: (avatar: Avatar) => void;
  addXP: (amount: number) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
  undefined
);

export const GamificationProvider = ({ children }: { children: ReactNode }) => {
  const [xp, setXP] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "daily-quiz",
      type: "daily",
      description: "Complete a quiz today",
      completed: false,
      reward: "50 XP",
    },
    {
      id: "weekly-modes",
      type: "weekly",
      description: "Try all AI modes this week",
      completed: false,
      reward: "Unlock Purple Theme",
    },
  ]);
  const [unlockedThemes, setUnlockedThemes] = useState<Theme[]>(["default"]);
  const [currentTheme, setCurrentTheme] = useState<Theme>("default");
  const [unlockedAvatars, setUnlockedAvatars] = useState<Avatar[]>(["avatar1"]);
  const [currentAvatar, setCurrentAvatar] = useState<Avatar>("avatar1");

  const completeChallenge = (id: string) => {
    setChallenges((chs) =>
      chs.map((ch) =>
        ch.id === id && !ch.completed ? { ...ch, completed: true } : ch
      )
    );

    const challenge = challenges.find((ch) => ch.id === id);
    if (challenge && !challenge.completed) {
      if (challenge.reward.includes("XP")) {
        const xpAmount = parseInt(challenge.reward.replace(/\D/g, ""), 10) || 0;
        setXP((xp) => xp + xpAmount);
      } else if (challenge.reward.includes("Theme")) {
        if (!unlockedThemes.includes("purple")) {
          setUnlockedThemes((t) => [...t, "purple"]);
        }
        setCurrentTheme("purple");
      }
      // Add more reward types as needed
    }
  };

  const setTheme = (theme: Theme) => {
    if (unlockedThemes.includes(theme)) setCurrentTheme(theme);
  };
  const setAvatar = (avatar: Avatar) => {
    if (unlockedAvatars.includes(avatar)) setCurrentAvatar(avatar);
  };
  const addXP = (amount: number) => setXP((xp) => xp + amount);

  return (
    <GamificationContext.Provider
      value={{
        xp,
        challenges,
        unlockedThemes,
        currentTheme,
        unlockedAvatars,
        currentAvatar,
        completeChallenge,
        setTheme,
        setAvatar,
        addXP,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const ctx = useContext(GamificationContext);
  if (!ctx)
    throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
};

// Hook to show congrats modal after XP is awarded
export const useAwardXpWithCongrats = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const { addXP } = useGamification();
  const awardXp = (amount: number) => {
    addXP(amount);
    setShowCongrats(true);
    setTimeout(() => setShowCongrats(false), 2500);
  };
  return { showCongrats, awardXp };
};

// Sample modal to show challenges and rewards
export const ChallengesModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { challenges, xp, unlockedThemes, currentTheme } = useGamification();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>🎯 Challenges & Rewards</Text>
          <Text style={styles.xp}>XP: {xp}</Text>
          {challenges.map((ch) => (
            <View key={ch.id} style={styles.challengeRow}>
              <Text style={styles.challengeDesc}>{ch.description}</Text>
              <Text style={styles.challengeReward}>{ch.reward}</Text>
              <Text style={ch.completed ? styles.completed : styles.incomplete}>
                {ch.completed ? "Completed" : "Incomplete"}
              </Text>
            </View>
          ))}
          <Text style={styles.title}>🎨 Themes</Text>
          <Text>Unlocked: {unlockedThemes.join(", ")}</Text>
          <Text>Current: {currentTheme}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#161b22",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxHeight: "80%",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  xp: {
    color: "#58a6ff",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  challengeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  challengeDesc: {
    color: "#fff",
    flex: 2,
  },
  challengeReward: {
    color: "#fbbf24",
    flex: 1,
    textAlign: "center",
  },
  completed: {
    color: "#22c55e",
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  incomplete: {
    color: "#f85149",
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  closeBtn: {
    marginTop: 24,
    alignSelf: "center",
    backgroundColor: "#7c3aed",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
