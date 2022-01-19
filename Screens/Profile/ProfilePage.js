import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Languages from './profilePageModals/Languages'
import Height from './profilePageModals/Height'
import Interests from './profilePageModals/Interests'
import StarSign from './profilePageModals/StarSign'
import LookingFor from './profilePageModals/LookingFor'
import * as ImagePicker from 'expo-image-picker'
import ImageUpload from './profilePageModals/ImageUpload'
import ProfilePrompt from './profilePageModals/ProfilePrompt'
import Location from './profilePageModals/Location'

const ProfilePage = () => {

    const [name, setName] = useState("fnifn ejfenf")
    const [mnumber, setmnumber] = useState("783xxxxx58")
    const [edit, setEdit] = useState(false)
    const [textField, setTextField] = useState()
    const [image, setImage] = useState(null)
    const [textHeight, setTextHeight] = useState(0)
    const [interests, setInterests] = useState({
        main:[],
        new:[]
    })
   
    const [email, setEmail] = useState("whfbwj20bcs999")
    const [look, setLook] = useState()
    const [lang, setLang] = useState([])
    const [height, setHeight] = useState({
        feet:'0',
        inch:'0'
    })

    const [profilePrompts, setProfilePrompts] = useState({})

    const [starSign, setStarSign] = useState('')

    const [containerHeight, setContainerHeight] = useState(1550)
    const colors = [ "#FF9B7B", "#FF4E8C"];

    const addImageMedia = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if(!_image.cancelled)
            setImage(_image.uri)

    }

    const addImageCamera = async () => {

        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }      

        let _image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4,3],
            quality:1, 
        })

        if(!_image.cancelled)
            setImage(_image.uri)
    }

    const exportData = () => {
        
        const data = {
            bio: textField,
            profilePrompts: profilePrompts,
            interest: interests,
            lookingFor: look,
            languages: lang,
            height: height,
            starSign: starSign,
            image: image
        }

        console.log(JSON.stringify(data))

    }

    const formImage = () => {

        if(image)
        {
            let filename = image.split('/').pop()
            
            let match = /\.(\w+)$/.exec(filename)
            let type = match ? `image/${match[1]}` : `image`

            let formData = new FormData()

            formData.append('photo', {
                uri: image,
                name: filename,
                type
            })

            //console.log(formData)

            // await fetch(YOUR_SERVER_URL, {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //       'content-type': 'multipart/form-data',
            //     },
            // });

        }

    }

    useEffect(() => {

        if(textHeight > 120)
            setContainerHeight(1600+(textHeight-120))
        
        else
            setContainerHeight(1550)

    }, [textHeight])

    return (

        <ScrollView
            showsVerticalScrollIndicator={true}
        >

            <View 
                style={[styles.container, {
                    flexGrow: 1,
                    height: containerHeight
                }]}
            >
            
            {/* Profile Picture */}
                <View style={styles.picCont}>

                    <View style={styles.mainPicCont}>
                        {
                            image && 
                            <Image 
                                source={{uri: image}} 
                                style={styles.profilePic}
                            />
                        }
                    </View>

                </View>

            {/* Profile Picture Change Button */}
            <ImageUpload 
                colors={colors} 
                edit={edit} 
                styles={styles} 
                addImageCamera={addImageCamera} 
                addImageMedia={addImageMedia}
            />

            {/* Account Details Container */}
                <View style={styles.account}>
                    
                    <View style={styles.detailBox}>
                        <Text style={styles.accountHeader}>Account Settings</Text>
                        
                        {!edit?
                            <TouchableOpacity onPress={() =>{setEdit(true)}}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() =>{setEdit(false)}}>
                                <Text style={styles.editButton}>Submit</Text>
                            </TouchableOpacity>
                        }   
                    </View>

                    {/* Name Field */}
                    <View>
                        
                        <Text style={styles.inputTag}>Name</Text>
                        
                        <TextInput 
                            placeholder='Enter Name'
                            style={[styles.input,{
                                textAlign: 'right',
                                paddingRight: 20
                            }]}
                            value={name}
                            selectionColor="#FF4E8C"
                            editable={false}
                        />
                    
                    </View> 

                    {/* Number Field */}
                    <View>
                        
                        <Text style={styles.inputTag}>M.no.</Text>
                        
                        <TextInput 
                            placeholder='Enter Phone Number'
                            style={[styles.input,{
                                textAlign: 'right',
                                paddingRight: 20
                            }]}
                            value={mnumber}
                            selectionColor="#FF4E8C"
                            keyboardType='numeric'
                            editable={false}
                            maxLength={10}
                        />
                        
                    </View>

                    {/* D.O.B Field */}
                    <View>
                        
                        {/* <Text style={styles.inputTag}>D.O.B</Text> */}
                        
                        

                         
                    </View>

                    {/* Email Field */}
                    <View>
                        
                        <Text style={styles.inputTag}>Email</Text>
                        
                        <TextInput 
                            placeholder='Enter Email'
                            style={[styles.input,{
                                textAlign: 'right',
                                paddingRight: 20
                            }]}
                            value={email}
                            selectionColor="#FF4E8C"                    
                            editable={false}
        
                        />
                        
                    </View>


                    <Text style={styles.accountHeader}>My bio</Text>
                    
                    <TextInput
                        multiline={true}
                        scrollEnabled={false}
                        selectionColor="#FF4E8C"
                        numberOfLines={10}
                        editable={edit}
                        selectTextOnFocus={edit}
                        contextMenuHidden={true}
                        value={textField}
                        placeholder='Something about yourselve...'
                        onContentSizeChange={(event) => {
                            setTextHeight(event.nativeEvent.contentSize.height>120?event.nativeEvent.contentSize.height:120);
                        }}
                        onChangeText={text => setTextField(text)}
                        style={[styles.input, {
                            height:textHeight, 
                            textAlignVertical: 'top', 
                            textAlign: 'left', 
                            paddingVertical:14, 
                            paddingHorizontal:10
                        }]}
                    />

                    <Text style={styles.accountHeader}>My Profile Prompts</Text>
                    
                    {/* Profile Prompt DropDown */}
                    <ProfilePrompt 
                        styles={styles} 
                        profilePrompts={profilePrompts} 
                        setProfilePrompts={setProfilePrompts} 
                        edit={edit}
                    />

                    <Text style={styles.accountHeader}>My Basics</Text>
                    
                    {/* Location */}
                    <Location styles={styles} edit={edit} />

                    {/* School */}
                    <TouchableOpacity style={styles.basicOption}>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexGrow: 1,
                        }}>
                            <Icon name="school" style={{
                                marginRight:10,
                                marginTop:4
                            }} size={20} color="#222"/>
                            <Text style={styles.basicText}>School</Text>
                        </View>

                        
                        <Icon name="chevron-forward" style={{
                            marginRight:8,
                            marginTop:6
                        }} size={18} color="#333"/>

                    </TouchableOpacity>


                    {/* Languages */}
                    <Languages 
                        styles={styles} 
                        lang={lang} 
                        setLang={setLang} 
                        edit={edit}
                    />


                    <Text style={styles.accountHeader}>More about me</Text>
                             
                    {/* Height */}
                    <Height 
                        styles={styles} 
                        height={height} 
                        setHeight={setHeight} 
                        height={height} 
                        edit={edit}
                    />

                    {/* Star Sign */}
                    <StarSign 
                        styles={styles} 
                        starSign={starSign} 
                        setStarSign={setStarSign} 
                        edit={edit}
                    />

                    {/* Looking For */}
                    <LookingFor 
                        styles={styles} 
                        setLook={setLook} 
                        edit={edit}
                        look={look}
                    />

                    {/* Pronouns */}
                    <TouchableOpacity style={styles.basicOption}>

                        <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexGrow: 1,
                            }}>
                        

                            <MaterialCommunityIcons
                                style={{
                                    marginRight:8,
                                    marginTop:2,
                                    marginLeft: -3
                                }}
                            name="human" color="#222" size={25} />
                            
                            <Text style={styles.basicText}>Pronouns</Text>
                        
                        </View>


                        <Icon name="chevron-forward" style={{
                            marginRight:8,
                            marginTop:6
                        }} size={18} color="#333"/>

                    </TouchableOpacity>


                    {/* Interest Field */}

                    <Interests 
                        styles={styles} 
                        interests={interests} 
                        setInterests={setInterests} 
                        edit={edit}
                    />

                       
                    {/* Logout Button */}
                    <LinearGradient
                        colors={colors}
                        end={{ x: 0.75, y: 0.25 }}
                        style={styles.updateButtonGrad}
                    >
                        <TouchableOpacity
                            onPress={() => setEdit(false)}
                        >
                            <Text style={styles.updateButtonText}>LOGOUT</Text>

                        </TouchableOpacity>

                    </LinearGradient>
                    
                    {/* Delete Account Button */}
                    <LinearGradient
                        colors={colors}
                        end={{ x: 0.75, y: 0.25 }}
                        style={styles.updateButtonGrad}
                    >
                        <TouchableOpacity 
                            onPress={() => setEdit(false)}
                        >
                            <Text style={styles.updateButtonText}>DELETE ACCOUNT</Text>

                        </TouchableOpacity>

                    </LinearGradient>

                </View>

            </View>

        </ScrollView>

    )
}

