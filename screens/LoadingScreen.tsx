import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login after 2 seconds
    }, 4000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff6600" />
      <Text style={styles.text}>AapkaGarageService</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
  },
  text: {
    marginTop: 10,
    fontSize: 30,
    color: '#555',
  },
});

export default LoadingScreen;
