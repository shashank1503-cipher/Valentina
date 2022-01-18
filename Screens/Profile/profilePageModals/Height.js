import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Height = ({styles, height, setHeight, edit}) => {

    const [modalVisible, setModalVisible] = useState(false)

    return (

        <>

        <TouchableOpacity style={styles.basicOption}
            onPress={() => setModalVisible(!modalVisible)}
            disabled={!edit}
        >

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                }}>
                
                <Icon name="home" style={{
                    marginRight:10,
                    marginTop:4
                }} size={20} color="#222"/>
                
                <Text style={styles.basicText}>Height</Text>
            
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
                            justifyContent: 'space-around'
                        }]}
                    >
                    
                    <TextInput 
                        placeholder='Feet'
                        style={style.input}
                        value={height.feet}
                        selectionColor="#FF4E8C"
                        keyboardType='numeric'
                        onChangeText={f => setHeight(h => ({
                            ...h,
                            feet:f
                        }))}
                        selectTextOnFocus={true}
                        maxLength={1}
                        maxValue={6}
                    />
                        

                    <TextInput 
                        placeholder='Inch'
                        style={style.input}
                        value={height.inch}
                        selectionColor="#FF4E8C"
                        keyboardType='numeric'
                        onChangeText={inch => setHeight(h => ({
                            ...h,
                            inch:inch
                        }))}
                        selectTextOnFocus={true}
                        maxLength={2}
                        maxValue={12}
                    />
                        
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

export default Height

const style = StyleSheet.create({
    input: {
        width: 80,
        height: 60,
        backgroundColor: 'rgb(250,250,250)',
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: '#eee',
        textAlign: 'center',
    }
})