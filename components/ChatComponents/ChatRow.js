import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import getMatchedUserInfo from "../../libs/getMatchedUserInfo";
import { collection, onSnapshot, query, orderBy } from "@firebase/firestore";
import { db } from "../../firebase";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  const [lastMessage, setLastMessage] = useState({
    message: [],
    timestamp: [],
  });

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          // console.log(snapshot.docs[0].data());
          setLastMessage({
            message: snapshot.docs[0]?.data()?.message,
            timestamp: snapshot.docs[0]?.data()?.timestamp.split("-")[1],
          });
        }
      ),
    
    [matchDetails, user]
  );
  const image = getMatchedUserInfo(matchDetails.users,user.uid).image.profile_1 
console.log(image)
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Message", { matchDetails })}
    >
      <Image
        style={{ width: 45, height: 45,borderRadius:50 }}
        source={{uri:image}}
      />
      <View>
        <Text style={styles.text}>{matchedUserInfo?.name}</Text>
        <View style={styles.smallt}>
          <Text style={{ textAlign: "left",width:"75%" }}>
            {lastMessage.message ?lastMessage.message.length > 10
              ? lastMessage.message.slice(0,10)+"..."
              : lastMessage.message || "Say Hi!" : "Say Hi!"}
            
          </Text>
          <Text style={{ textAlign: "right" }}>
            {lastMessage.timestamp}
          </Text>
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
    left: 25,
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 18,
    display: "flex",
    left: 7,
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
    // width: "65%",
    //fitWidth: true,
    marginLeft: 7,
    fontSize: 10,
    // justifyContent:"space-between"
  },
});

export default ChatRow;
