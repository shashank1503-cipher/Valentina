import React from 'react'
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import styles from './Style/Styles'


const CollegeID = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.conatiner}>
            
            <Text style={styles.heading}>Enter Your College ID</Text>

            <View style={styles.subcontainer}>

            <TextInput placeholder="College Email" style={styles.input}/>

            <View 
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />

            <Text style={styles.inputText}>By clicking Log In, you agree with our Terms.  Learn how process your data in our Privacy  Policy and Cookies Policy. By clicking Log In, you agree with our Terms.  Learn how process your data in our Privacy  Policy and Cookies</Text>

            <Pressable onPress={() => navigation.navigate("Names")} style={styles.button} >
                <Text style={styles.text}>
                    Continue
                </Text>
            </Pressable>

            </View>

            
        </View>
    )
}

export default CollegeID
