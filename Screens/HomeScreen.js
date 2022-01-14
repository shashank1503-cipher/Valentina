import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import StyledButton from '../components/Buttons/StyledButton'

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>Home Screen</Text>
             {/*<StyledButton onPress={() => navigation.navigate("CollegeID")}/> */}
             <Pressable onPress={() => navigation.navigate("CollegeID")} style={styles.button} >
                <Text style={styles.text}>
                    Get Started
                </Text>
        </Pressable>
        </View>
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
text:{
    "fontWeight": "500",
    "fontSize": 15,
    "lineHeight": 18,
    "textAlign": "center",
    "textTransform": "uppercase",
    "color": "#373737",
    "marginTop":"5%"
  }
});

export default HomeScreen