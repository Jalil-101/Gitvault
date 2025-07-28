import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Clipboard,
  Dimensions,
  Modal,
  Switch,
  Animated,
  Vibration,
  PanResponder,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import * as ImagePicker from "expo-image-picker";

// Custom Icon Components
const QuizIcon = () => (
  <View
    style={{
      width: 16,
      height: 16,
      backgroundColor: "#fff",
      borderRadius: 2,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 8,
        height: 2,
        backgroundColor: "#7c3aed",
        marginBottom: 1,
      }}
    />
    <View
      style={{
        width: 6,
        height: 2,
        backgroundColor: "#7c3aed",
        marginBottom: 1,
      }}
    />
    <View style={{ width: 10, height: 2, backgroundColor: "#7c3aed" }} />
  </View>
);

const SettingsIcon = () => (
  <View
    style={{
      width: 16,
      height: 16,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#f0f6fc",
        position: "relative",
      }}
    >
      <View
        style={{
          width: 2,
          height: 2,
          backgroundColor: "#f0f6fc",
          position: "absolute",
          top: 2,
          left: 5,
        }}
      />
      <View
        style={{
          width: 2,
          height: 2,
          backgroundColor: "#f0f6fc",
          position: "absolute",
          bottom: 2,
          left: 5,
        }}
      />
      <View
        style={{
          width: 2,
          height: 2,
          backgroundColor: "#f0f6fc",
          position: "absolute",
          left: 2,
          top: 5,
        }}
      />
      <View
        style={{
          width: 2,
          height: 2,
          backgroundColor: "#f0f6fc",
          position: "absolute",
          right: 2,
          top: 5,
        }}
      />
    </View>
  </View>
);

const SendIcon = () => (
  <View style={{ width: 16, height: 16, transform: [{ rotate: "45deg" }] }}>
    <View
      style={{
        width: 12,
        height: 2,
        backgroundColor: "#fff",
        position: "absolute",
        top: 7,
        left: 2,
      }}
    />
    <View
      style={{
        width: 2,
        height: 12,
        backgroundColor: "#fff",
        position: "absolute",
        top: 2,
        left: 7,
      }}
    />
  </View>
);

const VoiceIcon = () => (
  <View
    style={{
      width: 16,
      height: 16,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 8,
        height: 12,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#fff",
        backgroundColor: "transparent",
      }}
    />
    <View
      style={{ width: 2, height: 4, backgroundColor: "#fff", marginTop: 2 }}
    />
  </View>
);

