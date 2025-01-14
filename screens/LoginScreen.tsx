import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false); // State to track OTP status

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      console.log('OTP sent to:', phoneNumber);
      setOtpSent(true); // Simulate OTP sent
    } else {
      console.log('Invalid phone number');
    }
  };

  const handleVerifyOtp = () => {
    console.log('Verifying OTP:', otp);
    // Add OTP verification logic here
  };

  return (
    <View style={styles.container}>
      {/* Image at the top */}
      <Image
        source={{ uri: 'https://img.philkotse.com/2017/05/10/20170510120425-80c5.jpg' }} // Replace with your desired image URL or local asset
        style={styles.image}
        resizeMode="contain"
      />

      {/* Login Title */}
      <Text style={styles.title}>Log in or sign up</Text>

      {/* Phone Number Input */}
      {!otpSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10} // Restrict input to 10 digits
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {/* OTP Input */}
      {otpSent && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6} // Restrict OTP to 6 digits
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%', // Full width of the container
    height: 300,   // Set height as per design
    marginBottom: 20, // Space between image and title
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    // fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#ff6600', // Change button color here
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
