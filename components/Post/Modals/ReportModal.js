import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth';

import { db } from '../../../firebase'
import { setDoc, doc, getDoc, getDocFromCache } from 'firebase/firestore'


const ReportModal = ({profUser}) => {

    console.log(profUser)

    const [reportModal, setReportModal] = useState(false)
    const [reportText, setReportText] = useState('')
    const [isReported, setIsreported] = useState(false)

    const { user } = useAuth()
    
    //console.log(props)

    useEffect( async () => {

            const docRef = doc(db, 'users', profUser.id, 'reports', user.uid)
            console.log(profUser.id)
            console.log(user.uid)
        
            const d = await getDoc(docRef)

            console.log("DOC DATA: ",d.data())

            if(d.data())
                setIsreported(true)
            else    
                setIsreported(false)

    }, [])


    const onPressHandler = (option) => {

        console.log(option)

        if(option === '0')
        {
            setReportModal(!reportModal)
            setReportText('');
        }

        else if(option === '1')
        {

            const setData = async () => {
                
                const data = await setDoc(doc(db, "users", profUser.id, "reports", user.uid),{"report":reportText})

                console.log(data);

                //console.log("1 down")

                // await setDoc(doc(db, "users", user.uid, "reports", props.id),{
                //     "report": {
                //         name: props.name,
                //         report: reportText
                //     }
                // })

                console.log("working")

                setReportModal(!reportModal)
                setReportText('')
            }

            setData();
        }

    }


    const func = async () => {

        setReportModal(true)
        setTimeout(()=>{
            setReportModal(false)
        }, 1000)


    }


    return (
        <>
            <TouchableOpacity
                onPress={() => isReported?func():setReportModal(!reportModal)}
            >
                <Text style={[styles.modalText, { color: "#FF0000" }]}>
                    Report
                </Text>
            </TouchableOpacity>

            
            <Modal
                animationType="fade"
                transparent={true}
                visible={reportModal}

                style={{
                    zIndex: 10
                }}

            >

                <View style={styles.centeredView}>

                    <View style={[styles.modalView]}>
                        
                            <TextInput
                                multiline={true}
                                numberOfLines={10}
                                editable={true}
                                selectTextOnFocus={true}
                                contextMenuHidden={true}
                                value={reportText}
                                selectionColor="#FF4E8C"
                                maxLength={200}
                                placeholder='type your report...'
                                onChangeText={text => setReportText(text)}
                                style={[styles.input, {
                                    display: isReported?'none':'flex'
                                }]}
                            />
                            

                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    width: '100%',
                                    bottom: 0,

                                }}
                                
                            >

                                <TouchableOpacity
                                    style={[styles.button,{
                                        backgroundColor: 'transparent',
                                        display: isReported?'none':'flex'
                                    }]}
                                    onPress={() => onPressHandler('1')}
                                >
                                    <Text
                                        style={{
                                            color: 'red'
                                        }}
                                    
                                    >
                                        submit
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button,{
                                        width: isReported?'100%':'50%'
                                    }]}
                                    onPress={() => onPressHandler('0')}
                                    disabled={isReported}

                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                        }}
                                    
                                    >
                            
                                        {isReported?"You have already reported this user":"cancel"}
                                    </Text>
                                </TouchableOpacity>

                            </View>

                       
                    </View>


                </View>



            </Modal>

        </>
    );
};

export default ReportModal;

const styles = StyleSheet.create({

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
        width:300,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        display: 'flex',
        flexDirection: 'column',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden'
    },

    modalText: {
        color:"#000",
        fontSize:17,
        marginBottom: 15,
    
    },

    input: {
        width: "90%",
        backgroundColor: 'rgb(250,250,250)',
        height: 100,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        textAlignVertical: 'top', 
        textAlign: 'left', 
        paddingVertical:14, 
        paddingHorizontal:10
    },

    button: {
        backgroundColor: 'red',
        width: '50%',
        display: 'flex',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }

})