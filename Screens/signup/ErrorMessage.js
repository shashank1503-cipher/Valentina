import { View, Text,StyleSheet } from 'react-native';
import React from 'react';

const ErrorMessage = ({error}) => {
    if (!error) return null;
  return (
    <Text style={styles.error}>{error}</Text>
  );
}; 

const styles = StyleSheet.create({
  error: {
      color: 'red',
      top: 120,
  },
});


export default ErrorMessage;
