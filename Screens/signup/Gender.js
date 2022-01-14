import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import styles from './Style/Styles'
const Gender = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container, {alignItems: 'center'}}>
            <Text style={styles.heading}>How do you identify?</Text>
             {/*<StyledButton onPress={() => navigation.navigate("CollegeID")}/> */}
             <Pressable onPress={() => navigation.navigate("IdentityConfirmation")} style={styles.button} >
                <Text style={styles.text}>
                    Next
                </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Identities")} style={styles.button} >
                <Text style={styles.text}>
                    More gender options
                </Text>
            </Pressable>
        </View>
    )
}



export default Gender
