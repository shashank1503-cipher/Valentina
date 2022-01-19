import React from 'react'
import { View, Text } from 'react-native'
import styles from "./InterestStyles";
const Interest = (props) => {
    return (
        <View style={styles.wrapper}>
            {props.emoji? <Text>{props.emoji}</Text> :null}
            <Text style={styles.text}>{props.value}</Text>
        </View>
    )
}

export default Interest
