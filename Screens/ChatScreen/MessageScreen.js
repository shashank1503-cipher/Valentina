import React, { useState } from "react";
import {
  Platform,
  Keyboard,
  Button,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TouchableHighlight,
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

const MessageScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  //messages fetched from firebase
  const [messages, setMessages] = useState([]);

  const { name } = params;

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
        behaviour={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <FlatList
              style={{ paddingLeft: 4 }}
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) =>
                messages.userId === user.id ? (
                  <SenderMessage key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              }
            />
          </>
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Type Something...."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <TouchableHighlight onPress={sendMessage}>
            <View>
              <Ionicons name="arrow-forward-circle" size={50} color="#FF4E8D" />
            </View>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    marginLeft: "5%",
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
  input: {
    paddingLeft: 10,
    //position: 'absolute',
    marginRight: "10%",
    width: 260,
    height: 50,
    //top: 50,
    backgroundColor: "#F1F1F1",
    borderColor: "#000000",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,
  },
});

export default MessageScreen;