const styles = StyleSheet.create({

    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        top: 0,
    },

    profilePic: {
        width: "110%",
        height: "100%",
        top:-1,
        resizeMode: 'contain',
        
    },

    changeBut:{

        width: "60%",
        height: 50,
        borderRadius: 25,
        marginHorizontal: "20%",
        position:'absolute',
        zIndex: 1,
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 1,
        shadowRadius:10,
        elevation: 10,
    },

    detailBox: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    accountHeader:{
        fontSize:18,
        fontWeight: 'bold',
        marginTop: 0,
    },

    editButton: {
        fontSize: 16,
        color: '#FF4E8C',
        width: 60,
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 20
    },

    account: {
        width: "100%",
        top: -680,
        position: 'relative',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'column',
    },  

    picCont: {
        position: 'relative',
        width: 1000,
        height: 1000,
        top: -680,
        left:-340,
        right:0,
        overflow: 'hidden',
        borderRadius:Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        borderWidth: 1,
        borderColor: '#ededed',
        backgroundColor: '#ededed'
    },

    mainPicCont: {
        position: 'absolute',
        top: 680,
        left: 0,
        right: 0,
        height: 320,
        width: "100%",

    },

    button:{
        width: 60,
        height: 60,
        position: 'absolute',
        borderRadius: 30,
        top: 270,
        right: 60,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius:1,
        elevation: 8,
    },

    input: {
        width: "100%",
        backgroundColor: 'rgb(240,240,240)',
        height: 50,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        textAlign: 'center',
    },

    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },

    updateButtonGrad: {
        width: "100%",
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 15,
        overflow: 'hidden',
        marginVertical: 5,

    },

    imageGrad: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
    },

    inputTag: {
        position: 'absolute',
        zIndex: 2,
        fontSize: 16,
        marginVertical: 22,
        marginLeft: 16,
        
    },

    basicOption: {
        display: 'flex',
        flexDirection: 'row',
        marginTop:5,
        padding: 5,
        paddingHorizontal: 10,

    },

    basicText: {
        fontSize:18,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        
    },
    modalView: {
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
        flexDirection: 'row',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

})

export default ProfilePage
