import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
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

// const styles = StyleSheet.create({
//         button: {
//       "position": "absolute",
//       "width": 330,
//       "height": 50,
//       "left": 35,
//       "top": 500,
//       "backgroundColor": "#FFFFFF",
//       "borderTopLeftRadius": 30,
//       "borderTopRightRadius": 30,
//       "borderBottomRightRadius": 30,
//       "borderBottomLeftRadius": 30,
//       elevation: 3,
//       zIndex:3
//     },
    
//   });


export default Button
