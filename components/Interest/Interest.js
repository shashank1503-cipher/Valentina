import React from 'react'
import { View, Text } from 'react-native'
import styles from "./InterestStyles";
import Entypo from "react-native-vector-icons/Entypo"
const Interest = (props) => {
    return (
        <View style={styles.wrapper}>
            <Text>{props.emoji}</Text>
            <Text style={styles.text}>{props.value}</Text>
        </View>
    )
}

export default Interest
