import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

 
const loc = () => {
    
}


const Location = () => {

    return (
        <View>
            <TouchableOpacity
                onPress={() => loc()}
            >
                <Text>Update</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Location
