import React, { useState } from 'react'
import { View, Text, TextInput,TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native'
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

    const Item = ({title, outside}) => {
        
        const bool = (interests.main.includes(title) | interests.new.includes(title))?true:false

        return (
        <Pressable
            style={{
                padding: outside?5:10,
                borderColor: '#eeeeee',
                borderWidth: outside?1:2,
                borderRadius: 20,
                margin: 8,
                marginTop: outside?0:8,
                alignItems: 'center',
                backgroundColor: bool?'#eeeeee':'#fefefe',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius:1,
                elevation: bool?0:10,
            }}

            disabled={outside}

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
                    marginBottom: 0,
                    alignItems: 'center',
                }]}
                onPress={() => setModalVisible(!modalVisible)}
                disabled={!edit}
            >

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        width: '100%',
                        marginLeft: -8,
                        alignContent:'center'

                    }}
                >

                    <Text style={[styles.accountHeader,{
                        marginTop:0
                    }]}>Interests</Text>
                    
                    <Icon name="add" style={{
                        backgroundColor: '#FF4E8C',
                        borderRadius: 10,
                        paddingTop: 2,
                        paddingLeft: 2.5,
                        height: 20,
                        width: 20,
                        alignSelf: 'center',
                        marginTop:2,
                        
                    }} size={15} color="#fff"/>

                </View>

            </TouchableOpacity>


            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                    flexWrap: 'wrap'
                }}
            >
                    {/* <Icon name="language" style={{
                        marginRight:10,
                        marginTop:4
                    }} size={20} color="#222"/> */}
                    
                    
                    {
                        Object.keys(interests).length !== 0

                        &&

                        interests.main.map(interest => (
                            <Item 
                                outside={true}
                                title={interest} 
                                key={interest}
                            />
                        ))
                        
                    }

            </View>

            
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
