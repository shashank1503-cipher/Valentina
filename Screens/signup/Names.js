import React from 'react'
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
;
const Names = (props) => {
    const navigation = useNavigation();

    return (
        <View style={ 
        styles.container, {alignItems: 'center'}           
        }>

            <Text style={styles.heading}>What shall we call you?</Text>
            <TextInput placeholder="First Name" style={styles.input}/>
            <TextInput placeholder="Last Name" style={styles.input}/>

            <Pressable onPress={() => navigation.navigate("Dob")}  style={styles.button}>
            <Text style={styles.text}>
                Next
            </Text>
        </Pressable>

        </View>
    )
}


export default Names
