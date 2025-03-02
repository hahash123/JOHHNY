import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  Image, StyleSheet, Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Register = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Image Picker Function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    Alert.alert('Success', 'Registration Successful!');
    console.log('Registered:', { name, email, password, image });
  };

  return (
    <View style={styles.container}>
      <View style={styles.splitContainer}>
        
        {/* Left side - Green with outline */}
        <View style={styles.leftContainer}>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.infoText}>Join us and start your journey today</Text>
        </View>

        {/* Right side - White with form inside a box */}
        <View style={styles.rightContainer}>
          <View style={styles.formContainer}>

            {/* Title at the Top */}
            <Text style={styles.registerText}>Register</Text>

            {/* Image Picker (Below Title) */}
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <Text style={styles.imageText}>Add Photo</Text>
              )}
            </TouchableOpacity>

            {/* Name input */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#666"
              value={name}
              onChangeText={setName}
            />

            {/* Email input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Password input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Register button */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Back button */}
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
    backgroundColor: 'white',
  },
  splitContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 550,
    maxWidth: 900,
    backgroundColor: 'black',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#28A745',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28A745',
    padding: 20,
    color: 'white',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    borderRightWidth: 3,
    borderRightColor: '#28A745',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#28A745',
  },
  registerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#28A745',
    marginBottom: 15,
    textAlign: 'center',
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#28A745',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    color: '#2E7D32',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#28A745',
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 45,
    width: '100%',
    backgroundColor: '#28A745',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Register;
