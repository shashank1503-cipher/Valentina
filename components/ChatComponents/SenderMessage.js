import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SenderMessage = ({ message }) => {  
  return (
     <>
        <Text style={{textAlign:"center",paddingBottom: "5%", color: "#B9B9B9"}}>{message.timestamp}</Text>
        <View style={styles.container}>        
            <Text style={{color:"white"}}>{message.message}</Text>
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
