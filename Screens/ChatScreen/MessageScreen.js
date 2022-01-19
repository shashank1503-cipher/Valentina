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
  const messages = [   
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
    
  ];
  //adding messages of matched users of the current logged in user to the firebase and updating the messages state
  const sendMessage = () => {};

  return (
    <SafeAreaView>
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
      <KeyboardAvoidingView
        behaviour={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
          <FlatList
            style={{ paddingLeft: 4 }}  
            //inverted={-1}       
            data={messages}            
            renderItem={({ item: message }) => 
              message.userid == "0" ? (<SenderMessage key={message.id} message={message}/>):(<ReceiverMessage key={message.id} message={message}/>)                
            }
          />
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Type Something...."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableOpacity onPress={sendMessage}>
            <View>
              <Ionicons name="arrow-forward-circle" size={60} color="#FF4E8D" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    marginLeft: "5%",
    paddingBottom: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
    marginTop: "120%",
    marginLeft: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    paddingLeft: 10,
    position: "relative",
    fontSize: 14,
    marginRight: "10%",
    width: "72%",
    height: 50,
    //top: "80%",
    backgroundColor: "#F1F1F1",
    borderColor: "#000000",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,
  },
});

export default MessageScreen;
