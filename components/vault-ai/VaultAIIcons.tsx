import { View } from "react-native";

export const QuizIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      backgroundColor: "#ffffff",
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#7c3aed",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    }}
  >
    <View
      style={{
        width: 10,
        height: 2,
        backgroundColor: "#7c3aed",
        borderRadius: 1,
        marginBottom: 1.5,
      }}
    />
    <View
      style={{
        width: 8,
        height: 2,
        backgroundColor: "#7c3aed",
        borderRadius: 1,
        marginBottom: 1.5,
      }}
    />
    <View
      style={{
        width: 12,
        height: 2,
        backgroundColor: "#7c3aed",
        borderRadius: 1,
      }}
    />
  </View>
);

export const SendIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      transform: [{ rotate: "45deg" }],
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 14,
        height: 2.5,
        backgroundColor: "#ffffff",
        borderRadius: 1.25,
        position: "absolute",
      }}
    />
    <View
      style={{
        width: 2.5,
        height: 14,
        backgroundColor: "#ffffff",
        borderRadius: 1.25,
        position: "absolute",
      }}
    />
  </View>
);

export const VoiceIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 9,
        height: 14,
        borderRadius: 4.5,
        borderWidth: 2.5,
        borderColor: "#ffffff",
        backgroundColor: "transparent",
      }}
    />
    <View
      style={{
        width: 3,
        height: 4,
        backgroundColor: "#ffffff",
        marginTop: 2,
        borderRadius: 1.5,
      }}
    />
  </View>
);

export const CopyIcon = () => (
  <View style={{ width: 16, height: 16, position: "relative" }}>
    <View
      style={{
        width: 11,
        height: 13,
        borderWidth: 1.5,
        borderColor: "#8b949e",
        backgroundColor: "#161b22",
        borderRadius: 2,
        position: "absolute",
        top: 2,
        left: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
      }}
    />
    <View
      style={{
        width: 11,
        height: 13,
        borderWidth: 1.5,
        borderColor: "#58a6ff",
        backgroundColor: "#21262d",
        borderRadius: 2,
        position: "absolute",
        top: 0,
        left: 0,
        shadowColor: "#58a6ff",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
      }}
    />
  </View>
);

export const SpeakIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: "#58a6ff",
        shadowColor: "#58a6ff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
      }}
    />
    <View
      style={{
        width: 3,
        height: 7,
        backgroundColor: "#58a6ff",
        marginTop: 2,
        borderRadius: 1.5,
      }}
    />
  </View>
);

export const StopIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      backgroundColor: "#f85149",
      borderRadius: 3,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#f85149",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 2,
    }}
  >
    <View
      style={{
        width: 8,
        height: 8,
        backgroundColor: "#ffffff",
        borderRadius: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      }}
    />
  </View>
);

export const LoadingIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 2.5,
      borderColor: "rgba(124, 58, 237, 0.3)",
      borderTopColor: "#7c3aed",
      transform: [{ rotate: "0deg" }],
    }}
  />
);

export const AttachmentIcon = () => (
  <View
    style={{
      width: 18,
      height: 18,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 14,
        height: 16,
        borderWidth: 1.5,
        borderColor: "#58a6ff",
        borderRadius: 3,
        position: "relative",
        backgroundColor: "rgba(88, 166, 255, 0.1)",
        shadowColor: "#58a6ff",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
      }}
    >
      <View
        style={{
          width: 8,
          height: 10,
          borderWidth: 1,
          borderColor: "#8b949e",
          backgroundColor: "#21262d",
          borderRadius: 2,
          position: "absolute",
          top: 2,
          left: 2,
        }}
      />
      <View
        style={{
          width: 3,
          height: 3,
          backgroundColor: "#58a6ff",
          borderRadius: 1.5,
          position: "absolute",
          top: 6,
          left: 5,
        }}
      />
    </View>
  </View>
);
