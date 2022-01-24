import React, { useState} from 'react'
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
import Header from './Header'


const IdentityConfirmation = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    
    return (
            <View style={styles.container}>
                <Header title="How do you identify?"/>
                <Text style={styles.Welcometext}>Everyone's welcome here!</Text>

                <Pressable style={styles.IdentityConfirmationPress}>
                <Text>Bigender</Text>
                </Pressable>

                <View style={styles.showOnProfile}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.showText}>Show on my Profile</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#F9D7D5" }}
                            thumbColor={isEnabled ? "##FF9B7B" : "#FF4E8C"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={styles.toggleSwitch}
                        />    
                    </View>
                    <Text style={styles.turnText}>Turn this on to have your gender identity on your profile</Text>
                </View>
                <StyledButton page="Sexuality" text="Next"/>

        
        </View>
    )
}

export default IdentityConfirmation
