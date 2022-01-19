import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecieverMessage = ({ message }) => {
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
    left: 74,
    //top: 307px
    backgroundColor: "#F1F1F1",
    borderRadius: 20,
  },
});
export default RecieverMessage;
