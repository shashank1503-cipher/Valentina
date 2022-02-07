import React from 'react'
import {Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";

const Button = ({page, text}) => {
  const navigation = useNavigation();
  const Pressed = () => {
    navigation.navigate(`${page}`)
  }
    return (
        <View>
        <Pressable onPress={Pressed} style={styles.button}>
            <Text style={styles.text}>
             Get Started
            </Text>
        </Pressable>
        </View>
    )
}



export default Button
