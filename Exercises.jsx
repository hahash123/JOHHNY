import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, Text, View, Pressable, Platform, Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../activities/LoginScreen';
import Stopwatch from '../activities/Stopwatch';
import Register from '../activities/Register';
import CRUDScreen from '../activities/CRUD';
import QuizScreen from '../activities/QuizScreen'; 

const Stack = createStackNavigator();

const Exercise = ({ title, description, onPress }) => {
  const scaleAnim = useState(new Animated.Value(1))[0];

  const handleHoverIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onHoverIn={Platform.OS === 'web' ? handleHoverIn : undefined}
      onHoverOut={Platform.OS === 'web' ? handleHoverOut : undefined}
      onPress={onPress}
    >
      <Animated.View style={[styles.exerciseBox, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.boxTitle}>{title}</Text>
        <Text style={styles.boxDescription}>{'\u2022'} {description}</Text>
      </Animated.View>
    </Pressable>
  );
};

Exercise.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

const ExercisesScreen = ({ navigation }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>EXERCISES</Text>
    <View style={styles.gridContainer}>
      <Exercise 
        title="Exercise 1" 
        description="Log In Page." 
        onPress={() => navigation.navigate('Login')}  
      />
      <Exercise 
        title="Exercise 2" 
        description="StopWatch." 
        onPress={() => navigation.navigate('Stopwatch')}  
      />
      <Exercise 
        title="Exercise 3" 
        description="Register Page." 
        onPress={() => navigation.navigate('Register')}  
      />
      <Exercise 
        title="Exercise 4" 
        description="Go to CRUD App." 
        onPress={() => navigation.navigate('CRUDScreen')}  
      />
      <Exercise 
        title="Exercise 5" 
        description="Open Trivia Quiz." 
        onPress={() => navigation.navigate('Quiz')} 
      />
    </View>
  </ScrollView>
);

const Exercises = () => (
  <Stack.Navigator>
    <Stack.Screen name="Exercises" component={ExercisesScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Stopwatch" component={Stopwatch} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="CRUDScreen" component={CRUDScreen} />
    <Stack.Screen name="Quiz" component={QuizScreen} /> 
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 35,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  gridContainer: {
    width: '100%',
  },
  exerciseBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  boxDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
});

export default Exercises;
