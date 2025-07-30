import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizResults {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  answers: string[];
}

interface VaultAIQuizModalProps {
  visible: boolean;
  onClose: () => void;
  quizQuestions: QuizQuestion[];
  currentQuestionIndex: number;
  isGeneratingQuiz: boolean;
  quizResults: QuizResults | null;
  onGenerateQuiz: (concept?: string) => void;
  onAnswerQuestion: (answer: string) => void;
  onRestartQuiz: () => void;
}

const VaultAIQuizModal: React.FC<VaultAIQuizModalProps> = ({
  visible,
  onClose,
  quizQuestions,
  currentQuestionIndex,
  isGeneratingQuiz,
  quizResults,
  onGenerateQuiz,
  onAnswerQuestion,
  onRestartQuiz,
}) => {
  const [selectedConcept, setSelectedConcept] = useState<string>("");
  const [showConceptSelection, setShowConceptSelection] = useState(true);

  const concepts = [
    { id: "react-native", name: "React Native", icon: "📱", color: "#61dafb" },
    { id: "typescript", name: "TypeScript", icon: "🔷", color: "#3178c6" },
    { id: "javascript", name: "JavaScript", icon: "🟨", color: "#f7df1e" },
    {
      id: "general",
      name: "General Development",
      icon: "💻",
      color: "#7c3aed",
    },
  ];

  const handleConceptSelect = (conceptId: string) => {
    setSelectedConcept(conceptId);
    setShowConceptSelection(false);
    onGenerateQuiz(conceptId);
  };

  const handleRestart = () => {
    // setCurrentQuestionIndex(0); // This line was removed from the new_code, so it's removed here.
    // setUserAnswers([]); // This line was removed from the new_code, so it's removed here.
    // setQuizResults(null); // This line was removed from the new_code, so it's removed here.
    // setQuizQuestions([]); // This line was removed from the new_code, so it's removed here.
    setShowConceptSelection(true);
    setSelectedConcept("");
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#238636";
    if (score >= 60) return "#fb8500";
    return "#f85149";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return "🎉";
    if (score >= 80) return "🚀";
    if (score >= 70) return "👏";
    if (score >= 60) return "👍";
    return "💪";
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Initial state - Concept Selection */}
          {showConceptSelection &&
            quizQuestions.length === 0 &&
            !isGeneratingQuiz && (
              <View style={styles.welcomeContainer}>
                <View style={styles.quizIcon}>
                  <Text style={styles.quizIconText}>🧠</Text>
                </View>
                <Text style={styles.modalTitle}>Quiz Generator</Text>
                <Text style={styles.modalSubtitle}>
                  Choose a concept to test your knowledge with AI-generated
                  questions
                </Text>

                <View style={styles.conceptsContainer}>
                  {concepts.map((concept) => (
                    <TouchableOpacity
                      key={concept.id}
                      style={[
                        styles.conceptButton,
                        { borderColor: concept.color },
                      ]}
                      onPress={() => handleConceptSelect(concept.id)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.conceptContent}>
                        <Text style={styles.conceptIcon}>{concept.icon}</Text>
                        <Text style={styles.conceptName}>{concept.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

          {/* Initial state - Quiz Generator (fallback) */}
          {!showConceptSelection &&
            quizQuestions.length === 0 &&
            !isGeneratingQuiz && (
              <View style={styles.welcomeContainer}>
                <View style={styles.quizIcon}>
                  <Text style={styles.quizIconText}>🧠</Text>
                </View>
                <Text style={styles.modalTitle}>Quiz Generator</Text>
                <Text style={styles.modalSubtitle}>
                  Test your knowledge with AI-generated questions based on your
                  recent conversations
                </Text>
                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={() => onGenerateQuiz()}
                  activeOpacity={0.8}
                >
                  <View style={styles.generateButtonContent}>
                    <Text style={styles.generateButtonIcon}>✨</Text>
                    <Text style={styles.generateButtonText}>Generate Quiz</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

          {/* Loading state */}
          {isGeneratingQuiz && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingIcon}>
                <ActivityIndicator size="large" color="#7c3aed" />
              </View>
              <Text style={styles.loadingTitle}>Creating Your Quiz</Text>
              <Text style={styles.loadingText}>
                Analyzing your conversations and generating personalized
                questions...
              </Text>
              <View style={styles.loadingDots}>
                <View style={styles.loadingDot} />
                <View style={styles.loadingDot} />
                <View style={styles.loadingDot} />
              </View>
            </View>
          )}

          {/* Quiz in progress */}
          {quizQuestions.length > 0 && !isGeneratingQuiz && !quizResults && (
            <View style={styles.quizContainer}>
              <View style={styles.questionHeader}>
                <View style={styles.questionInfo}>
                  <Text style={styles.questionCount}>
                    Question {currentQuestionIndex + 1}
                  </Text>
                  <Text style={styles.questionTotal}>
                    of {quizQuestions.length}
                  </Text>
                </View>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${
                            ((currentQuestionIndex + 1) /
                              quizQuestions.length) *
                            100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round(
                      ((currentQuestionIndex + 1) / quizQuestions.length) * 100
                    )}
                    %
                  </Text>
                </View>
              </View>

              <View style={styles.questionCard}>
                <Text style={styles.questionText}>
                  {quizQuestions[currentQuestionIndex].question}
                </Text>
              </View>

              <View style={styles.optionsContainer}>
                {quizQuestions[currentQuestionIndex].options.map(
                  (option: string, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionButton}
                      onPress={() => onAnswerQuestion(option)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.optionContent}>
                        <View style={styles.optionLetter}>
                          <Text style={styles.optionLetterText}>
                            {String.fromCharCode(65 + index)}
                          </Text>
                        </View>
                        <Text style={styles.optionText}>{option}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                )}
              </View>
            </View>
          )}

          {/* Quiz results */}
          {quizResults && (
            <View style={styles.resultsContainer}>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsEmoji}>
                  {getScoreEmoji(quizResults.score)}
                </Text>
                <Text style={styles.resultsTitle}>Quiz Complete!</Text>
              </View>

              <View
                style={[
                  styles.resultsCard,
                  { borderColor: getScoreColor(quizResults.score) },
                ]}
              >
                <View style={styles.scoreCircle}>
                  <Text
                    style={[
                      styles.scoreText,
                      { color: getScoreColor(quizResults.score) },
                    ]}
                  >
                    {quizResults.score}%
                  </Text>
                </View>
                <Text style={styles.scoreSubtext}>
                  {quizResults.correctAnswers} out of{" "}
                  {quizResults.totalQuestions} correct
                </Text>

                <View style={styles.performanceIndicator}>
                  <View style={styles.performanceBar}>
                    <View
                      style={[
                        styles.performanceFill,
                        {
                          width: `${quizResults.score}%`,
                          backgroundColor: getScoreColor(quizResults.score),
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.resultsActions}>
                <TouchableOpacity
                  style={styles.newQuizButton}
                  onPress={handleRestart}
                  activeOpacity={0.8}
                >
                  <Text style={styles.newQuizButtonIcon}>🔄</Text>
                  <Text style={styles.buttonText}>New Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={onClose}
                  activeOpacity={0.8}
                >
                  <Text style={styles.finishButtonIcon}>✅</Text>
                  <Text style={styles.finishButtonText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#161b22",
    borderRadius: 20,
    padding: 24,
    width: "92%",
    maxHeight: "85%",
    borderWidth: 1,
    borderColor: "#30363d",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#21262d",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#30363d",
    zIndex: 10,
  },
  closeButtonText: {
    color: "#8b949e",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Welcome screen styles
  welcomeContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  quizIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  quizIconText: {
    fontSize: 36,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  modalSubtitle: {
    color: "#8b949e",
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  generateButton: {
    backgroundColor: "#7c3aed",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: "#7c3aed",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  generateButtonIcon: {
    fontSize: 18,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // Loading styles
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingIcon: {
    marginBottom: 20,
  },
  loadingTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  loadingText: {
    color: "#8b949e",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  loadingDots: {
    flexDirection: "row",
    gap: 6,
  },
  loadingDot: {
    width: 8,
    height: 8,
    backgroundColor: "#7c3aed",
    borderRadius: 4,
    opacity: 0.4,
  },

  // Quiz styles
  quizContainer: {
    paddingTop: 16,
  },
  questionHeader: {
    marginBottom: 24,
  },
  questionInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  questionCount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  questionTotal: {
    color: "#8b949e",
    fontSize: 16,
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#21262d",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7c3aed",
    borderRadius: 3,
  },
  progressText: {
    color: "#7c3aed",
    fontSize: 14,
    fontWeight: "600",
    minWidth: 35,
    textAlign: "right",
  },
  questionCard: {
    backgroundColor: "#21262d",
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#30363d",
  },
  questionText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "#21262d",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#30363d",
    overflow: "hidden",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionLetterText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  optionText: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
  },

  // Results styles
  resultsContainer: {
    paddingTop: 16,
    alignItems: "center",
  },
  resultsHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  resultsEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  resultsTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  resultsCard: {
    backgroundColor: "#21262d",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 2,
    width: "100%",
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#161b22",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#30363d",
  },
  scoreText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  scoreSubtext: {
    color: "#8b949e",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  performanceIndicator: {
    width: "100%",
  },
  performanceBar: {
    height: 8,
    backgroundColor: "#161b22",
    borderRadius: 4,
    overflow: "hidden",
  },
  performanceFill: {
    height: "100%",
    borderRadius: 4,
  },
  resultsActions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  newQuizButton: {
    flex: 1,
    backgroundColor: "#7c3aed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  newQuizButtonIcon: {
    fontSize: 16,
  },
  finishButton: {
    flex: 1,
    backgroundColor: "#238636",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  finishButtonIcon: {
    fontSize: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // Concept selection styles
  conceptsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
    width: "100%",
  },
  conceptButton: {
    backgroundColor: "#21262d",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#30363d",
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    minHeight: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  conceptContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  conceptIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  conceptName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 18,
  },
});

export default VaultAIQuizModal;
