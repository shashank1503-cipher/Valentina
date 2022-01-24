import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreenHeader = ({ title}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "4%",
    // marginRight: "35%",
    display: "flex",
    flexDirection: "row",
    alignItems:'center',
  },
  text: {
    fontSize: 18,
    color: "black",
    marginRight: "41%",
    marginTop: "5%",
    fontWeight: "bold",
    textAlign: "center",
  },
  iconWrapper: {
    //marginLeft:20,
    marginLeft: "5%",
    marginRight: "auto",
  },
});

export default ChatScreenHeader;
