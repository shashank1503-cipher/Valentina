import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text>{message.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 234,
    height: 60,
    left: 137,
    alignItems: "flex-start",
    marginLeft: "auto",
    //top: 307px
    backgroundColor: "#FF9B7B",
    borderRadius: 20,
  },
});
export default SenderMessage;