const CopyIcon = () => (
  <View style={{ width: 14, height: 14, position: "relative" }}>
    <View
      style={{
        width: 10,
        height: 12,
        borderWidth: 1,
        borderColor: "#8b949e",
        backgroundColor: "#21262d",
        position: "absolute",
        top: 2,
        left: 2,
      }}
    />
    <View
      style={{
        width: 10,
        height: 12,
        borderWidth: 1,
        borderColor: "#8b949e",
        backgroundColor: "#21262d",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  </View>
);

const SpeakIcon = () => (
  <View
    style={{
      width: 16,
      height: 16,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#8b949e",
      }}
    />
    <View
      style={{ width: 2, height: 6, backgroundColor: "#8b949e", marginTop: 2 }}
    />
  </View>
);

const StopIcon = () => (
  <View
    style={{
      width: 16,
      height: 16,
      backgroundColor: "#f85149",
      borderRadius: 2,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{ width: 6, height: 6, backgroundColor: "#fff", borderRadius: 1 }}
    />
  </View>
);

const LoadingIcon = () => (
  <View
    style={{
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: "#7c3aed",
      borderTopColor: "transparent",
      transform: [{ rotate: "0deg" }],
    }}
  />
);

const AttachmentIcon = () => (
  <View
    style={{
      width: 16,
      height: 16,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 12,
        height: 14,
        borderWidth: 1,
        borderColor: "#8b949e",
        borderRadius: 2,
        position: "relative",
      }}
    >
      <View
        style={{
          width: 6,
          height: 8,
          borderWidth: 1,
          borderColor: "#8b949e",
          backgroundColor: "#21262d",
          position: "absolute",
          top: 2,
          left: 2,
        }}
      />
      <View
        style={{
          width: 2,
          height: 2,
          backgroundColor: "#8b949e",
          position: "absolute",
          top: 6,
          left: 5,
        }}
      />
    </View>
  </View>
);

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
  messageType?:
    | "text"
    | "code"
    | "commit"
    | "analysis"
    | "suggestion"
    | "voice";
  metadata?: {
    language?: string;
    confidence?: number;
    codeQuality?: number;
    suggestions?: string[];
    audioLength?: number;
    sentiment?: "positive" | "neutral" | "negative";
  };
}

interface VoiceState {
  isRecording: boolean;
  isPlaying: boolean;
  recordingTime: number;
  audioLevel: number;
}

interface SmartFeatures {
  voiceEnabled: boolean;
  realTimeAnalysis: boolean;
  predictiveMode: boolean;
  contextAwareness: boolean;
  aiPersonality: "professional" | "friendly" | "witty" | "mentor";
}

interface VaultAIChatScreenProps {
  apiKey?: string;
  onClose?: () => void;
  initialContext?: string;
  currentBranch?: string;
  repoStats?: {
    commits: number;
    contributors: number;
    languages: string[];
  };
}

const VaultAIChatScreen: React.FC<VaultAIChatScreenProps> = ({
  apiKey = "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",
  onClose,
  initialContext,
  currentBranch = "main",
  repoStats,
}) => {
  // Speech-to-text API key
  const speechApiKey = "4569cbe2e0f24bf084730fc2cd4d8532";
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiMode, setAiMode] = useState<
    "chat" | "analysis" | "commit" | "review" | "voice"
  >("chat");
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);

  const [voiceState, setVoiceState] = useState<VoiceState>({
    isRecording: false,
    isPlaying: false,
    recordingTime: 0,
    audioLevel: 0,
  });

  const [smartFeatures, setSmartFeatures] = useState<SmartFeatures>({
    voiceEnabled: true,
    realTimeAnalysis: true,
    predictiveMode: true,
    contextAwareness: true,
    aiPersonality: "friendly",
  });

  const [codeContext, setCodeContext] = useState<string>("");
  const [userMood, setUserMood] = useState<
    "happy" | "frustrated" | "focused" | "curious"
  >("focused");
  const [showVoiceWave, setShowVoiceWave] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const recordingTimer = useRef<number | undefined>(undefined);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Draggable settings button state
  const [settingsBtnPos, setSettingsBtnPos] = useState({
    x: Dimensions.get("window").width - 72,
    y: 32,
  });
  const pan = useRef(new Animated.ValueXY(settingsBtnPos)).current;

  useEffect(() => {
    pan.setValue(settingsBtnPos);
  }, [settingsBtnPos]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const { x, y } = (pan as any).__getValue();
        pan.setOffset({ x, y });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        const { x, y } = (pan as any).__getValue();
        setSettingsBtnPos({ x, y });
      },
    })
  ).current;

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizBtnPos, setQuizBtnPos] = useState({ x: 30, y: 200 });
  const quizPan = useRef(new Animated.ValueXY(quizBtnPos)).current;

  useEffect(() => {
    quizPan.setValue(quizBtnPos);
  }, [quizBtnPos]);

  const quizPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        quizPan.setOffset((quizPan as any).__getValue());
        quizPan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: quizPan.x, dy: quizPan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        quizPan.flattenOffset();
        setQuizBtnPos((quizPan as any).__getValue());
      },
    })
  ).current;

  // Add quiz-related state after the existing state declarations:
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  // Add image upload state after other state declarations:
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUploadEnabled, setImageUploadEnabled] = useState(true);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Show a welcome message for chat or voice mode when entering with no messages
  useEffect(() => {
    if (messages.length === 0) {
      if (aiMode === "voice") {
        setMessages([
          {
            id: "1",
            text: "Vault AI Voice-Enhanced is online! Ready to revolutionize your development experience?",
            isUser: false,
            timestamp: new Date(),
            messageType: "text",
            metadata: { sentiment: "positive" },
          },
        ]);
      } else if (aiMode === "chat") {
        setMessages([
          {
            id: "1",
            text: "Welcome to Vault AI Chat! How can I assist you today?",
            isUser: false,
            timestamp: new Date(),
            messageType: "text",
            metadata: { sentiment: "positive" },
          },
        ]);
      }
    }
  }, [aiMode]);

  // Function to call OpenRouter API
  const callOpenRouterAPI = async (
    userMessage: string,
    conversationHistory: Message[]
  ) => {
    try {
      // Build conversation context based on AI mode
      let systemPrompt = `You are Vault AI, a ${smartFeatures.aiPersonality} development assistant. You're intelligent, helpful, and specialized in software development. Current branch: ${currentBranch}.`;
      switch (aiMode) {
        case "analysis":
          systemPrompt +=
            " You are a specialized code analysis assistant. Provide detailed code analysis, identify potential issues, suggest improvements, and explain best practices.";
          break;
        case "commit":
          systemPrompt +=
            " You are a git commit message specialist. Help generate clear, conventional commit messages and review commit strategies.";
          break;
        case "review":
          systemPrompt +=
            " You are a code review expert. Provide thorough code reviews, identify bugs, suggest optimizations, and ensure code quality.";
          break;
        case "voice":
          systemPrompt +=
            " You have voice capabilities. Respond naturally as if in a conversation, keeping responses concise but helpful.";
          break;
        default:
          // Already set above
          break;
      }

      // Add repository context if available
      if (repoStats) {
        systemPrompt += ` Repository context: ${repoStats.commits} commits, ${
          repoStats.contributors
        } contributors, languages: ${repoStats.languages.join(", ")}.`;
      }

      if (initialContext) {
        systemPrompt += ` Additional context: ${initialContext}`;
      }

      // Build messages array for API
      const apiMessages = [
        { role: "system", content: systemPrompt },
        // Include recent conversation history (last 10 messages)
        ...conversationHistory
          .slice(-10)
          .filter((msg) => !msg.isLoading)
          .map((msg) => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text,
          })),
        { role: "user", content: userMessage },
      ];

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": "https://vault-ai-app.com", // You can change this to your actual site
            "X-Title": "Vault AI Development Assistant",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528:free",
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 2048,
            stream: false,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API Error: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error("Invalid API response format");
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API Error:", error);

      // Return a helpful error message
      if (error instanceof Error) {
        if (error.message.includes("401")) {
          return "❌ Authentication failed. Please check your API key.";
        } else if (error.message.includes("429")) {
          return "⏳ Rate limit reached. Please wait a moment before trying again.";
        } else if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          return "🌐 Network error. Please check your internet connection.";
        } else {
          return `⚠ AI Error: ${error.message}. Please try again.`;
        }
      } else {
        return "⚠ AI Error: Unknown error. Please try again.";
      }
    }
  };

  // Add function to generate quiz questions using AI:
  const generateQuizQuestions = async () => {
    setIsGeneratingQuiz(true);
    try {
      // Get recent chat messages for context
      const recentMessages = messages
        .slice(-5)
        .map((msg) => msg.text)
        .join("\n");

      const quizPrompt = `Based on this conversation context, generate 3 multiple-choice quiz questions to test understanding. 
      Format each question as JSON:
      {
        "question": "Question text here?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": "A",
        "explanation": "Why this is correct"
      }
      
      Context: ${recentMessages}
      
      Return only valid JSON array with 3 questions.`;

      const response = await callOpenRouterAPI(quizPrompt, []);

      try {
        const questions = JSON.parse(response);
        setQuizQuestions(questions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setQuizResults(null);
      } catch (parseError) {
        // If AI response isn't valid JSON, create a fallback quiz
        setQuizQuestions([
          {
            question: "What is the main purpose of this AI assistant?",
            options: [
              "Code generation",
              "General chat",
              "Development assistance",
              "All of the above",
            ],
            correctAnswer: "Development assistance",
            explanation: "This AI is designed to help with development tasks.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      // Fallback quiz
      setQuizQuestions([
        {
          question: "What is the main purpose of this AI assistant?",
          options: [
            "Code generation",
            "General chat",
            "Development assistance",
            "All of the above",
          ],
          correctAnswer: "Development assistance",
          explanation: "This AI is designed to help with development tasks.",
        },
      ]);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Add function to handle quiz answer selection:
  const handleQuizAnswer = (selectedAnswer: string) => {
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, calculate results
      const correctAnswers = newAnswers.filter(
        (answer, index) => answer === quizQuestions[index].correctAnswer
      ).length;

      const score = (correctAnswers / quizQuestions.length) * 100;
      setQuizResults({
        score,
        correctAnswers,
        totalQuestions: quizQuestions.length,
        answers: newAnswers,
      });
    }
  };

  // Add function to restart quiz:
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResults(null);
    setQuizQuestions([]);
    setShowQuizModal(false);
  };

  const handleSendMessage = async () => {
    const textToSend = inputText.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
      messageType: aiMode as any,
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Call the actual OpenRouter API
      const aiResponse = await callOpenRouterAPI(textToSend, messages);

      const responseMessage: Message = {
        id: loadingMessage.id,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        isLoading: false,
        messageType: aiMode as any,
        metadata: {
          sentiment: "positive",
          confidence: 0.9,
        },
      };

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id ? responseMessage : msg
        )
      );
    } catch (error) {
      // Handle any unexpected errors
      const errorMessage: Message = {
        id: loadingMessage.id,
        text: "❌ Something went wrong. Please try again.",
        isUser: false,
        timestamp: new Date(),
        isLoading: false,
        metadata: { sentiment: "negative" },
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? errorMessage : msg))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("✅ Copied!", "Message copied to clipboard");
  };

  // Real speech-to-text functionality
  const startVoiceRecording = async () => {
    try {
      setVoiceState((prev) => ({ ...prev, isRecording: true }));
      setSmartFeatures((prev) => ({ ...prev, voiceEnabled: true }));
      Vibration.vibrate(50);

      // Start recording timer
      recordingTimer.current = setInterval(() => {
        setVoiceState((prev) => ({
          ...prev,
          recordingTime: prev.recordingTime + 1,
          audioLevel: Math.random() * 100,
        }));
      }, 100) as any;

      // Simulate recording for now (we'll implement real recording later)
      console.log("🎤 Voice recording started...");
    } catch (error) {
      console.error("Error starting voice recording:", error);
      Alert.alert("Voice Error", "Failed to start voice recording");
    }
  };

  const stopVoiceRecording = async () => {
    try {
      setVoiceState((prev) => ({
        ...prev,
        isRecording: false,
        recordingTime: 0,
      }));
      setSmartFeatures((prev) => ({ ...prev, voiceEnabled: false }));

      if (recordingTimer.current) {
        clearInterval(recordingTimer.current);
      }
      Vibration.vibrate(100);

      // Simulate processing the recorded audio
      const simulatedText =
        "Hello, this is a simulated voice input. Please implement real speech-to-text API integration.";

      // Add the transcribed text to input
      setInputText(simulatedText);

      console.log(
        "🎤 Voice recording stopped. Transcribed text:",
        simulatedText
      );
    } catch (error) {
      console.error("Error stopping voice recording:", error);
      Alert.alert("Voice Error", "Failed to process voice recording");
    }
  };

  const handleVoicePress = () => {
    if (voiceState.isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  };

  const speakText = (text: string) => {
    Speech.speak(text, { language: "en" });
  };

  // Real speech-to-text API function
  const transcribeAudio = async (audioData: string): Promise<string> => {
    try {
      // This is a placeholder for the actual speech-to-text API call
      // You'll need to implement this based on your specific speech API

      const response = await fetch(
        "https://api.speech-to-text-service.com/transcribe",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${speechApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audio: audioData,
            language: "en-US",
            format: "base64",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Speech API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.transcription || "Could not transcribe audio";
    } catch (error) {
      console.error("Speech-to-text error:", error);
      throw new Error("Failed to transcribe audio");
    }
  };

  const renderAdvancedPanel = () => (
    <Modal
      visible={showAdvancedPanel}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowAdvancedPanel(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>⚙ Advanced Settings</Text>
            <TouchableOpacity
              onPress={() => setShowAdvancedPanel(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>🎯 Smart Features</Text>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Voice Enabled</Text>
                <Switch
                  value={smartFeatures.voiceEnabled}
                  onValueChange={(value) =>
                    setSmartFeatures((prev) => ({
                      ...prev,
                      voiceEnabled: value,
                    }))
                  }
                  trackColor={{ false: "#30363d", true: "#238636" }}
                  thumbColor={
                    smartFeatures.voiceEnabled ? "#f0f6fc" : "#8b949e"
                  }
                />
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Real-time Analysis</Text>
                <Switch
                  value={smartFeatures.realTimeAnalysis}
                  onValueChange={(value) =>
                    setSmartFeatures((prev) => ({
                      ...prev,
                      realTimeAnalysis: value,
                    }))
                  }
                  trackColor={{ false: "#30363d", true: "#238636" }}
                  thumbColor={
                    smartFeatures.realTimeAnalysis ? "#f0f6fc" : "#8b949e"
                  }
                />
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Predictive Mode</Text>
                <Switch
                  value={smartFeatures.predictiveMode}
                  onValueChange={(value) =>
                    setSmartFeatures((prev) => ({
                      ...prev,
                      predictiveMode: value,
                    }))
                  }
                  trackColor={{ false: "#30363d", true: "#238636" }}
                  thumbColor={
                    smartFeatures.predictiveMode ? "#f0f6fc" : "#8b949e"
                  }
                />
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>🤖 AI Personality</Text>
              <View style={styles.personalityButtons}>
                {["professional", "friendly", "witty", "mentor"].map(
                  (personality) => (
                    <TouchableOpacity
                      key={personality}
                      style={[
                        styles.personalityButton,
                        smartFeatures.aiPersonality === personality &&
                          styles.activePersonalityButton,
                      ]}
                      onPress={() =>
                        setSmartFeatures((prev) => ({
                          ...prev,
                          aiPersonality: personality as any,
                        }))
                      }
                    >
                      <Text
                        style={[
                          styles.personalityButtonText,
                          smartFeatures.aiPersonality === personality &&
                            styles.activePersonalityButtonText,
                        ]}
                      >
                        {personality.charAt(0).toUpperCase() +
                          personality.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>

            {repoStats && (
              <View style={styles.settingSection}>
                <Text style={styles.sectionTitle}>📊 Repository Stats</Text>
                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{repoStats.commits}</Text>
                    <Text style={styles.statLabel}>Commits</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {repoStats.contributors}
                    </Text>
                    <Text style={styles.statLabel}>Contributors</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {repoStats.languages.length}
                    </Text>
                    <Text style={styles.statLabel}>Languages</Text>
                  </View>
                </View>
                <Text style={styles.languagesList}>
                  Languages: {repoStats.languages.join(", ")}
                </Text>
              </View>
            )}

            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>🔑 API Status</Text>
              <View style={styles.apiStatus}>
                <Text style={styles.apiStatusText}>
                  AI Model: DeepSeek R1 (Free)
                </Text>
                <Text style={styles.apiStatusText}>
                  AI Status: {apiKey ? "✅ Connected" : "❌ No API Key"}
                </Text>
                <Text style={styles.apiStatusText}>
                  Speech API: {speechApiKey ? "✅ Connected" : "❌ No API Key"}
                </Text>
                <Text style={styles.apiStatusText}>
                  Voice Features:{" "}
                  {speechApiKey ? "🎤 Available" : "❌ Disabled"}
                </Text>
              </View>
            </View>

            <View style={styles.settingSection}>
              <Text style={styles.sectionTitle}>🖼 Image Upload</Text>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Enable Image Upload</Text>
                <Switch
                  value={imageUploadEnabled}
                  onValueChange={(value) => setImageUploadEnabled(value)}
                  trackColor={{ false: "#30363d", true: "#238636" }}
                  thumbColor={imageUploadEnabled ? "#f0f6fc" : "#8b949e"}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderVoiceButton = () => (
    <TouchableOpacity
      style={[
        styles.voiceButton,
        voiceState.isRecording && styles.voiceButtonActive,
      ]}
      onPress={handleVoicePress}
      onLongPress={handleVoicePress}
    >
      <Animated.View
        style={[
          styles.voiceButtonInner,
          voiceState.isRecording && {
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <Text style={styles.voiceButtonText}>
          <VoiceIcon />
        </Text>
      </Animated.View>
      {voiceState.isRecording && (
        <View style={styles.recordingIndicator}>
          <Text style={styles.recordingTime}>
            {Math.floor(voiceState.recordingTime / 10)}s
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isUser ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isUser ? styles.userBubble : styles.aiBubble,
        ]}
      >
        {message.isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#58a6ff" />
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        ) : (
          <>
            <Text
              style={[
                styles.messageText,
                message.isUser ? styles.userText : styles.aiText,
              ]}
            >
              {message.text}
            </Text>
            {!message.isUser && (
              <View style={styles.messageActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => copyToClipboard(message.text)}
                >
                  <CopyIcon />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => speakText(message.text)}
                >
                  <SpeakIcon />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => Speech.stop()}
                >
                  <StopIcon />
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
      <Text style={styles.timestamp}>
        {message.timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );

  const renderModeSelector = () => (
    <View style={styles.modeSelector}>
      {[
        "chat",
        "voice",
        "commit",
        "review",
        ...(smartFeatures.realTimeAnalysis ? ["analysis"] : []),
      ].map((mode) => (
        <TouchableOpacity
          key={mode}
          style={[
            styles.modeButton,
            aiMode === mode && styles.activeModeButton,
          ]}
          onPress={() => setAiMode(mode as any)}
        >
          <Text
            style={[
              styles.modeButtonText,
              aiMode === mode && styles.activeModeButtonText,
            ]}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Add pulse animation effect
  useEffect(() => {
    if (voiceState.isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [voiceState.isRecording]);

  // Add image picker function:
  const pickImage = async () => {
    try {
      // Request permissions
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant permission to access your photo library."
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].base64 || null);
        // Auto-send image to AI for analysis
        await sendImageToAI(result.assets[0].base64 || "");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  // Add function to send image to AI:
  const sendImageToAI = async (imageBase64: string) => {
    const imageMessage: Message = {
      id: Date.now().toString(),
      text: "[Image uploaded - analyzing...]",
      isUser: true,
      timestamp: new Date(),
      messageType: "analysis",
    };

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "",
      isUser: false,
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, imageMessage, loadingMessage]);
    setSelectedImage(null);

    try {
      // Create a smart prompt that works with text-based AI
      const imagePrompt = `I've uploaded an image for analysis. Since you're a text-based AI, I'll help you understand what I need:

*Image Analysis Request:*
- I've shared a screenshot/image that I need help with
- Please provide guidance on how to best describe this image to you
- Suggest what specific details would be most helpful for analysis

*Common Image Types & What to Share:*
1. *Code Screenshots*: Paste the code text + describe the issue/context
2. *Error Messages*: Share the exact error text + what you were doing
3. *UI/Design*: Describe the interface + what you want to improve
4. *Diagrams*: Explain the components + relationships you see

*Next Steps:*
Please guide me on what specific information from this image would be most valuable for you to analyze effectively.`;

      const aiResponse = await callOpenRouterAPI(imagePrompt, messages);

      const responseMessage: Message = {
        id: loadingMessage.id,
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        isLoading: false,
        messageType: "analysis",
        metadata: {
          sentiment: "positive",
          confidence: 0.9,
        },
      };

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id ? responseMessage : msg
        )
      );
    } catch (error) {
      const errorMessage: Message = {
        id: loadingMessage.id,
        text: "❌ Failed to analyze image. Please try again.",
        isUser: false,
        timestamp: new Date(),
        isLoading: false,
        metadata: { sentiment: "negative" },
      };

      setMessages((prev) =>
        prev.map((msg) => (msg.id === loadingMessage.id ? errorMessage : msg))
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.purpleHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Vault AI</Text>
          <Text style={styles.headerSubtitle}>Voice-Enhanced Intelligence</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.advancedButton}
            onPress={() => setShowAdvancedPanel(true)}
          >
            <SettingsIcon />
          </TouchableOpacity>
        </View>
      </View>

      {renderModeSelector()}

      <View style={styles.chatContainer}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
        </ScrollView>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Talk to Vault AI (${aiMode} mode)...`}
            placeholderTextColor="#6e7681"
            multiline
            maxLength={1000}
          />
          <View style={styles.inputActions}>
            <Text style={styles.charCount}>{inputText.length}/1000</Text>
            {smartFeatures.voiceEnabled && renderVoiceButton()}
            {imageUploadEnabled && (
              <TouchableOpacity
                style={styles.attachmentButton}
                onPress={pickImage}
                disabled={isLoading}
              >
                <AttachmentIcon />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
            >
              {isLoading ? <LoadingIcon /> : <SendIcon />}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {renderAdvancedPanel()}
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 85,
          top: 37,
          zIndex: 30,
          backgroundColor: "#7c3aed",
          borderRadius: 16,
          padding: 8,
          elevation: 6,
          borderWidth: 2,
          borderColor: "#fff",
        }}
        onPress={() => setShowQuizModal(true)}
        activeOpacity={0.8}
      >
        <QuizIcon />
      </TouchableOpacity>
      {showQuizModal && (
        <Modal
          visible={showQuizModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowQuizModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.8)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#161b22",
                borderRadius: 16,
                padding: 24,
                width: "90%",
                maxHeight: "80%",
              }}
            >
              {quizQuestions.length === 0 && !isGeneratingQuiz && (
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 16,
                      textAlign: "center",
                    }}
                  >
                    Quiz Generator
                  </Text>
                  <Text
                    style={{
                      color: "#8b949e",
                      fontSize: 16,
                      marginBottom: 24,
                      textAlign: "center",
                    }}
                  >
                    Generate quiz questions based on your recent conversation
                    with Vault AI
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#7c3aed",
                      padding: 16,
                      borderRadius: 12,
                      alignItems: "center",
                    }}
                    onPress={generateQuizQuestions}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      Generate Quiz
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {isGeneratingQuiz && (
                <View style={{ alignItems: "center", padding: 32 }}>
                  <ActivityIndicator size="large" color="#7c3aed" />
                  <Text style={{ color: "#fff", fontSize: 16, marginTop: 16 }}>
                    Generating quiz questions...
                  </Text>
                </View>
              )}

              {quizQuestions.length > 0 &&
                !isGeneratingQuiz &&
                !quizResults && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Question {currentQuestionIndex + 1} of{" "}
                        {quizQuestions.length}
                      </Text>
                      <Text style={{ color: "#7c3aed", fontSize: 14 }}>
                        {Math.round(
                          ((currentQuestionIndex + 1) / quizQuestions.length) *
                            100
                        )}
                        %
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        marginBottom: 20,
                        lineHeight: 24,
                      }}
                    >
                      {quizQuestions[currentQuestionIndex].question}
                    </Text>

                    {quizQuestions[currentQuestionIndex].options.map(
                      (option: string, index: number) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor: "#21262d",
                            padding: 16,
                            borderRadius: 12,
                            marginBottom: 12,
                            borderWidth: 1,
                            borderColor: "#30363d",
                          }}
                          onPress={() => handleQuizAnswer(option)}
                        >
                          <Text style={{ color: "#fff", fontSize: 16 }}>
                            {String.fromCharCode(65 + index)}. {option}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                )}

              {quizResults && (
                <View>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 24,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: 20,
                    }}
                  >
                    Quiz Complete!
                  </Text>

                  <View
                    style={{
                      backgroundColor: "#21262d",
                      padding: 20,
                      borderRadius: 12,
                      marginBottom: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 18,
                        textAlign: "center",
                        marginBottom: 8,
                      }}
                    >
                      Score: {quizResults.score}%
                    </Text>
                    <Text
                      style={{
                        color: "#8b949e",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      {quizResults.correctAnswers} out of{" "}
                      {quizResults.totalQuestions} correct
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#7c3aed",
                        padding: 12,
                        borderRadius: 8,
                        flex: 1,
                        marginRight: 8,
                      }}
                      onPress={restartQuiz}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        New Quiz
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#30363d",
                        padding: 12,
                        borderRadius: 8,
                        flex: 1,
                        marginLeft: 8,
                      }}
                      onPress={() => setShowQuizModal(false)}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {!isGeneratingQuiz &&
                quizQuestions.length === 0 &&
                !quizResults && (
                  <TouchableOpacity
                    onPress={() => setShowQuizModal(false)}
                    style={{ alignSelf: "flex-end", marginTop: 16 }}
                  >
                    <Text style={{ color: "#7c3aed", fontSize: 16 }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f1419",
  },
  header: {
    backgroundColor: "#1e2328",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#58a6ff",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#8b949e",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  advancedButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#21262d",
    borderRadius: 6,
  },
  advancedButtonText: {
    fontSize: 16,
    color: "#f0f6fc",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#f85149",
    fontWeight: "bold",
  },
  modeSelector: {
    flexDirection: "row",
    backgroundColor: "#161b22",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  modeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: "#21262d",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  activeModeButton: {
    backgroundColor: "#58a6ff",
    borderColor: "#58a6ff",
  },
  modeButtonText: {
    fontSize: 12,
    color: "#8b949e",
    fontWeight: "500",
  },
  activeModeButtonText: {
    color: "#ffffff",
  },
  chatContainer: {
    flex: 1,
    marginTop: 40, // Move the chat area down
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: "flex-end",
  },
  aiMessage: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "85%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#238636",
  },
  aiBubble: {
    backgroundColor: "#21262d",
    borderWidth: 1,
    borderColor: "#30363d",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#ffffff",
  },
  aiText: {
    color: "#f0f6fc",
  },
  messageActions: {
    flexDirection: "row",
    marginTop: 8,
    gap: 8,
  },
  actionButton: {
    backgroundColor: "#0d1117",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  actionButtonText: {
    fontSize: 11,
    color: "#8b949e",
    fontWeight: "500",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 8,
    color: "#58a6ff",
    fontSize: 14,
    fontStyle: "italic",
  },
  timestamp: {
    fontSize: 11,
    color: "#6e7681",
    marginTop: 4,
  },
  inputContainer: {
    backgroundColor: "#161b22",
    borderTopWidth: 1,
    borderTopColor: "#30363d",
    padding: 16,
    marginBottom: 32, // Move the input area up from the very bottom
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#30363d",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 120,
    fontSize: 16,
    backgroundColor: "#21262d",
    color: "#f0f6fc",
  },
  inputActions: {
    alignItems: "center",
    marginLeft: 8,
  },
  charCount: {
    fontSize: 10,
    color: "#6e7681",
    marginBottom: 4,
  },
  sendButton: {
    backgroundColor: "#238636",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 50,
    marginTop: 4,
  },
  sendButtonDisabled: {
    backgroundColor: "#6e7681",
  },
  sendButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  // Voice button styles
  voiceButton: {
    backgroundColor: "#21262d",
    borderRadius: 20,
    padding: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  voiceButtonActive: {
    backgroundColor: "#f85149",
    borderColor: "#f85149",
  },
  voiceButtonInner: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
  },
  voiceButtonText: {
    fontSize: 16,
  },
  recordingIndicator: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f85149",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  recordingTime: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#161b22",
    borderRadius: 16,
    width: "90%",
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "#30363d",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f0f6fc",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 18,
    color: "#f85149",
    fontWeight: "bold",
  },
  modalBody: {
    padding: 20,
  },
  settingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#58a6ff",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#30363d",
  },
  settingLabel: {
    fontSize: 14,
    color: "#f0f6fc",
  },
  personalityButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  personalityButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#21262d",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  activePersonalityButton: {
    backgroundColor: "#58a6ff",
    borderColor: "#58a6ff",
  },
  personalityButtonText: {
    fontSize: 12,
    color: "#8b949e",
    fontWeight: "500",
  },
  activePersonalityButtonText: {
    color: "#ffffff",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#58a6ff",
  },
  statLabel: {
    fontSize: 12,
    color: "#8b949e",
    marginTop: 4,
  },
  languagesList: {
    fontSize: 12,
    color: "#8b949e",
    fontStyle: "italic",
  },
  apiStatus: {
    backgroundColor: "#21262d",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  apiStatusText: {
    fontSize: 12,
    color: "#8b949e",
    marginBottom: 4,
  },
  purpleHeader: {
    backgroundColor: "#7c3aed", // purple-600
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#5b21b6", // darker purple
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    zIndex: 20,
  },
  attachmentButton: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: "#21262d",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#30363d",
  },
});

export default VaultAIChatScreen;
