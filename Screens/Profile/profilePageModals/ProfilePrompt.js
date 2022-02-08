import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Ionicons'

const ProfilePrompt = ({ styles , profilePrompts , setProfilePrompts , edit }) => {

    const [ open, setOpen ] = useState(false)
    const [prompt, setPrompt] = useState("")
    const [promptValue, setPromptValue] = useState("")
    const [size, setSize] = useState(0)

    const items = [
        {label: "If you laugh at this, we'll get along...", value: "If you laugh at this, we'll get along..."},
        {label: 'Perfect first date...', value: 'Perfect fist date...'},
        {label: 'A pro and a con of dating me...', value: 'A pro and a con of dating me...'},
        {label: 'Something I learned way later than I should have...', value: 'Something I learned way later than I should have...'},
        {label: "When no one's watching I...", value: "When no one's watching I..."}
    ]


    const func = () => {
       
        if(size === 2)
        {
            // console.log(size)
            return
        }

        profilePrompts[prompt] = promptValue

        setProfilePrompts(e => ({
            ...e
        }))
        
        // console.log(profilePrompts)

        setSize(Object.keys(profilePrompts).length)

        setPromptValue('')
        setPrompt('')

    }

    const updateProfilePrompt = (e) => {

        delete profilePrompts[e];

        setProfilePrompts(s => ({
            ...s
        }))

        setSize(Object.keys(profilePrompts).length)

    }

    return (
        <>

            <View>
            {
                Object.keys(profilePrompts).map((key, label) => {

                    return (
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                                alignItems: 'center',
                                backgroundColor: '#efefef',
                                borderRadius: 10,
                                borderColor: '#dddddd',
                                borderWidth: 1
                            }}
                            key={key}
                        >

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >

                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >{key}</Text>
                                
                                <Text>{profilePrompts[key]}</Text>

                            </View>

                            <TouchableOpacity
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 15,
                                    backgroundColor: '#f22',
                                    display:edit?'flex':'none'
                                    
                                }}

                                onPress={() => updateProfilePrompt(key)}
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
                    )
                })
            }
            </View>

            {
                (size<2)?
                
                <>
                    <DropDownPicker
                        open={open}
                        value={prompt}
                        items={items}
                        setOpen={setOpen}
                        setValue={setPrompt}
                        autoScroll={true}
                        
                        style={[styles.input,{
                            
                        }]}
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
                        style={[styles.input,{
                            display:!prompt?'none':'flex'
                        }]}
                        value={promptValue}
                        selectionColor="#FF4E8C"
                        onChangeText={pv => setPromptValue(pv)}
                        editable={edit}
                        selectTextOnFocus={edit}
                        onSubmitEditing={() => func()}
                    />

                </>:<></>
            }

        </>
    )
}

export default ProfilePrompt
