import React, { useState} from 'react'
import { View, Text, Pressable,Button, TouchableHighlight } from 'react-native'
import StyledButton from '../../components/Buttons/StyledButton'
import Header from './Header'

import styles from './Style/Styles'
const Gender = () => {
    const genders = [
        {
            genderOptions: [
                { genderText: 'Woman', value: 'woman' },
                { genderText: 'Man', value: 'man' },
                { genderText: 'Non-binary', value: 'non-binary' },
            ],
        },       
    ]

    var [ isPress, setIsPress ] = useState(false)
    var touchProps = {
        activeOpacity: 1,
        underlayColor: 'white',      
        style: isPress ? styles.btnPress : styles.btnNormal,
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
        onPress: () => console.log('HELLO'),                 
      };

    return (
        <View style={styles.container}>
            <Header title="How do you identify?"/>
            <Text style={styles.Welcometext}>Everyone's welcome here!</Text>

            <View>
                {genders[0].genderOptions.map((genderOption)=> (
                    <TouchableHighlight {...touchProps} >
                        <Text >{genderOption.genderText}</Text>
                    </TouchableHighlight>
                ))}
            </View>
            

            {/* 
            <Text style={styles.option}>{genderOptions[0].genderText}</Text>
            <Text style={styles.option}>{genderOptions[1].genderText}</Text>
            <Text style={styles.option}>{genderOptions[2].genderText}</Text> */}

            <Pressable style={styles.Moretext} onPress={() => navigation.navigate("Identities")}>
                <Text>More gender options ˅</Text>
            </Pressable>
            
            <StyledButton page="IdentityConfirmation" text="Next"/>
    
        </View>
    )
}



export default Gender
