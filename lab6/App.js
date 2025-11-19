import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar,
  Alert,
  Animated,
  Easing
} from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [progress] = useState(new Animated.Value(0));

  const quizData = [
    {
      question: 'React Native được phát triển bởi Facebook?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Đúng',
    },
    {
      question: 'JavaScript giống với Java?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Sai',
    },
    {
      question: 'Expo là framework cho React Native?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Đúng',
    },
    {
      question: 'React Native có thể dùng để phát triển web?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Sai',
    },
    {
      question: 'State trong React Native dùng để lưu trữ dữ liệu thay đổi?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Đúng',
    },
    {
      question: 'Tất cả component React Native đều là class component?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Sai',
    },
    {
      question: 'Flexbox là hệ thống layout chính trong React Native?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Đúng',
    },
    {
      question: 'React Native chỉ chạy được trên iOS?',
      answers: ['Đúng', 'Sai'],
      correctAnswer: 'Sai',
    },
  ];

  const handleAnswer = async (selectedAnswer) => {
    const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer;
    
    // Haptic feedback
    if (isCorrect) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore(score + 1);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // Hiệu ứng progress
    Animated.timing(progress, {
      toValue: ((currentQuestion + 1) / quizData.length) * 100,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 1000);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  if (showScore) {
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    let emoji = '';

    if (percentage >= 80) {
      message = 'Xuất sắc! 🎉';
      emoji = '🏆';
    } else if (percentage >= 60) {
      message = 'Khá tốt! 👍';
      emoji = '⭐';
    } else {
      message = 'Cần cố gắng thêm! 💪';
      emoji = '📚';
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
        
        <Text style={styles.title}>Quiz Hoàn Thành! {emoji}</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {score}/{quizData.length}
          </Text>
          <Text style={styles.percentage}>{percentage}%</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={restartQuiz}>
          <Text style={styles.buttonText}>Làm Lại Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#1A1A2E" barStyle="light-content" />
      
      <Text style={styles.title}>Quizzler</Text>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Câu {currentQuestion + 1}/{quizData.length}
        </Text>
        <View style={styles.progressBar}>
          <Animated.View 
            style={[styles.progressFill, { width: progressWidth }]} 
          />
        </View>
      </View>

      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>
          Câu {currentQuestion + 1}
        </Text>
        <Text style={styles.question}>
          {quizData[currentQuestion].question}
        </Text>
      </View>

      {/* Answers */}
      <View style={styles.answersContainer}>
        {quizData[currentQuestion].answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              answer === quizData[currentQuestion].correctAnswer && styles.correctAnswer
            ]}
            onPress={() => handleAnswer(answer)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Score */}
      <View style={styles.scoreDisplay}>
        <Text style={styles.scoreDisplayText}>Điểm: {score}</Text>
        <Text style={styles.remainingText}>
          Còn lại: {quizData.length - currentQuestion - 1} câu
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    color: '#4ECDC4',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#34495E',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  questionContainer: {
    backgroundColor: '#16213E',
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#4ECDC4',
  },
  questionNumber: {
    fontSize: 14,
    color: '#4ECDC4',
    marginBottom: 10,
    fontWeight: '600',
  },
  question: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 28,
  },
  answersContainer: {
    marginBottom: 30,
  },
  answerButton: {
    backgroundColor: '#0F3460',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#0F3460',
  },
  correctAnswer: {
    borderColor: '#4ECDC4',
  },
  answerText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  scoreDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#34495E',
    padding: 15,
    borderRadius: 10,
  },
  scoreDisplayText: {
    fontSize: 18,
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  remainingText: {
    fontSize: 14,
    color: '#E6E6E6',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4ECDC4',
    marginBottom: 10,
  },
  percentage: {
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
  },
  message: {
    fontSize: 20,
    color: '#E6E6E6',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E94560',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});