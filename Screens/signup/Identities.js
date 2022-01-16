import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import styles from './Style/Styles'



const Identities = () => {
    return (
        <View style={styles.Searchcontainer}>
        <TextInput 
            placeholder="Search" 
            style={styles.search}
        />
        
        </View>
    )
}

export default Identities
