import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react'
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
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Languages from './profilePageModals/Languages'
import Height from './profilePageModals/Height'
import Interests from './profilePageModals/Interests'
import StarSign from './profilePageModals/StarSign'
import LookingFor from './profilePageModals/LookingFor'



const ProfilePage = () => {

    const [name, setName] = useState("fnifn ejfenf");
    const [mnumber, setmnumber] = useState("783xxxxx58");
    const [edit, setEdit] = useState(false);
    const [textField, setTextField] = useState();
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

    const [starSign, setStarSign] = useState('')

    const [containerHeight, setContainerHeight] = useState(1700)
    const colors = [ "#FF9B7B", "#FF4E8C"];
   
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("")
    const [promptValue, setPromptValue] = useState("")

    const [data, setData] = useState();
        
    const [items, setItems] = useState([
        {label: "If you laugh at this, we'll get along...", value: "If you laugh at this, we'll get along..."},
        {label: 'Perfect fist date...', value: 'Perfect fist date...'},
        {label: 'A pro and a con of dating me...', value: 'A pro and a con of dating me...'},
        {label: 'Something I learned way later than I should have...', value: 'Something I learned way later than I should have...'},
        {label: "When no one's watching I...", value: "When no one's watching I..."}
    ]);


    const exportData = () => {
        const data = {
            bio: textField,
            profilePrompt: prompt,
            profilePromptValue: promptValue,
            interest: interests,
            lookingFor: look,
            languages: lang,
            height: height,
            starSign: starSign
        }

        console.log(JSON.stringify(data))
        
    }


    return (
        <>

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
                        <Image source={require("../../assets/test-pic.jpg")} style={styles.profilePic} />
                    </View>

                </View>

            {/* Profile Picture Change Button */}
                <TouchableOpacity style={styles.button}>
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

            {/* Account Details Container */}
                <View style={styles.account}>
                    
                    <View style={styles.detailBox}>
                        <Text style={styles.accountHeader}>Account Settings</Text>
                        
                        {!edit?
                            <TouchableOpacity onPress={() =>{setEdit(true)}}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() =>{setEdit(false);exportData()}}>
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
                            // onChangeText={name => setName(name)}
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
                            // onChangeText={mnumber => setmnumber(mnumber)}
                            editable={false}
                            // selectTextOnFocus={edit}
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
                            // onChangeText={email => setEmail(email)}
                            editable={false}
                            // selectTextOnFocus={edit}
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
                            setTextHeight(event.nativeEvent.contentSize.height>100?event.nativeEvent.contentSize.height:100);
                        }}
                        onChangeText={text => setTextField(text)}
                        style={[styles.input, {height:textHeight, textAlignVertical: 'top', textAlign: 'left', paddingVertical:14, paddingHorizontal:10}]}
                    />

                    <Text style={styles.accountHeader}>My Profile Prompts</Text>
                    
                    {/* Profile Prompt DropDown */}
                    <DropDownPicker
                        open={open}
                        value={prompt}
                        items={items}
                        setOpen={setOpen}
                        setValue={setPrompt}
                        setItems={setItems}
                        autoScroll={true}
                        style={styles.input}
                        labelStyle={{
                            fontWeight: "bold"
                        }}
                        
                        closeAfterSelecting={true}
                        listMode="SCROLLVIEW"
                        dropDownDirection='down'
                        disabled={!edit}
                        dropDownContainerStyle={{
                            
                            borderWidth: 2,
                            borderColor: "#DDDDDD",
                            borderRadius: 10,
                            backgroundColor: "#EFEFEF",
                            width:"90%",
                            marginHorizontal:"5%",
                        }}
                        
                    />


                    <TextInput 
                        placeholder='Profile Prompt'
                        style={styles.input}
                        value={promptValue}
                        selectionColor="#FF4E8C"
                        onChangeText={pv => setPromptValue(pv)}
                        editable={edit}
                        selectTextOnFocus={edit}
                    />


                    <Text style={styles.accountHeader}>My Basics</Text>
                    
                    {/* Location */}
                    <TouchableOpacity style={styles.basicOption}>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexGrow: 1,
                        }}>
                            <Icon name="location" style={{
                                marginRight:10,
                                marginTop:4
                            }} size={20} color="#222"/>
                            <Text style={styles.basicText}>Location</Text>
                        </View>

                        <Icon name="chevron-forward" style={{
                            marginRight:8,
                            marginTop:6
                        }} size={18} color="#333"/>

                    </TouchableOpacity>

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
                    <Languages styles={styles} lang={lang} setLang={setLang} edit={edit}/>


                     {/* Home */}
                     <TouchableOpacity style={styles.basicOption}>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexGrow: 1,
                        }}>
                            <Icon name="home" style={{
                                marginRight:10,
                                marginTop:4
                            }} size={20} color="#222"/>
                            <Text style={styles.basicText}>Hometown</Text>
                        </View>


                        <Icon name="chevron-forward" style={{
                            marginRight:8,
                            marginTop:6
                        }} size={18} color="#333"/>

                    </TouchableOpacity>


                    <Text style={styles.accountHeader}>More about me</Text>
                    
                    {/* Height */}
                    <Height styles={styles} height={height} setHeight={setHeight} height={height} edit={edit}/>


                    {/* Star Sign */}
                    <StarSign styles={styles} starSign={starSign} setStarSign={setStarSign} edit={edit}/>


                    {/* Looking For */}
                    <LookingFor styles={styles} setLook={setLook} edit={edit}/>


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

                    <Text style={styles.accountHeader}>Interests</Text>

                    {/* Interest Field */}
                    <Interests styles={styles} interests={interests} setInterests={setInterests} edit={edit}/>

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
        marginTop: 20
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
