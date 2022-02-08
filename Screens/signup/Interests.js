import { View, Text, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
import React, {useContext, useState} from 'react';
import styles from './Style/Styles'
import Header from './Header'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import AppContext from '../../context/AppContext';

let interest = [
  'Outdoors', 'Working out', 'Dancing', 'Cooking', 'Sports', 'Running', 'Photography',
  'Netflix & Chill', 'Coding', 'Singing', 'Music', 'Gaming', 'Reading', 'Shopping',
  'Politics', 'Comedy', 'Potterhead', 'Writing',
]

const Interests = () => {
  let {user} = useAuth()

  const { updateUserData } = useContext(AppContext)

  const [modalVisible, setModalVisible] = useState(false)
  const [toAdd, setToAdd] = useState()
  const navigation = useNavigation();


  const [interests, setInterests] = useState({
    main:[],
    new:[]
  })
  const colors = ["#FF4E8C", "#FF9B7B", "#F9D7D5"];


  const Item = ({title, outside}) => {
        
    const bool = (interests.main.includes(title) | interests.new.includes(title))?true:false

    return (
    <Pressable
      style={{
        
          padding: outside?5:10,
          borderColor: '#eeeeee',
          borderWidth: outside?1:2,
          borderRadius: 30,
          margin: 10,
          marginTop: outside?0:8,
          alignItems: 'center',
          backgroundColor: bool?'#eeeeee':'#fefefe',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius:1,
          justifyContent: 'center'
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
  let handleSubmit  = ()=>{
    let data={interest:interests}
    console.log(data)
    updateDoc(doc(db, "users", user.uid), {
      ...data,
    }).then(() => {
      console.log("done");
      updateUserData()
      navigation.navigate("Photo");
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  return (
    <View style={styles.container}>
      <Header title="My interests"/>

      <TouchableOpacity style={{
        marginBottom: 0,
        alignItems: 'center',
      }}
        onPress={() => setModalVisible(!modalVisible)}
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

          <Text style={{
            marginTop:75,
            color:'#c4c4c4',
          }}>Add Something</Text>
        
          <Icon name="add" style={{
            backgroundColor: '#FF4E8C',
            borderRadius: 50,
            paddingVertical: 2.5,
            paddingHorizontal: 4,
            height: 30,
            width: 30,
            alignSelf: 'center',
            top:40,           
          }} size={23} color="#fff"/>
        </View>
      </TouchableOpacity>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 0.2,
        flexWrap: 'wrap'
      }}>             
        {
          Object.keys(interests).length !== 0
            &&
            (interests.main.map(interest => (
              <Item 
                outside={true}
                title={interest} 
                key={interest}
              />
            ))  ||
            interests.new.map(interest => (
                <Item 
                    outside={true}
                    title={interest} 
                    key={interest}
                />
            ))    )      
        }

      </View>
      <View style={{
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
        paddingBottom:-50,
      }}>    
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          style={{
            zIndex: 10
          }} 
        >
          <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: 40,
          }}>
        
            <View style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
              width:200,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              display: 'flex',
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '90%',
              }}
            >                     
              <View
                style={{
                  width: 250,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >

                <TextInput
                  placeholder='Interests'
                  style={[styles.input,{
                    top:0,
                    marginRight: 60,
                    backgroundColor: 'rgb(240,240,240)',
                    height: 45,
                    width:200,
                    marginVertical: 10,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#ddd',
                    textAlign: 'center',
                    marginLeft:-25,
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
                alignItems: 'center',
                justifyContent: 'center',
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

      <TouchableOpacity
        onPress={() => {
          handleSubmit()
          

        }}
        style={styles.button, {top:-220, alignItems: 'center'}}
      >
        <LinearGradient
          colors={colors}
          style={styles.background}
          end={{ x: 0.85, y: 0.15 }}
        >
          <Text style={styles.text}>NEXT</Text>
        </LinearGradient>
      </TouchableOpacity>


    </View>
  );
};

export default Interests;
