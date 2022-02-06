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
    Alert,
    
} from 'react-native'

import Languages from './profilePageModals/Languages'
import Height from './profilePageModals/Height'
import Interests from './profilePageModals/Interests'
import StarSign from './profilePageModals/StarSign'
import LookingFor from './profilePageModals/LookingFor'
import * as ImagePicker from 'expo-image-picker'
import ImageUpload from './profilePageModals/ImageUpload'
import ProfilePrompt from './profilePageModals/ProfilePrompt'
import Location from './profilePageModals/Location'
import Pronouns from './profilePageModals/Pronouns'
import { db } from '../../firebase'
import useAuth from '../../hooks/useAuth'
import { collection, deleteDoc, doc, getDoc, onSnapshot, onSnapshotsInSync, query, setDoc, where } from 'firebase/firestore'
import Religion from './profilePageModals/Religion'
import DatePicker from 'react-native-datepicker'
import Batch from './profilePageModals/Batch'
import Sexuality from './profilePageModals/Sexuality'
import Gender from './profilePageModals/Gender'

const ProfilePage = () => {
    
    const {user, logout} = useAuth()

    const [name, setName] = useState(user.displayName)
    const [mnumber, setmnumber] = useState(user.phoneNumber || "")
    const [edit, setEdit] = useState(false)
    const [textField, setTextField] = useState()
    const [image, setImage] = useState({
        background: 'null',
        profile_1: 'null',
        profile_2: 'null'
    })

    const [textHeight, setTextHeight] = useState(120)
    const [interests, setInterests] = useState({
        main:[],
        new:[]
    })
   

    const [email, setEmail] = useState(user.email.replace('@iiitkottayam.ac.in', ''))
    const [look, setLook] = useState()
    const [lang, setLang] = useState([])
    const [height, setHeight] = useState({
        feet:'0',
        inch:'0'
    })

    const [location, setLocation] = useState('')

    const [profilePrompts, setProfilePrompts] = useState({})

    const [starSign, setStarSign] = useState('')

    const [pronoun, setPronoun] = useState('')

    const [religion, setReligion] = useState('')

    const [date, setDate] = useState('15-01-2022');
    
    const [batch, setBatch] = useState('')

    const [gender, setGender] = useState('')

    const [sexuality, setSexuality] = useState('');

    const [containerHeight, setContainerHeight] = useState(1550)
    const colors = [ "#FF9B7B", "#FF4E8C"];

    const addImageMedia = async (text) => {

        text = text.toLowerCase()

        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: text === 'background'?false:true,
            aspect: [9,16],
            quality: 1,
            base64:true
        });

        if(!_image.cancelled)
            formImage(_image, text)
                
    }


    const deleteAccount2 = () => {
        
        console.log("Hello")
        console.log(user.uid)
        
        deleteDoc(doc(db, 'users', user.uid))
        .then(() => logout())
    }


    const deleteAccount = async () => {

        console.log("Delete")

        const q = query(
            collection(db, 'matches'),
            where('usersMatched','array-contains',user.uid)
        )

        onSnapshot(q,
            snapshot => {
                snapshot.docs.map(d => {
                    deleteDoc(doc(db, 'matches', d.id))
                })
            }
        )
        
        deleteAccount2()

        // deleteDoc(query)
        // deleteDoc(doc(db, 'users', user.uid))
        // .then(() => logout())
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
            aspect: [9,16],
            quality:1, 
        })

        if(!_image.cancelled)
            formImage(_image, text)

    }

    const [oldData, setOldData] = useState({});

    const formData = () => {
        
        const data = {
            id: user.uid,
            name: name,
            bio: textField || '',
            phoneNumber: mnumber,
            image: image,
            profilePrompts: profilePrompts,
            interest: interests,
            languages: lang,
            dob: date,
            gender: gender,
            
            "aboutStuff":[
                {
                    "type": 'looking_for',
                    "value": look || ''
                },
                {
                    "type": 'height',
                    "value": height,
                },
                {
                    "type": 'star_sign',
                    "value": starSign || '',
                },
                {
                    "type": 'pronoun',
                    "value": pronoun || '',
                },
                {
                    "type": 'religion',
                    "value": religion || '',
                },
                {
                    "type": 'location',
                    "value": location
                },
                {
                    "type": 'batch',
                    "value": batch
                },
                {
                    "type": "sexuality",
                    "value": sexuality,
                }
            ]
        }

        console.log(data)

        setOldData(data)
    }


    const checkForm = () => {

        console.log(!textField)

        if(!textField)
        {
            console.log("Bio")
            Alert.alert(
                "Empty fields",
                `Add Bio`,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return true;
        }

        else if(interests.main.length === 0 && interests.new.length === 0)
        {
            console.log("Bio")
            Alert.alert(
                "Empty fields",
                `Add atleast one Interest`,
                [
                  { text: "OK"}
                ]
            );

            return true;
        }

        return false;

    }


    const exportData = () => {

        if(checkForm())
        {
            setEdit(true);
            return;
        }

        
        const data = {
            id: user.uid,
            name: name,
            bio: textField || '',
            phoneNumber: mnumber,
            image: image,
            profilePrompts: profilePrompts,
            interest: interests,
            languages: lang,
            dob: date,
            gender: gender,
            
            "aboutStuff":[
                {
                    "type": 'looking_for',
                    "value": look || ''
                },
                {
                    "type": 'height',
                    "value": height,
                },
                {
                    "type": 'star_sign',
                    "value": starSign || '',
                },
                {
                    "type": 'pronoun',
                    "value": pronoun || '',
                },
                {
                    "type": 'religion',
                    "value": religion || '',
                },
                {
                    "type": 'location',
                    "value": location
                },
                {
                    "type": 'batch',
                    "value": batch
                },
                {
                    "type": "sexuality",
                    "value": sexuality,
                }
            ]
        }

        if(JSON.stringify(data) == JSON.stringify(oldData))
            return;

        setDoc(doc(db, 'users', user.uid), {
            ...data
        })
        .then(() => {
            console.log("done")
        })
        .catch(err => {
            alert(err.message)
        })

    }

    const formImage = async (image, text) => {

        let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dsjzkocno/upload"

        let base64Img = `data:image/jpg;base64,${image.base64}`

        let data = {
            "file": base64Img,
            "upload_preset": "valentina"
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


    useEffect(() => {

        const getData = () => {

            console.log('started ...')

            getDoc(doc(db, 'users', user.uid))
            .then(data => data.data())
            .then(data => {
                console.log(data)     
                setTextField(data.bio || '')
                setName(data.name || '')
                setmnumber(data.phoneNumber || '')
                setInterests(data.interest || interests)
                setImage(data.image || image)
                setGender(data.gender || gender)
                setDate(data.dob || date)
                setLang(data.languages || lang)
                setProfilePrompts(data.profilePrompts || profilePrompts)

                data.aboutStuff.map( about => {
                    if(about.type === "sexuality")
                        setSexuality(about.value)
                    
                    if(about.type === "looking_for")
                        setLook(about.value || look)
                    
                    if(about.type === "height")
                        setHeight(about.value)
             
                    if(about.type === "star_sign")
                        setStarSign(about.value)
             
                    if(about.type === "pronoun")
                        setPronoun(about.value)
     
                    if(about.type === "religion")
                        setReligion(about.value)
     
                    if(about.type === "location")
                        setLocation(about.value)
     
                    if(about.type === "batch")
                        setBatch(about.value)
                         
                })

            })
            .catch(e => console.log(e))
            .finally(()=>{
                console.log("done")
            })
                        
        }

        getData()

    }, [])


    useEffect(() => {
        
        const len = Object.keys(profilePrompts).length

        if(textHeight > 120)
            setContainerHeight(1700+(textHeight-120))
        
        else if(len === 0)
            setContainerHeight(1700+(textHeight-120))

        else if(len === 1)
            setContainerHeight(containerHeight+50)
        
        else if(len === 2)
            setContainerHeight(containerHeight + 50)
        
        else
            setContainerHeight(1700)

        console.log(containerHeight)

    }, [textHeight, profilePrompts])

    return (
        <>
        <View></View>
        <ScrollView
            showsVerticalScrollIndicator={true}
            ref={ref => {this.ScrollView = ref}}
        >

            <View 
                style={[styles.container, {
                    flexGrow: 1,
                    height:containerHeight
                }]}
                
            >
            
            {/* Profile Picture */}
                <View style={styles.picCont}>

                    <View style={styles.mainPicCont}>
                       
                        <Image
                            source={{uri:image.background}} 
                            style={styles.profilePic}
                        />

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
                            <TouchableOpacity onPress={() =>{setEdit(true); formData()}}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() =>{setEdit(false); exportData()}}>
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
                            editable={edit}
                            onChangeText={text => setName(text)}
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
                            onChangeText={text => setmnumber(text)}
                            selectionColor="#FF4E8C"
                            keyboardType='numeric'
                            editable={edit}
                            maxLength={10}
                        />
                        
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


                    {/* D.O.B Field */}
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                            alignItems: 'center',
                            // alignSelf: 'center'
                        }}
                            
                    >
                        
                        <Text style={[styles.inputTag,{
                            position: 'relative',
                            marginVertical: 0,
                        }]}>D.O.B</Text>
                        <DatePicker
                            mode="date"
                            date={date}
                            placeholder='Select date'
                            format="DD/MM/YYYY"
                            minDate="01-01-1900"
                            maxDate="01-01-2003"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            disabled={!edit}

                            // customStyles={[{
                                
                            //     borderRadius:10,

                            //     dateIcon: {
                            //       position: 'absolute',
                            //       right: -5,
                            //       top: 4,
                            //       marginLeft: 0,
                            //     },
                            //     dateInput: {
                            //       alignItems: "flex-start",
                            //     },
                            //     placeholderText: {
                            //       fontSize: 17,
                            //       color: "gray"
                            //     },
                            //     dateText: {
                            //       fontSize: 17,
                            //     }
                            // }]}
                            onDateChange={(date) => {
                                setDate(date);
                            }}
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
                        placeholder='Something about yourself...'
                        onContentSizeChange={(event) => {
                            setTextHeight(event.nativeEvent.contentSize.height>120?event.nativeEvent.contentSize.height:120);
                        }}
                        maxLength={200}
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
                    <Location 
                        styles={styles} 
                        edit={edit}
                        location={location}
                        setLocation={setLocation}
                    />


                    {/* Languages */}
                    <Languages 
                        styles={styles} 
                        lang={lang} 
                        setLang={setLang} 
                        edit={edit}
                    />


                    {/* Religion */}
                    <Religion 
                        edit={edit} 
                        styles={styles} 
                        religion={religion} 
                        setReligion={setReligion} 
                    />

                    
                    <Batch
                        edit={edit}
                        styles={styles}
                        batch={batch}
                        setBatch={setBatch}
                    />

                    <Gender
                        edit={edit}
                        styles={styles}
                        gender={gender}
                        setGender={setGender}
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

                    <Sexuality
                        styles={styles}
                        setSexuality={setSexuality}
                        sexuality={sexuality}
                        edit={edit}
                    />  


                    {/* Pronouns */}
                    <Pronouns
                        styles={styles}
                        edit={edit}
                        pronoun={pronoun}
                        setPronoun={setPronoun}
                    />


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
                            onPress={logout}
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
                            onPress={() => deleteAccount()}
                        >
                            <Text style={styles.updateButtonText}>DELETE ACCOUNT</Text>

                        </TouchableOpacity>

                    </LinearGradient>

                </View>

            </View>

        </ScrollView>
        </>

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
        width: '100%',
        height: '100%',
        top:-1,
        resizeMode: 'cover',
        
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
        marginTop: 10,
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
