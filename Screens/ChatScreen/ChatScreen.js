import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Chatlist from "../../components/ChatComponents/Chatlist";
import ChatScreenHeader from "./ChatScreenHeader";
import useAuth from "../../hooks/useAuth";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../firebase";
import getMatchedUserInfo from "../../libs/getMatchedUserInfo";
import MatchList from "../../components/ChatComponents/MatchList";

const ChatScreen = () => {
  const navigation = useNavigation();

  const { user } = useAuth();
  const [matches, setMatches] = useState([]);

  useEffect(
    //code to fetch matches from firebase
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),

    [user]
  );
  //console.log(matches);
  return (
    <SafeAreaView>
      {matches.length ? (
        <>
          <ChatScreenHeader title="Matches" />
          <View style={styles.container}>
            <MatchList matches={matches} />
          </View>
          <View>
            <Text style={styles.text}>Messages</Text>
            <Chatlist matches={matches} />
          </View>
        </>
      ) : (
        <View style={styles.centered}>
          <Text>No Matches Found T_T</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    position: 'relative',
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
  centered: {
    width: "100%",
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    textAlign:"center",
    alignItems:"center"
  },
});

export default ChatScreen;
