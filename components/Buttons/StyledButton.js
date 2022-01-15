import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";

const Button = () => {
    const navigation = useNavigation();
    return (
        <Pressable  style={styles.button}>
            <Text style={styles.text}>
             Get Started
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
        button: {
      "position": "absolute",
      "width": 330,
      "height": 50,
      "left": 35,
      "top": 500,
      "backgroundColor": "#FFFFFF",
      "borderTopLeftRadius": 30,
      "borderTopRightRadius": 30,
      "borderBottomRightRadius": 30,
      "borderBottomLeftRadius": 30,
      elevation: 3,
    },
    
  });

export default Button
