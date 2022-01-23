import React from 'react'
import { View, Text, Pressable } from 'react-native'
import styles from './Style/Styles'

const Header = ({title}) => {

    return (
        <View>
            <Text style={styles.heading}>{title}</Text>    
        </View>
    )
}



export default Header
