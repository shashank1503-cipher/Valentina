import React from 'react'
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { useNavigation } from "@react-navigation/native";

import StyledButton from '../components/Buttons/StyledButton'

const HomeScreen = () => {
    const navigation = useNavigation();
    const onPress = () => {
      navigation.navigate("Names")
    };
    
    return (
        <SafeAreaView>
            <Text>Home Screen</Text>             
             <StyledButton page="Names" text="Get Started"/>
        </SafeAreaView>
    )
}

export default HomeScreen
