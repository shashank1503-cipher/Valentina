import React, {useState} from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
;
const Names = ({}) => {
    const [First, setFirst] = useState('')
    const [Last, setLast] = useState('')
    const validate=0;


    return (
        <View style={ styles.container }>
            <Text style={styles.heading}>What shall we call you?</Text>

            <TextInput 
                placeholder="First Name" 
                style={styles.input}
                value={First}
                setValue={setFirst}
            />
            <TextInput 
                placeholder="Last Name" 
                style={styles.input}
                value={Last}
                setValue={setLast}
            />

            <StyledButton page="Dob" text="Next" onClick={validate}/>

        </View>
    )
}


export default Names
