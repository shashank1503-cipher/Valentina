import React, {useState} from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
;
const Names = ({First, Last, setValue}) => {

    return (
        <View style={ styles.container }>
            <Text style={styles.heading}>What shall we call you?</Text>

            <TextInput 
                placeholder="First Name" 
                style={styles.input}
                value={First}
                onChangetext={setValue}
            />
            <TextInput 
                placeholder="Last Name" 
                style={styles.input}
                value={Last}
                onChangetext={setValue}
            />

            <StyledButton page="Dob" text="Next"/>

        </View>
    )
}


export default Names
