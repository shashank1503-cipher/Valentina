import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Loc from 'expo-location'
import Icon from 'react-native-vector-icons/Ionicons'


const Location = ({styles, edit, location, setLocation}) => {

    const [loading, setLoading] = useState(false)
    const [translation, setTranslation] = useState(0);

    const loc = async () => {
        
        setLoading(true)

        let { status } = await Loc.requestForegroundPermissionsAsync();

        if( status !== 'granted')
        {
            return
        }

        let location = await Loc.getCurrentPositionAsync({})

        let city = await Loc.reverseGeocodeAsync({
            latitude : location.coords.latitude,
            longitude : location.coords.longitude
        })

        setLoading(false)
        
        setLocation(city[0].subregion)

    }

    useEffect(() => {

        if(loading)

            for(let i = 0; i < 500; i++)

            setTimeout(() => {
                setTranslation(i)
            }, i);

    }, [loading])


    return (
        <View>
            <TouchableOpacity style={[styles.basicOption,{
                alignItems: 'center'
            }]}
                onPress={loc}
                disabled={!edit}
            >

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                    }}
                >
                    <Icon name="location" style={{
                        marginRight:10,
                        marginTop:4
                    }} size={20} color="#222"/>
                    <Text style={styles.basicText}>Location</Text>
                </View>
                
                { loading?

                    <View>
                        <Icon
                            name="refresh"
                            size={20}
                            style={{
                               transform: [{
                                   rotateZ: `${translation}deg`
                               }]
                            }}
                        />
                    </View>
                    :
                    <View
                        style={{
                            backgroundColor:'#efefef',
                            textAlign: 'center',
                            paddingHorizontal: 10,
                            right: 10,
                            borderRadius: 20,
                            borderColor: '#ddd',
                            borderWidth: 1,
                            display: location?'flex':'none',
                            paddingTop: 2
                        }}
                    >
                        <Text>
                            {location}
                        </Text>
                    </View>
                }
                
                <Icon name="chevron-forward" style={{
                    marginRight:8,
                    
                }} size={18} color="#333"/>

            </TouchableOpacity>
        </View>
    )
}

export default Location
