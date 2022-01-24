import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from '../../Screens/signup/Style/Styles'

const Button = ({page, text}) => {
    const navigation = useNavigation();
    const colors = ["#FF4E8C", "#FF9B7B", "#F9D7D5"];
    const Pressed = () => {
      navigation.navigate(`${page}`)
    }
    return (
        <Pressable  
          onPress={Pressed} style={styles.button}
        >
          <LinearGradient
            colors={colors}
            style={styles.background}
            end={{ x: 0.85, y: 0.15 }}
          >
            <Text style={styles.text}>
             {text}
            </Text>
          </LinearGradient>
        </Pressable>
    )
}


export default Button
