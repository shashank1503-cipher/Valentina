import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import getMatchedUserInfo from "../../libs/getMatchedUserInfo";
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { db } from "../../firebase";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  console.log("Hello",matchDetails.id);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);  

  const [lastMessage, setLastMessage] = useState({});
  

  useEffect(() => {
      setMatchedUserInfo(getMatchedUserInfo(matchDetails.users,user.uid));
      
  },[matchDetails, user]);

  useEffect(() => 
    onSnapshot(
      query(
        collection(db,"matches",matchDetails.id,"messages"),
        orderBy("timestamp","desc"),
      ), snapshot =>{
        console.log(snapshot.docs[0].data());
        setLastMessage({
          message: snapshot.docs[0]?.data()?.message,
          timestamp: snapshot.docs[0]?.data()?.timestamp.split("-")[1],
        })
      } 
    ),
    [matchDetails, user]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Message", {matchDetails})}
    >
      <Image style={{left: 0}}source={require("../../assets/matched1.png")} />
      <View>
        <Text style={styles.text}>{matchedUserInfo?.name}</Text>
        <View style={styles.smallt}>
          <Text style={{textAlign: "left"}}>{lastMessage.message.length>10?(lastMessage.message.slice(10)):(lastMessage.message)||"Say Hi!"}</Text>
          <Text style={{left:200,textAlign: "right"}}>{lastMessage.timestamp||"No time"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginLeft: "5%",
    //position:"relative",
    marginTop: "5%",
    display: "flex",
    flexDirection: "row",  
    left:25,  
    alignItems:"flex-start",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 18,
    display: "flex",
    left:7,
    flexDirection: "row",
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
  },
  smallt: {
    display: "flex",
    flexDirection: "row",
    fontFamily: "Roboto",
    color: "black",
    //width: "100%",
    //fitWidth: true,
    left: 7,
    fontSize: 10,
  },
});

export default ChatRow;
