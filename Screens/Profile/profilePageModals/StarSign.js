import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const StarSign = ({styles, edit, starSign, setStarSign}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const Sign = ({title}) => {
        
        let s;
        title = title.toLowerCase()
        const bool = (title === starSign)


        switch(title)
        {
            case 'leo':
                s = require('../../../assets/starSigns/leo.png')
                break;
            case 'virgo':
                s = require('../../../assets/starSigns/virgo.png')
                break;
            case 'aries':
                s = require('../../../assets/starSigns/aries.png')
                break;
            case 'libra':
                s = require('../../../assets/starSigns/libra.png')
                break;
            case 'scorpio':
                s = require('../../../assets/starSigns/scorpio.png')
                break;
            case 'taurus':
                s = require('../../../assets/starSigns/taurus.png')
                break;
            case 'cancer':
                s = require('../../../assets/starSigns/cancer.png')
                break;
            case 'capricorn':
                s = require('../../../assets/starSigns/capricorn.png')
                break;
            case 'aquarius':
                s = require('../../../assets/starSigns/aquarius.png')
                break;
        }

        return (
            <TouchableOpacity
                style={[style.starSign,{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius:1,
                    elevation: bool?0:10,
                    backgroundColor:bool?'#eee':'#fefefe'
                }]}
                onPress={() => {setModalVisible(!modalVisible); setStarSign(title)}}
            >
                <Image source={s}
                    style={{
                        width: 40,
                        height: 40,
                    }}
                />
                <Text
                    style={[style.text,{

                    }]}
                >{title}</Text>

            </TouchableOpacity>
        )}

    return (
        <>
            <TouchableOpacity style={[styles.basicOption,{
                alignItems: 'center'
            }]}
                onPress={() => setModalVisible(!modalVisible)}
                disabled={!edit}
            >

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                    }}>
                    
                    <Icon name="star" style={{
                        marginRight:10,
                        marginTop:4
                    }} size={20} color="#222"/>
                    
                    <Text style={styles.basicText}>Star sign</Text>

                </View>

                
                    <View
                        style={{
                            backgroundColor:'#efefef',
                            textAlign: 'center',
                            paddingHorizontal: 10,
                            right: 10,
                            borderRadius: 20,
                            borderColor: '#ddd',
                            borderWidth: 1,
                            paddingBottom: 2,
                            textAlign: 'center',
                            display: starSign?'flex':'none'
                        }}
                    >
                        <Text>
                            {starSign}
                        </Text>
                    </View>
               


                <Icon name="chevron-forward" style={{
                    marginRight:8,
                    
                }} size={18} color="#333"/>

            </TouchableOpacity>

            <View style={styles.centeredView}>
                
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    style={{
                        zIndex: 10
                    }}
                >
    
                    <View style={styles.centeredView}>
                    
                        <View style={[styles.modalView, {
                                justifyContent: 'space-evenly',
                                width: 350,
                                flexWrap: 'wrap',
                            }]}
                        >

                            <Sign title="LEO"/>
                            <Sign title="VIRGO"/>
                            <Sign title="ARIES"/>
                            <Sign title="CANCER"/>
                            <Sign title="AQUARIUS"/>
                            <Sign title="CAPRICORN"/>
                            <Sign title="TAURUS"/>
                            <Sign title="SCORPIO"/>
                            <Sign title="LIBRA"/>
   
                        </View>
    
                    </View>
    
                </Modal>
            
            </View>
        
        </>
    )
}

export default StarSign

const style = StyleSheet.create({
    starSign: {
        alignItems:"center",
        backgroundColor: '#aaa',
        padding: 10,
        borderRadius: 10,
        width: 120,
        height: 80,
        backgroundColor: '#fefefe',
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius:1,
        elevation: 8,
        margin: 10,

    },

    text: {
        fontWeight: 'bold'
    }
})