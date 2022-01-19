import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const LookingFor = ({styles, setLook, edit}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const func = (gender) => {
        setModalVisible(!modalVisible)
        setLook(gender)
    }

    return (
        
        <>
            <TouchableOpacity style={styles.basicOption}
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


                <Icon name="chevron-forward" style={{
                    marginRight:8,
                    marginTop:6
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
                            justifyContent: 'space-between'
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
                            {/* <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Icon name="male-female" size={30}/>
                            </TouchableOpacity> */}
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