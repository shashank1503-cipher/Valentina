import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Chatlist from "../../components/ChatComponents/Chatlist";
import ChatScreenHeader from "./ChatScreenHeader";

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <ChatScreenHeader title="New Matches" type="1" />
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/matched0.png")}
        />
        <Image
          style={styles.image}
          source={require("../../assets/matched1.png")}
        />
      </View>
      <Text style={styles.text}>Messages</Text>
      <Chatlist />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginLeft: "7%",
  },
  text: {
    fontSize: 18,
    color: "black",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ChatScreen;
