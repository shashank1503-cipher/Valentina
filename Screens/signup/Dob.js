import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import styles from './Style/Styles'


const Dob = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container, {alignItems: 'center'}}>
            <Text style={styles.heading}>How old are you?</Text>
             {/*<StyledButton onPress={() => navigation.navigate("CollegeID")}/> */}
             <Pressable onPress={() => navigation.navigate("Gender")} style={styles.button} >
                <Text style={styles.text}>
                    Next
                </Text>
        </Pressable>
        </View>
    )
}

export default Dob
