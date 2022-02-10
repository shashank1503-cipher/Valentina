import React from 'react'
import { View, Text } from 'react-native'
import styles from "./InterestStyles";
const Interest = (props) => {
    const relegion_map={
        "Hinduism":'🕉️',
        "Islam":"☪️️",
        "Christianity":'✝️',
        "Sikhism":"🕉️"
    }
    const star_sign_map={
        "leo":"♌",
        "virgo":"♍",
        "aries":"♈",
        "libra":'♎',
        "scorpio":"♏",
        "taurus":"♉",
        "cancer":"♋",
        "capricorn":"♑",
        "aquarius":"♒",
        "gemini":'♊',
        "pisces":"♓",
        "sagittarius":"♐"
    }
    return (
        <View style={styles.wrapper}>

            {props.emoji? props.type ==="religion" ? <Text>{relegion_map[props.value]}</Text>: props.type === "star_sign" ? <Text>{star_sign_map[props.value]}</Text> : <Text>{props.emoji}</Text> :null}
            {typeof props.value === "string" ? (<Text style={styles.text}>{props.value}</Text>) :(<Text style={styles.text}>{props.value.feet}' {props.value.inch}</Text>) }
        </View>
    )
}

export default Interest
