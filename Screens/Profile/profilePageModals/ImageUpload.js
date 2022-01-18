import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ImageUpload = ({colors, edit, styles, addImageCamera, addImageMedia}) => {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <TouchableOpacity style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
                disabled={!edit}
            >
                <LinearGradient
                    colors={colors}
                    end={{ x: 0.75, y: 0.25 }}
                    style={styles.imageGrad}
                >

                </LinearGradient>

                <Icon
                style={{
                    position: 'absolute',
                    top: 14,
                    left: 14
                }} name="image" size={30} color="#eee" />
            
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
                                onPress={() => addImageCamera()}
                            >
                                <Icon name="camera" size={30}/>
                                <Text>Camera</Text>
                                
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={style.button}
                                onPress={() => addImageMedia()}
                            >
                                <Icon name="images" size={30}/>
                                <Text>Gallery</Text>
                            </TouchableOpacity>
                           
                        </View>
                    
                    <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={{
                                backgroundColor:'#222',
                                padding: 10,
                                width: "50%",
                                borderRadius: 20,
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: 'bold',                                  
                                }}
                            >Done</Text>
                    </TouchableOpacity>
                    </View>



                </Modal>
            </View>
        </>
    )
}

export default ImageUpload

const style = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        alignItems: 'center',
    }
})