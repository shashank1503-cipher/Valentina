import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import Icon from 'react-native-vector-icons/Ionicons'

const DisLikesList = ({styles, edit}) => {

    const {user} = useAuth()

    const [userList, setUserList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    const updateDislikes = async (id) => {

        console.log(id)

        await deleteDoc(doc(db, 'users', user.uid, 'dislikes',id))

        setUserList(userList.filter(user => user.id !== id))

        if(userList.length === 0)
            setModalVisible(false)

    }


    useEffect(() => {

        const getData = async () => {

            let dislike = []

            const data = await getDocs(
                collection(db, 'users', user.uid, 'dislikes')
            )

            data.forEach(async (val) => {
                console.log(val.id)
                dislike.push(val.id)
            })

            if(dislike.length > 0)
                for(let l of dislike)
                {
                    const d = (await getDoc(doc(db, 'users', l))).data()

                    setUserList(userList => [
                        ...userList,
                        {
                            name: d.name,
                            id: d.id,
                            email: d.email
                        }
                    ])
                }
            
        }

        getData()

    }, [])

    useEffect(() => {
        console.log("Dislike List : ", userList)
    }, [userList])

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


                <Icon
                    style={{
                        marginRight:10,
                        marginTop:4,
                    }}
                    name="heart-dislike" color="#222" size={20} 
                />
                
                <Text style={styles.basicText}>Your Dislikes</Text>

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
                    display: userList.length > 0?'flex':'none'
                }}
            >
                <Text>
                    {userList.length}
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
                    visible={modalVisible && (userList.length > 0)}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                    style={{
                        zIndex: 10
                    }}

                >

                    <View style={styles.centeredView}>
                    
                        <View style={[styles.modalView, {
                                justifyContent: 'space-between',
                                width: "95%",
                                display: 'flex',
                                flexDirection: 'column'
                            }]}
                        >

                            {userList.length > 0?

                                userList.map( (user) => (

                                    <View 
                                        key={user.id}
                                        style={{
                                            display: 'flex',
                                            width: '90%',
                                            borderColor: '#aaa',
                                            borderWidth: 1,
                                            marginVertical: 10,
                                            borderRadius: 10,
                                            paddingHorizontal: 10,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingVertical: 4,
                                        }}
                                    >
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >

                                            <Text
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 16
                                                }}
                                            >{user.name}</Text>
                                    
                                            <Text
                                                style={{
                                                    color: '#aaa',
                                                    fontSize: 12
                                                }}
                                            >{user.email?user.email.replace('@iiitkottayam.ac.in', ''):""}</Text>

                                        </View>

                                        <TouchableOpacity
                                            style={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 15,
                                                backgroundColor: '#f22',
                                                display:'flex'
                                            }}
                                            onPress={() => updateDislikes(user.id)}
                                        >
                                            <Icon
                                                name="remove"
                                                size={20}
                                                color='#fff'

                                                style={{
                                                    top: 1.5,
                                                    left: 2,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>


                                ))
                                :
                                <></>
                            }
                            
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
    );
};

export default DisLikesList;
