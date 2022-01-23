import React, { useState } from "react";
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
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const MessageScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [input, setInput] = useState("");

  //const [messages, setMessages] = useState([]);

  const { name } = params;
  // static messages, will be replaced by realtime messages from firebase with the help message state
  const [messages, setMessages] = useState([   
    {
        timestamp: "Today 12:05",
        userid: "0",
        id: "e",
        message: "Can I follow you? Cause my mom told me to follow my dreams...",
      },
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: "I’m not a hoarder but I really Loream ipls",
    },   
    {
      timestamp: "Today 12:10", 
      userid: "1",
      id: "a",
      message: " Loream ipls",
    },   
    
  ]);
  //adding messages of matched users of the current logged in user to the firebase and updating the messages state
  const sendMessage = () => {

    if(!input)
      return;

    const message = {
      message: input,
      userid: '0',
      id: 'e',
      timestamp: 'Today 12:30'
    }
    setMessages(m => [...m, message])
    
    setInput("")

    this.ScrollView.scrollToEnd()

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
          style={{ marginLeft: "10%", width: 35, height: 35 }}
          source={require("../../assets/matched1.png")}
        />
        <Text style={styles.text}>{name}</Text>
      </View>

      <ScrollView
        // behaviour={Platform.OS === "ios" ? "padding" : "height"}
        //keyboardVerticalOffset={10}
        showsVerticalScrollIndicator={true}
        ref={ref => {this.ScrollView = ref}}
        
      >
        <TouchableWithoutFeedback
          style={{
            height: '100%'
          }}
          onPress={Keyboard.dismiss} >
          <FlatList
            style={{ paddingHorizontal: 10, bottom: 0 }}     
            data={messages}
            
            renderItem={({ item: message }) => 
              message.userid == "0" ? (<SenderMessage key={message.id} message={message}/>):(<ReceiverMessage key={message.id} message={message}/>)                
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
    shadowOffset: { width: 10, height: 10},
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
