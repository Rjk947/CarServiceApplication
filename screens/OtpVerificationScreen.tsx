import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

export default function OtpVerificationScreen({ route, navigation }) {
    const { mobileNumber } = route.params;
    const [otp, setOtp] = useState('');
    const BASE_URL = "http://10.0.2.2:8080"; // Replace localhost with 10.0.2.2

    const handleVerifyOtp = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/verify-otp', { mobileNumber, otp });
            Alert.alert('Success', 'OTP verified successfully');
        } catch (error) {
            Alert.alert('Error', 'Invalid or expired OTP');
        }
    };

    const handleResendOtp = async () => {
        try {
            await axios.post('http://localhost:8080/api/auth/send-otp', { mobileNumber });
            Alert.alert('OTP Resent', 'Check your mobile for a new OTP');
        } catch (error) {
            Alert.alert('Error', 'Failed to resend OTP');
        }
    };

    return (
        <View>
            <Text>Enter the OTP sent to {mobileNumber}</Text>
            <TextInput
                placeholder="OTP"
                keyboardType="number-pad"
                onChangeText={setOtp}
                value={otp}
            />
            <Button title="Verify OTP" onPress={handleVerifyOtp} />
            <Button title="Resend OTP" onPress={handleResendOtp} />
        </View>
    );
}
