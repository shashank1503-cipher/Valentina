import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'


const IdentityConfirmation = () => {
    
    return (
            <View style={styles.container}>
                <Text style={styles.heading}>How do you identify?</Text>
             
                <StyledButton page="Sexuality" text="Next"/>

        
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

export default IdentityConfirmation
