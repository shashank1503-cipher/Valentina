import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import getMatchedUserInfo from "../../libs/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  //console.log(matchDetails);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);  

  useEffect(() => {
      setMatchedUserInfo(getMatchedUserInfo(matchDetails.users,user.uid));
      
  },[matchDetails, user]);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Message", {matchDetails})}
    >
      <Image source={require("../../assets/matched1.png")} />
      <View>
        <Text style={styles.text}>{matchedUserInfo?.name}</Text>
        <View style={styles.smallt}>
          <Text style={{textAlign: "left" }}>Is your body from Mcdonalds</Text>
          <Text style={{paddingLeft: "10%", textAlign: "right" }}>11:30</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginLeft: "5%",
    marginTop: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 18,
    display: "flex",
    flexDirection: "row",
    color: "black",
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "left",
  },
  smallt: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Roboto",
    color: "black",
    marginLeft: 10,
    fontSize: 10,
  },
});

export default ChatRow;
