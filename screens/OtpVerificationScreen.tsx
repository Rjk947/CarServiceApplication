import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import axios from 'axios';

export default function OtpVerificationScreen({ route, navigation }) {
    const { mobileNumber } = route.params;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const BASE_URL = "http://10.0.2.2:8080";

    const handleOtpChange = (text, index) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);

        // Automatically move to the next box if a digit is entered
        if (text && index < 5) {
            inputs[index + 1].focus();
        }
    };

    const handleVerifyOtp = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) {
            Alert.alert('Error', 'OTP must be 6 digits');
            return;
        }

        try {
            await axios.post(`${BASE_URL}/api/auth/verify-otp`, { mobileNumber, otp: fullOtp });
            Alert.alert('Success', 'OTP verified successfully');
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Invalid or expired OTP');
        }
    };

    const handleResendOtp = async () => {
        try {
            await axios.post(`${BASE_URL}/api/auth/send-otp`, { mobileNumber });
            setOtp(['', '', '', '', '', '']); // Reset OTP input
            Alert.alert('OTP Resent', 'Check your mobile for a new OTP');
        } catch (error) {
            Alert.alert('Error', error.response?.data?.message || 'Failed to resend OTP');
        }
    };

    // References for each TextInput to programmatically focus
    const inputs = [];

    return (
        <View style={styles.container}>
            {/* <Text style={styles.headerText}>OTP Verification</Text> */}
            <Text style={styles.subText}>
                We have sent a verification code to{'\n'}
                <Text style={styles.boldText}>+91-{mobileNumber}</Text>
            </Text>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        ref={(ref) => (inputs[index] = ref)} // Assign ref for each TextInput
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Backspace' && index > 0 && !digit) {
                                inputs[index - 1].focus(); // Move to the previous box on backspace
                            }
                        }}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendButton} onPress={handleResendOtp}>
                <Text style={styles.buttonText}>Resend OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      alignItems: 'center', // Center horizontally
      justifyContent: 'flex-start', // Align at the top
      paddingTop: 50, // Add spacing from the top
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subText: {
      fontSize: 14,
      color: '#6B7280',
      marginBottom: 20,
      textAlign: 'center',
    },
    boldText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000', // Bold and darker color for emphasis
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    otpInput: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 18,
      marginHorizontal: 5,
    },
    verifyButton: {
      backgroundColor: '#2563EB',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginBottom: 10,
    },
    resendButton: {
      backgroundColor: '#EF4444',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
  
