import React from 'react'
import { View, Text, Pressable } from 'react-native'

import StyledButton from '../../components/Buttons/StyledButton'


import styles from './Style/Styles'
const Gender = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>How do you identify?</Text>
            <Text style={styles.Welcometext}>Everyone's welcome here!</Text>
            

            <Text style={styles.option}>Woman</Text>
            <Text style={styles.option}>Man</Text>
            <Text style={styles.option}>Non-binary</Text>

            <Pressable style={styles.Moretext} onPress={() => navigation.navigate("Identities")}>
                <Text>More gender options ˅</Text>
            </Pressable>
            
            <StyledButton page="IdentityConfirmation" text="Next"/>
    
        </View>
    )
}



export default Gender
