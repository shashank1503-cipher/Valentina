import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
import Header from './Header'

const Sexuality = () => {
    const sexuality = [
        {
            Options: [
                { optionText: 'Straight', value: 'staright' },
                { optionText: 'Lesbian', value: 'lesbian' },
                { optionText: 'Gay', value: 'gay' },
                { optionText: 'Bisexual', value: 'bisexual' },
                { optionText: 'Pansexual', value: 'pansexual' },
            ],
        },       
    ]
    
    return (
        <View style={styles.container}>
            <Header title="I am"/>

            <View style={styles.sexconatiner}>
                {sexuality[0].Options.map((Option)=> (
                    <TouchableHighlight  >
                        <Text style={styles.option}>{Option.optionText}</Text>
                    </TouchableHighlight>
                ))}
            </View>

            <StyledButton page="Gender Interest" text="Next"/>
    </View>
    )
}

export default Sexuality
