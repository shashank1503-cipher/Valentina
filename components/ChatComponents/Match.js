import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import getMatchedUserInfo from "../../libs/getMatchedUserInfo";
import { useNavigation } from "@react-navigation/native";

const Match = ({ matchDetails }) => {
  
  const navigation = useNavigation();
  const { user } = useAuth();

  console.log(matchDetails)

  //matchDetails = JSON.parse(matchDetails);

  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo((getMatchedUserInfo(matchDetails.users, user.uid)));
    console.log(matchedUserInfo);
  }, [matchDetails, user]);

  //let keys = Object.keys(matchedUserInfo)
  //console.log(keys)

  let dt = new Date();
  const handleMatchPress = () => {
    navigation.navigate("DisplayMatchedDetails", {
      name: matchedUserInfo.name,
      age: dt.getFullYear() - matchedUserInfo.dob.slice(-4),
      batch: matchedUserInfo.batch,
      bio: matchedUserInfo.bio,
      aboutStuff: matchedUserInfo.aboutStuff,
      interests: matchedUserInfo.interest.main,
      img: matchedUserInfo.image,
    });
  };

  return (
    //console.log(matchedUserInfo)
    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={handleMatchPress}>
      <Image source={require("../../assets/matched1.png")} />
    </TouchableOpacity>
  );
};

export default Match;
