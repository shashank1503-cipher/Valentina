import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Chatlist from "../../components/ChatComponents/Chatlist";
import ChatScreenHeader from "./ChatScreenHeader";

const data = {
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
};

const ChatScreen = () => {
  const navigation = useNavigation();
  const handleMatchPress = () => {
    navigation.navigate("DisplayMatchedDetails", {
      name: data.name,
      age: data.age,
      batch: data.batch,
      bio: data.bio,
      aboutStuff: data.aboutStuff,
      interests: data.interests,
      img: data.img,
    });
  };
  return (
    <SafeAreaView>
      <ChatScreenHeader title="Matches" />
      <View style={styles.container}>
        <TouchableOpacity style={styles.image} onPress={handleMatchPress}>
          <Image source={require("../../assets/matched0.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.image}>
          <Image source={require("../../assets/matched1.png")} />
        </TouchableOpacity>
      </View>
      <View style={{alignItems: "center"}}>
        <Text style={styles.text}>Messages</Text>
        <Chatlist />
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
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
});

export default ChatScreen;
