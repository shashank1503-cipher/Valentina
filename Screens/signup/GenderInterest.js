import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
import Header from './Header'

const GenderInterest = () => {
    const Interests = [
        {
            Options: [
                { optionText: 'Men', value: 'men' },
                { optionText: 'Women', value: 'women' },
                { optionText: 'Both', value: 'both' },
            ],
        },       
    ]
    
    return (
        <View style={styles.container}>
            <Header title="I like"/>

            <View style={styles.interestsconatiner}>
                {Interests[0].Options.map((Option)=> (
                    <TouchableHighlight  >
                        <Text style={styles.option}>{Option.optionText}</Text>
                    </TouchableHighlight>
                ))}
            </View>

            <StyledButton page="Interests" text="Next"/>
    </View>
    )
}

export default GenderInterest
