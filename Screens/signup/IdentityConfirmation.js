import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'


const IdentityConfirmation = () => {
    
    return (
            <View style={styles.container}>
                <Text style={styles.heading}>How do you identify?</Text>
             
                <StyledButton page="Sexuality" text="Next"/>

        
        </View>
    )
}

export default IdentityConfirmation
