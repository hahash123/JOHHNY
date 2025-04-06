import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const QuizScreen = () => {
  const [numQuestions, setNumQuestions] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const fetchQuestions = async () => {
    const number = parseInt(numQuestions);
    if (isNaN(number) || number < 10 || number > 30) {
      Alert.alert('Please enter a number between 10 and 30.');
      return;
    }

    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=${number}&type=multiple`);
      const data = await res.json();
      const formatted = data.results.map(q => ({
        question: decodeURIComponent(q.question),
        correct: decodeURIComponent(q.correct_answer),
        options: shuffleOptions([
          ...q.incorrect_answers.map(ans => decodeURIComponent(ans)),
          decodeURIComponent(q.correct_answer),
        ]),
      }));
      setQuestions(formatted);
      setCurrentIndex(0);
      setScore(0);
      setShowScore(false);
      setSelectedAnswer(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Failed to fetch questions.');
    }
  };

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const currentQuestion = questions[currentIndex];
    if (option === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 500);
  };

  const renderQuestion = () => {
    const current = questions[currentIndex];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.header}>Question {currentIndex + 1}/{questions.length}</Text>
        <Text style={styles.question}>{current.question}</Text>
        {current.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && {
                backgroundColor: option === current.correct ? '#4CAF50' : '#F44336',
              },
            ]}
            onPress={() => handleAnswer(option)}
            disabled={!!selectedAnswer}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!questions.length ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Quiz App</Text>
          <Text style={styles.subtitle}>Test your knowledge with random trivia questions</Text>
          
          <Text style={styles.label}>Enter number of questions (10-30):</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={numQuestions}
            onChangeText={setNumQuestions}
            placeholder="e.g., 15"
            placeholderTextColor="#999"
          />
          
          <TouchableOpacity style={styles.mainButton} onPress={fetchQuestions}>
            <Text style={styles.mainButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : showScore ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Quiz Completed</Text>
          <Text style={styles.subtitle}>Your final results</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{score} / {questions.length}</Text>
            <Text style={styles.scorePercentage}>
              {Math.round((score / questions.length) * 100)}% Correct
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => {
              setQuestions([]);
              setNumQuestions('');
            }}
          >
            <Text style={styles.mainButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        renderQuestion()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 25,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  mainButton: {
    backgroundColor: '#4CAF50', // Changed to green
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 30,
    color: '#333',
    lineHeight: 28,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50', // Changed to green
    marginBottom: 10,
  },
  scorePercentage: {
    fontSize: 18,
    color: '#666',
  },
});

export default QuizScreen;