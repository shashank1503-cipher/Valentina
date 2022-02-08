import React, { useState, useEffect } from "react";
import {
  Platform,
  Keyboard,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import SenderMessage from "../../components/ChatComponents/SenderMessage";
import ReceiverMessage from "../../components/ChatComponents/ReceiverMessage";
import useAuth from "../../hooks/useAuth";
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy} from "@firebase/firestore";
import {db} from "../../firebase";
import getMatchedUserInfo from "../../libs/getMatchedUserInfo";
var AES = require("crypto-js/aes");

const MessageScreen = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const {params} = useRoute();
  const [input, setInput] = useState("");
  const matchDetails = params.matchDetails;  
  const name = getMatchedUserInfo(matchDetails.users, user.uid).name; 
  const image = getMatchedUserInfo(matchDetails.users,user.uid).image.profile_1 
  const [messages, setMessages] = useState([]);
  
  useEffect(
    ()=>
    onSnapshot(
      query(
        collection(db, 'matches', matchDetails.id, 'messages'), 
        orderBy('timestamp','asc')
      ), 
      (snapshot) => 
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }))
        )         
      ),
    [matchDetails,db]
  );

  //adding messages of matched users of the current logged in user to the firebase and updating the messages state
  const sendMessage = () => {     
      
      let currentDate = new Date();
      //let time = currentDate.getDate()+"/"+currentDate.getMonth()+"/"+currentDate.getFullYear() +"-"+currentDate.getHours() + ":" +((currentDate.getMinutes()<10?'0':'') + currentDate.getMinutes())+"-"+currentDate.getSeconds()+"-"+currentDate.getMilliseconds();
      //console.log(TS)
      //setTimeout(1); 
           
      var encrypted = AES.encrypt(input, matchDetails.id).toString();
      //console.log("input ",encrypted)
      addDoc(collection(db,"matches",matchDetails.id,"messages"),{
        timestamp: currentDate,
        userid: user.uid,
        displayName: user.displayName,
        message: encrypted,
        // imgURL: matchDetails.users[user.uid].image.profile_1, 
      });      
      setInput("")
      // this.ScrollView.scrollToEnd()  
  };

  return (
    <>      
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Image
          style={{ marginLeft: "2%", width: 45, height: 45,borderRadius:50 }}
          source={{uri:image}}
        />
        <Text style={styles.text}>{name.split(" ")[0]}</Text>
      </View>
      <ScrollView
        // behaviour={Platform.OS === "ios" ? "padding" : "height"}
        //keyboardVerticalOffset={10}
        showsVerticalScrollIndicator={true}
        // ref={ref => {this.ScrollView = ref}}        
      >
        <TouchableWithoutFeedback
          style={{
            height: '100%'
          }}
          onPress={Keyboard.dismiss} >
          <FlatList
            style={{ paddingHorizontal: 10, bottom: 0 }}     
            data={messages}
            // inverted={-1}
            renderItem={({ item: message }) =>
              message.userid == user.uid ? (
              <SenderMessage key={message.id} message={message} secretkey={matchDetails.id}/>):
              (<ReceiverMessage key={message.id} message={message} secretkey={matchDetails.id}/>)                
            }
          />
        </TouchableWithoutFeedback>
      </ScrollView>

      <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Type Something...."
            onChangeText={setInput}
            value={input}
            multiline={true}
          />
          <TouchableOpacity onPress={sendMessage}>
            <View>
              <Ionicons name="arrow-forward-circle" size={40} color="#FF4E8D" />
            </View>
          </TouchableOpacity>
      </View>

    </>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
    padding: 10,
    width: "100%",
    borderColor: '#aaa',
  },
  text: {
    fontFamily: "Roboto",
    fontWeight: "medium",
    fontSize: 24,
    display: "flex",
    flexDirection: "row",
    color: "black",
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "left",
  },
  footer: {
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius:2,
    elevation: 5,
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center'
  },
  input: {
    position: "relative",
    paddingHorizontal: 15,
    fontSize: 14,
    width: "80%",
    backgroundColor: "#FeFeFe",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default MessageScreen;
