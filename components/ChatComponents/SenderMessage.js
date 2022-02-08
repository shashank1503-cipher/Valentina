import React from "react";
import { View, Text, StyleSheet } from "react-native";
var CryptoJS = require("crypto-js");

const SenderMessage = ({ message, secretkey }) => {  
  var myDate = new Date(message.timestamp.seconds*1000);
  //console.log("data", secretkey)
  let time = myDate.toString().split(' ')[4]?.slice(0,5)
  var decrypted = CryptoJS.AES.decrypt(message.message, secretkey); 
  var msg = decrypted.toString(CryptoJS.enc.Utf8);
  //console.log(msg)
  return (
     <>
        <Text style={{textAlign:"center",paddingBottom: "5%", color: "#B9B9B9"}}>{time}</Text>
        <View style={styles.container}>        
            <Text style={{color:"white"}}>{msg.trim()}</Text>
        </View>
     </> 
    
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    position: "relative",    
    alignItems: "flex-start",
    marginLeft: "auto",    
    padding: 10,
    marginBottom: '5%',
    width: "60%",
    //top: 307px
    backgroundColor: "#FF9B7B",
    borderRadius: 20,
  },
});
export default SenderMessage;
