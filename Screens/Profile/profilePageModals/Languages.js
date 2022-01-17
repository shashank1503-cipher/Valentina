import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, Pressable, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'




const Languages = ({styles, setLang, lang, edit}) => {

    const [modalVisible, setModalVisible] = useState(false)

    const langs = [
       "English",
       "Hindi",
       "Malayalam",
       "Assamese",
       "Bengali",
       "Gujarati",
       "Punjabi",
       "Tamil",
    ]

    const Item = ({ title }) => (
        <View style={style.item}>
          <Text style={[style.title,{
              fontWeight:lang.includes(title)?'bold':'normal',
          }]}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (

        <TouchableOpacity
            onPress={() => onPressHandler(item)} 
        >
            <Item title={item}/>
        </TouchableOpacity>
    );

    const onPressHandler = (id) => {

        let l = [...lang];

        if(l.includes(id))
        {
            l = l.filter(la => la !== id)
        }
        else
            l.push(id)

        setLang(l)
    }


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
                    <Icon name="language" style={{
                        marginRight:10,
                        marginTop:4
                    }} size={20} color="#222"/>
                    <Text style={styles.basicText}>Languages</Text>
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
                            }]}
                        >

                            <FlatList
                                data={langs}
                                renderItem={renderItem}
                                keyExtractor={item => item}
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

export default Languages

const style = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding: 8,
      marginVertical: 5,
      marginHorizontal: 5,
    },
    title: {
      fontSize: 16,
    },
  });