import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const ImageUpload = ({colors, edit, styles, addImageCamera, addImageMedia}) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [image, setImage] = useState('')
    
    const [loading, setLoading] = useState(true);

    const onPressHandler = (text) => {
        setImage(text)
    }

    const Select = ({title}) => {

        return (
            <TouchableOpacity
                style={[style.button],{
                    backgroundColor: title === image?'#eee':'',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 10,
                    width: 110,
                }}
                onPress={() => onPressHandler(title)}
            >
                {
                    title === image?
                        <Icon name="image" size={30}/>
                        :
                        <Icon name="image-outline" size={30}/>
        
                }
                    
                <Text>{title.replace('_',' ')}</Text>

            </TouchableOpacity>
        )
    }

    useEffect(() => {

        console.log(loading)

    }, [loading])


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
                    onRequestClose={() => setModalVisible(!modalVisible)}
                    style={{
                        zIndex: 10
                    }}
                >

                    <View style={styles.centeredView}>
                    
                        <View style={[styles.modalView, {
                            justifyContent: 'space-evenly',
                            width: 330,
                        }]}>
                                  
                            <Select title={'Background'}/>
                            <Select title={'Profile_1'}/>
                            <Select title={'Profile_2'}/>


                        </View>


                        <View style={[styles.modalView, {
                            justifyContent: 'space-between',
                            display: image?'flex': 'none' 
                        }]}>

                       
                        <TouchableOpacity
                            style={style.button}
                            onPress={() => addImageCamera(image)}
                        >
                            <Icon name="camera" size={30}/>
                            <Text>Camera</Text>
                            
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={style.button}
                            onPress={() => addImageMedia(image)}
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