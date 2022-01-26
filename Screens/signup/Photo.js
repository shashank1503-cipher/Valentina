import { View, Text, StyleSheet, 
  Dimensions, 
  Image, 
  TextInput, 
  TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
import Header from './Header' 
import * as ImagePicker from 'expo-image-picker'
import { doc, setDoc } from 'firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'

const Photo = () => {
  const [image, setImage] = useState('')
  const [bool, setBool] = useState(false)
  
  const addImageMedia = async (text) => {

    text = text.toLowerCase()

    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: text === [9,16],
        quality: 1,
        base64:true
    });

    if(!_image.cancelled)
        formImage(_image, text)
            
}

const addImageCamera = async (text) => {

    text = text.toLowerCase()
    
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
    }      

    let _image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect:  text === [9,16],
        quality:1, 
    })

    if(!_image.cancelled)
        formImage(_image, text)

  }

  const formImage = async (image, text) => {

    let CLOUDINARY_URL = "ClOUD_URL"
  
    let base64Img = `data:image/jpg;base64,${image.base64}`
  
    let data = {
        "file": base64Img,
        "upload_preset": "PRESET"
    }
  
    fetch(CLOUDINARY_URL, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: "POST",
    })
    .then(async r => r.json())
    .then(data => {
        console.log(data)
        
        setImage(i => ({
            ...i,
            [text]:data.secure_url.toString()
        }))
  
    })
  
  }

  return (
    <View style={styles.container}>
      <Header title="Your fake candids"/>
      <View style={styles.circle}>
        <TouchableOpacity
          style={{zIndex:10}}
          onPress={() => setBool(!bool)}
        >
          <Icon name="camera" size={75} style={styles.icon}/>
              
        </TouchableOpacity>
            
      </View>
      {bool? 
        <View style={styles.camcontainer}>
          <TouchableOpacity
            onPress={() => addImageCamera(image)}
            
          ><View style={styles.subcamcontainer}>
            <Icon name="camera" size={30} style={styles.opicons}/>
            <Text style={styles.optext}>TAKE PHOTO</Text></View>
    
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => addImageMedia(image)}
          >
          <View style={styles.subcamcontainer}>
            <Icon name="images" size={30} style={styles.opicons}/>
            <Text style={styles.optext}>UPLOAD FROM GALLERY</Text>
            </View>  
          </TouchableOpacity>
        </View>
      : null }


      <StyledButton page="Main" text="Home Page"/>

    </View>
  );
};

export default Photo;
