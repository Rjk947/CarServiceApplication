import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const BASE_URL = "http://10.0.2.2:8080"; // Replace localhost with 10.0.2.2

  const handleSignup = async ({ navigation }) => {
    // Signup logic
    console.log('Mobile:', mobileNumber);
    console.log('Email:', email);
 
    try {
        await axios.post(`${BASE_URL}/api/auth/signup`, { mobileNumber, email });
        Alert.alert('Signup successful', 'Proceeding to OTP verification');
        navigation.navigate('OtpVerification', { mobileNumber });
    } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Signup failed');
    }
  };

  return (
    <View style={styles.container}>
      {/* Image Section */}
      <Image
        source={{ uri: 'https://img.philkotse.com/2017/05/10/20170510120425-80c5.jpg' }} // Replace with your desired image URL or local asset
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text Section */}
      <Text style={styles.headerText}>Login or Signup</Text>

      {/* Form Section */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email (optional)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 350,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
