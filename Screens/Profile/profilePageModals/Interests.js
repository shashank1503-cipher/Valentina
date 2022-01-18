import React, { useState } from 'react'
import { View, Text, TextInput,TouchableOpacity, Modal, Pressable, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


const Interests = ({styles , interests, setInterests, edit}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const [toAdd,setToAdd] = useState()

    let interest = [
        'traveling',
        'exercise',
        'dancing',
        'cooking',
        'sports'
    ]

    const Item = ({title}) => {
        
        const bool = (interests.main.includes(title) | interests.new.includes(title))?true:false

        return (
        <Pressable
            style={{
                padding: 10,
                borderColor: '#eeeeee',
                borderWidth: 2,
                borderRadius: 20,
                margin: 8,
                alignItems: 'center',
                backgroundColor: bool?'#eeeeee':'#fefefe',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius:1,
                elevation: bool?0:10,
            }}

            onPress={() => onPressHandler(title)}
        >
            <Text>{title}</Text>

        </Pressable>
    )}

    const onPressHandler = (title) => {

        let i;

        if(interest.includes(title))
        {
            i = [...interests.main]
            
            if(i.includes(title))
            i = i.filter(it => it !== title)
            else
            i.push(title)
            
            setInterests(s => ({
                ...s,
                main:i
            }))
            
        }
        else
        {
            i = [...interests.new]

            if(i.includes(title)) 
                i = i.filter(it => it !== title)
            else
                i.push(title)

            setInterests(s => ({
                ...s,
                new: i
            }))

            setToAdd('');
        }
        
    }


    return (
        <>
            <TouchableOpacity style={[styles.basicOption,{
                marginBottom: 20
            }]}
                onPress={() => setModalVisible(!modalVisible)}
                disabled={!edit}
            >

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                }}>
                    {/* <Icon name="language" style={{
                        marginRight:10,
                        marginTop:4
                    }} size={20} color="#222"/> */}
                    <Text style={styles.basicText}>Interests</Text>
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
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                width: '90%',
                            }]}
                        >                    
                            
                            <View
                                style={{
                                    width: 250,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                }}
                            >

                                <TextInput
                                    placeholder='Interests'
                                    style={[styles.input,{
                                        marginRight: 50,
                                        backgroundColor: '#fefefe'
                                    }]}
                                    value={toAdd}
                                    onChangeText={text => setToAdd(text)}
                                    selectionColor="#FF4E8C"
                                    editable={true}
                                    selectTextOnFocus={true}
                                />

                                <TouchableOpacity
                                    style={{
                                        backgroundColor:'#FF4E8C',
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                    }}

                                    onPress={() => onPressHandler(toAdd)}
                                >
                                    <Icon name='add' 
                                        style={{
                                            marginVertical:4,
                                            marginHorizontal:5,
                                            position: 'absolute',
                                            
                                        }} 
                                        size={30} color="#fff"
                                    />
                                </TouchableOpacity>

                            </View>
                            
                            <View
                                style={{
                                    display: 'flex',
                                    marginTop:  0,
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',

                                }}
                            >
                            {
                                interest.map(interest => (
                                    <Item title={interest} key={interest}/>
                                ))
                            }

                            {
                                interests.new.map(interest => (
                                    <Item title={interest} key={interest}/>
                                ))
                            }
                            </View>

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

export default Interests

const style = StyleSheet.create({



})