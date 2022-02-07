import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const LookingFor = ({styles, setLook, edit, look}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const func = (gender) => {
        setModalVisible(!modalVisible)
        setLook(gender)
    }

    return (
        
        <>
            <TouchableOpacity style={[styles.basicOption,{
                alignItems:'center'
            }]}
                onPress={() => setModalVisible(true)}
                disabled={!edit}
            >
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                    }}>
                    
                    <Icon name="person" style={{
                        marginRight:10,
                        marginTop:4
                    }} size={20} color="#222"/>
                    
                    <Text style={styles.basicText}>Looking For</Text>
                
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
                        display: look?'flex':'none'
                    }}
                >
                    <Text>
                        {look}
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
                            width: 300
                        }]}>

                            <TouchableOpacity
                                style={style.button}
                                onPress={() => func('male')}
                            >
                                <Icon name="male" size={30}/>
                                <Text>Male</Text>
                                
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={style.button}
                                onPress={() => func('female')}
                            >
                                <Icon name="female" size={30}/>
                                <Text>Female</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={style.button}
                                onPress={() => func('both')}
                            >
                                <Icon name="male-female" size={30}/>
                                <Text>Both</Text>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </Modal>
            
            </View>
        </>
    )
}

export default LookingFor

const style = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        alignItems: 'center',
    }
})