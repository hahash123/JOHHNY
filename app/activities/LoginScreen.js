import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here (e.g., validation, authentication)
    console.log('Email:', email);
    console.log('Password:', password);
    // For now, we just log the input and navigate back to the Exercises screen.
    navigation.goBack();  // Navigate back to Exercises screen
  };

  return (
    <View style={styles.container}>
      {/* Container for Left Green Side and Right White Side */}
      <View style={styles.splitContainer}>
        
        {/* Left side - Green with outline */}
        <View style={styles.leftContainer}>
          <Text style={styles.welcomeText}>Welcome to my Log in Page</Text>
          <Text style={styles.infoText}>Please log in to continue</Text>
        </View>

        {/* Right side - White with form */}
        <View style={styles.rightContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.loginText}>Login</Text>

            {/* Email input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />

            {/* Password input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#aaa"
            />

            {/* Login button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Gap between buttons */}
            <View style={styles.buttonGap} />

            {/* Forgot Password link */}
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => console.log("Forgot Password clicked")}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Button to go back to Exercises */}
            <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.secondaryButtonText}>Go back to Exercises</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',  // White background for the entire screen
  },
  splitContainer: {
    flexDirection: 'row',  // Split into left and right parts
    width: '90%',
    height: 500,
    maxWidth: 900,  // Maximum width of the container
    backgroundColor: 'black',  // Black background for the container
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,  // Border around the container
    borderColor: '#28A745',  // Green outline for the entire container
    shadowColor: '#000',  // Shadow color
    shadowOffset: { width: 0, height: 4 },  // Shadow offset
    shadowOpacity: 0.1,  // Shadow opacity
    shadowRadius: 6,  // Shadow blur radius
    elevation: 8,  // Elevation for Android
  },
  leftContainer: {
    flex: 1,  // Occupies half of the container
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28A745',  // Green background for the left side
    padding: 20,
    color: 'white',
    shadowColor: '#000',  // Shadow color for left side
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,  // Shadow opacity
    shadowRadius: 5,  // Shadow blur radius
    elevation: 3,  // Elevation for Android
    borderRightWidth: 3,  // Outline on the right side of left container
    borderRightColor: '#28A745',  // Green border for the left side
  },
  welcomeText: {
    fontSize: 32,  // Larger welcome text
    fontWeight: '700',
    color: 'white',  // White color for text
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: 'white',  // White color for info text
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,  // Occupies half of the container
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',  // White background for the right side
    padding: 20,
    shadowColor: '#000',  // Shadow color for right side
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,  // Shadow opacity
    shadowRadius: 5,  // Shadow blur radius
    elevation: 3,  // Elevation for Android
  },
  formContainer: {
    backgroundColor: '#fff',  // White background for the form section
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,  // Set max width for a more compact form
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1.5,  // Outline for the form box
    borderColor: '#28A745',  // Green border for the form
  },
  loginText: {
    fontSize: 24,  // Smaller login text
    fontWeight: '700',
    color: '#28A745',  // Green color for the login title
    marginBottom: 15,  // Reduced space between title and fields
    textAlign: 'center',
  },
  input: {
    height: 40,  // Smaller input fields
    width: '100%',
    borderColor: '#28A745',
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 14,  // Smaller text inside input
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 45,
    width: '100%',
    backgroundColor: '#28A745',  // Green button
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,  // Slightly smaller text for the button
    fontWeight: '600',
  },
  secondaryButton: {
    height: 45,
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#28A745',
    borderWidth: 1.5,
  },
  secondaryButtonText: {
    color: '#28A745',
    fontSize: 14,  // Smaller font size for secondary button
    fontWeight: '600',
  },
  buttonGap: {
    height: 10,  // Smaller gap between buttons
  },
  linksContainer: {
    marginTop: 15,  // Increased space between the button and the link
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    paddingBottom: 20,
    color: '#28A745',  // Green color for the links
    marginTop: 10,  // Added space between the link
    textDecorationLine: 'underline',  // Underline for the link
  },
});

export default LoginScreen;
