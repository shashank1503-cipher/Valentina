import React from 'react'
import { View, Text } from 'react-native'
import styles from "./InterestStyles";
const Interest = (props) => {
    return (
        <View style={styles.wrapper}>
            {props.emoji? <Text>{props.emoji}</Text> :null}
            {typeof props.value === "string" ? (<Text style={styles.text}>{props.value}</Text>) :(<Text style={styles.text}>{props.value.feet} {props.value.inch}</Text>) }
        </View>
    )
}

export default Interest
