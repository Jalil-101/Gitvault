import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import refactored components
import VaultAIHeader from "@/components/vault-ai/VaultAIHeader";
import { QuizIcon } from "@/components/vault-ai/VaultAIIcons";
import VaultAIInput from "@/components/vault-ai/VaultAIInput";
import VaultAIMessage from "@/components/vault-ai/VaultAIMessage";
import VaultAIModeSelector from "@/components/vault-ai/VaultAIModeSelector";
import VaultAIQuizModal from "@/components/vault-ai/VaultAIQuizModal";
import VaultAISettingsModal from "@/components/vault-ai/VaultAISettingsModal";
import { useModernTheme } from "@/context/ThemeContext";

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
  // Modern theme
  const { colors, gradients, isDarkTheme, shadows } = useModernTheme();

  // Speech-to-text API key
  const speechApiKey = "4569cbe2e0f24bf084730fc2cd4d8532";

  // State management
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

  const [imageUploadEnabled, setImageUploadEnabled] = useState(true);

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Animation refs
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const recordingTimer = useRef<number | undefined>(undefined);

  // Draggable quiz button state
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

  // Effects
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Show welcome message
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

  // Pulse animation effect
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

  // API functions
  const callOpenRouterAPI = async (
    userMessage: string,
    conversationHistory: Message[]
  ) => {
    try {
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
      }

      if (repoStats) {
        systemPrompt += ` Repository context: ${repoStats.commits} commits, ${
          repoStats.contributors
        } contributors, languages: ${repoStats.languages.join(", ")}.`;
      }

      if (initialContext) {
        systemPrompt += ` Additional context: ${initialContext}`;
      }

      const apiMessages = [
        { role: "system", content: systemPrompt },
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
            "HTTP-Referer": "https://vault-ai-app.com",
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
      return data.choices[0].message.content;
    } catch (error) {
      console.error("OpenRouter API Error:", error);
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

  // Quiz functions
  const generateQuizQuestions = async (concept?: string) => {
    setIsGeneratingQuiz(true);
    try {
      // Map concepts to Open Trivia categories
      const categoryMap: { [key: string]: number } = {
        "react-native": 18, // Science: Computers
        typescript: 18, // Science: Computers
        javascript: 18, // Science: Computers
        general: 9, // General Knowledge
      };

      const category = categoryMap[concept || "general"] || 18;
      const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.response_code === 0 && data.results) {
        // Transform Open Trivia format to our quiz format
        const questions = data.results.map((triviaQuestion: any) => {
          // Decode HTML entities in question and answers
          const decodeHtml = (html: string) => {
            return html
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
              .replace(/&ldquo;/g, '"')
              .replace(/&rdquo;/g, '"')
              .replace(/&lsquo;/g, "'")
              .replace(/&rsquo;/g, "'");
          };

          const question = decodeHtml(triviaQuestion.question);
          const correctAnswer = decodeHtml(triviaQuestion.correct_answer);
          const incorrectAnswers = triviaQuestion.incorrect_answers.map(
            (answer: string) => decodeHtml(answer)
          );

          // Shuffle all answers
          const allAnswers = [correctAnswer, ...incorrectAnswers];
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

          return {
            question,
            options: shuffledAnswers,
            correctAnswer,
            explanation: `The correct answer is "${correctAnswer}". This question tests your knowledge in the ${
              concept || "general"
            } category.`,
          };
        });

        setQuizQuestions(questions);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setQuizResults(null);
      } else {
        // Fallback to default questions if API fails
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
      // Fallback to default questions
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

  const handleQuizAnswer = (selectedAnswer: string) => {
    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
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

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResults(null);
    setQuizQuestions([]);
    setShowQuizModal(false);
  };

  // Message handling
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

  // Voice functions
  const startVoiceRecording = async () => {
    try {
      setVoiceState((prev) => ({ ...prev, isRecording: true }));
      setSmartFeatures((prev) => ({ ...prev, voiceEnabled: true }));
      Vibration.vibrate(50);

      recordingTimer.current = setInterval(() => {
        setVoiceState((prev) => ({
          ...prev,
          recordingTime: prev.recordingTime + 1,
          audioLevel: Math.random() * 100,
        }));
      }, 100) as any;

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

      const simulatedText =
        "Hello, this is a simulated voice input. Please implement real speech-to-text API integration.";
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

  // Image functions
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant permission to access your photo library."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        await sendImageToAI(result.assets[0].base64 || "");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

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

    try {
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
    <View
      style={[styles.container, { backgroundColor: colors.background.primary }]}
    >
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      {/* Animated Background */}
      <LinearGradient
        colors={gradients.background as [any, any, ...any[]]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <VaultAIHeader onSettingsPress={() => setShowAdvancedPanel(true)} />

          <VaultAIModeSelector
            aiMode={aiMode}
            onModeChange={setAiMode}
            realTimeAnalysis={smartFeatures.realTimeAnalysis}
          />

          <View style={styles.chatContainer}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContentContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {messages.map((message) => (
                <VaultAIMessage key={message.id} message={message} />
              ))}
            </ScrollView>
          </View>

          <VaultAIInput
            inputText={inputText}
            onInputChange={setInputText}
            onSend={handleSendMessage}
            isLoading={isLoading}
            voiceEnabled={smartFeatures.voiceEnabled}
            imageUploadEnabled={imageUploadEnabled}
            onVoicePress={handleVoicePress}
            onImagePress={pickImage}
            voiceState={voiceState}
            pulseAnim={pulseAnim}
          />
        </KeyboardAvoidingView>

        {/* Quiz Button */}
        <Animated.View
          style={[
            styles.quizButton,
            {
              transform: quizPan.getTranslateTransform(),
              backgroundColor: colors.accents.purple.main,
              ...shadows.lg,
            },
          ]}
          {...quizPanResponder.panHandlers}
        >
          <TouchableOpacity
            onPress={() => setShowQuizModal(true)}
            activeOpacity={0.8}
          >
            <QuizIcon />
          </TouchableOpacity>
        </Animated.View>

        {/* Modals */}
        <VaultAISettingsModal
          visible={showAdvancedPanel}
          onClose={() => setShowAdvancedPanel(false)}
          smartFeatures={smartFeatures}
          onSmartFeaturesChange={setSmartFeatures}
          imageUploadEnabled={imageUploadEnabled}
          onImageUploadChange={setImageUploadEnabled}
          apiKey={apiKey}
          speechApiKey={speechApiKey}
          repoStats={repoStats}
        />

        <VaultAIQuizModal
          visible={showQuizModal}
          onClose={() => setShowQuizModal(false)}
          quizQuestions={quizQuestions}
          currentQuestionIndex={currentQuestionIndex}
          isGeneratingQuiz={isGeneratingQuiz}
          quizResults={quizResults}
          onGenerateQuiz={generateQuizQuestions}
          onAnswerQuestion={handleQuizAnswer}
          onRestartQuiz={restartQuiz}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    marginTop: 12,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContentContainer: {
    paddingBottom: 80, // Reduced padding for more chat space
    paddingTop: 12,
  },
  quizButton: {
    position: "absolute",
    right: 16,
    top: 120,
    zIndex: 30,
    borderRadius: 20,
    padding: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default VaultAIChatScreen;
