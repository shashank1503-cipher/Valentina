import { View, Text, FlatList, Image, TouchableOpacity,StyleSheet,Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import getMatchedUserInfo from "../../libs/getMatchedUserInfo";
import { useNavigation } from "@react-navigation/native";

const Match = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  //console.log(matches[0].users)
  //console.log(matchDetails);
  /*const data = {
    id: "1",
    name: "Gal",
    age: "27",
    batch: "2020",
    bio: " Hello, I am Gal Gadot. This is my sample bio if you are interested hit the like button, if not tilted plus is right below like button be free to hit that.",
    img: [
      "https://res.cloudinary.com/dpjf6btln/image/upload/c_crop,h_695,x_0,y_20/v1642499380/unsplash_VVEwJJRRHgk_b2xius.png",
      "https://res.cloudinary.com/dpjf6btln/image/upload/v1642499248/image_2_uysr6j.png",
      "",
    ],
    aboutStuff: [
      {
        type: "height",
        value: "5'11",
      },
      {
        type: "location",
        value: "Lucknow",
      },
      {
        type: "dob",
        value: "2002",
      },
      {
        type: "star_sign",
        value: "Capricorn",
      },
      {
        type: "religion",
        value: "Christian",
      },
      {
        type: "looking_for",
        value: "Men",
      },
      {
        type: "pronouns",
        value: "She/Her",
      },
    ],
    interests: ["Photography", "Coding", "Gaming", "Singing", "Dancing"],
  };*/
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  //console.log(matchedUserInfo)

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
    console.log(matchedUserInfo);
  }, [matchDetails, user]);
  let Interests, Imgs;

  //let keys = Object.keys(matchedUserInfo)
  //console.log(keys)

  let dt = new Date();
  const getAge = () => {
    var parts = matchedUserInfo.dob.split("/");
    var dob = new Date(parts[2], parts[1] - 1, parts[0]);
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format
    var age_dt = new Date(month_diff);

    //extract year from date
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user
    var age = Math.abs(year - 1970);
    return age;
  };
  const handleMatchPress = () => {
    let batch = "";
    if (
      matchedUserInfo.aboutStuff.filter((map) => map.type === "batch")
        .length !== 0
    ) {
      batch = matchedUserInfo.aboutStuff.filter(
        (map) => map.type === "batch"
      )[0]["value"];
    }
    navigation.navigate("DisplayMatchedDetails", {
      mid: matchDetails.id,
      id: matchedUserInfo.id,
      name: matchedUserInfo.name,
      age: getAge(),
      batch: batch,
      bio: matchedUserInfo.bio,
      aboutStuff: matchedUserInfo.aboutStuff,
      interests: matchedUserInfo.interest.main,
      img: matchedUserInfo.image,
      profilePrompts: matchedUserInfo.profilePrompts,
      email: matchedUserInfo?.email,
      languages: matchedUserInfo?.languages,
    });
  };

  return (
    //console.log(matchedUserInfo)
    <View>
      <TouchableOpacity style={{ marginLeft: "7%" }} onPress={handleMatchPress}>
        <Image
          style={{ width: 45, height: 45, borderRadius: 50 }}
          source={{ uri: matchedUserInfo?.image.profile_1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Match;
