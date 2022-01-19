import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ReceiverMessage = ({ message }) => {
  //console.log(message);
  return (
    <View style={styles.recieve}>
      <Image style={{width: 41, height: 41}} source={require("../../assets/matched1.png")} />
      <View style={styles.container}>      
        <Text>{message.message}</Text>      
      </View>
    </View>      
    
  );
};

const styles = StyleSheet.create({
  recieve:{
    display: "flex",
    flexDirection: "row",
  },
  container: {
    fontSize: 14,    
    position: "relative",     
    padding: 10,
    textAlign: "justify",
    width: "60%",   
    //top: 307px
    backgroundColor: "#B9B0B0",
    borderRadius: 20,
  },
});
export default ReceiverMessage;
