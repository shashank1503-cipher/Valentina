import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Header from "../components/Header/Header";
import Post from "../components/Post/Post";
import { Dimensions, FlatList, StatusBar, View } from "react-native";
import AppContext from "../context/AppContext";

import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import Skeleton from "../components/Skeleton/Skeleton";
const data = [
  {
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
        value: {
          feet: "5",
          inch: "11",
        },
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
    languages: ["English", "Hindi", "Punjabi"],
    interests: {
      main: ["Gaming", "Singing", "Dancing"],
      new: ["Photography", "Coding"],
    },
    profilePrompts: {
      "A pro and a con of dating me": "rhrhrh",
    },
  },
  {
    id: "2",
    name: "Gal Gadot",
    age: "28",
    batch: "2019",
    bio: " Hello, I am Gal Gadot from another universe for batch 2019. This is my sample bio if you are interested hit the like button, if not tilted plus is right below like button be free to hit that.",
    img: [
      "https://res.cloudinary.com/dpjf6btln/image/upload/c_crop,h_695,x_0,y_20/v1642499380/unsplash_VVEwJJRRHgk_b2xius.png",
      "https://res.cloudinary.com/dpjf6btln/image/upload/v1642499248/image_2_uysr6j.png",
      "https://res.cloudinary.com/dpjf6btln/image/upload/v1642505999/image_2_1_yohp3i.png",
    ],
    aboutStuff: [
      {
        type: "height",
        value: {
          feet: "5",
          inch: "11",
        },
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
    interests: {
      main: ["Gaming", "Singing", "Dancing"],
      new: ["Photography", "Coding"],
    },
    languages: ["English", "Hindi", "Punjabi"],
    profilePrompts: {
      "A pro and a con of dating me": "rhrhrh",
      "Perfect First Date": "y5hhth",
    },
  },
  {
    id: "3",
    name: "Wonder Woman",
    age: "104",
    batch: "2018",
    bio: "Hello, I am Diana Prince aka Wonder Woman. This is my sample bio if you are interested hit the like button, if not tilted plus is right below like button be free to hit that.knlnasdlkasdlansdklasndkln",
    img: [
      "https://res.cloudinary.com/dpjf6btln/image/upload/c_crop,h_695,x_0,y_20/v1642499380/unsplash_VVEwJJRRHgk_b2xius.png",
      "https://res.cloudinary.com/dpjf6btln/image/upload/v1642499248/image_2_uysr6j.png",
      "https://res.cloudinary.com/dpjf6btln/image/upload/v1642505999/image_2_1_yohp3i.png",
    ],
    languages: ["English", "Hindi", "Punjabi"],
    aboutStuff: [
      {
        type: "height",
        value: {
          feet: "5",
          inch: "11",
        },
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
    interests: {
      main: ["Gaming", "Singing", "Dancing"],
      new: ["Photography", "Coding"],
    },
    profilePrompts: {
      "A pro and a con of dating me": "rhrhrh",
      "Perfect First Date": "y5hhth",
    },
  },
];

const HomeScreen = () => {
  let navigation = useNavigation();
  let { user } = useAuth();
  let {
    headerState,
    HorizontalScrollViewRef,
    SetScrollViewRef,
    SetHeaderState,
  } = useContext(AppContext);
  let style = headerState ? "dark-content" : "light-content";
  StatusBar.setBarStyle(style, true);
  const [Profiles, setProfiles] = useState([]);
  let handleVerticalScroll = (e) => {
    SetHeaderState(0);
    // console.log(HorizontalScrollViewRef)
    // HorizontalScrollViewRef.current.scrollTo({x:0,animated:true})
  };

  useEffect(() => {
    let unsub;

    const fetchData = async () => {
      const dislikes = getDocs(
        collection(db, "users", user.uid, "dislikes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      

      console.log(dislikes);
      let dislikesUserIds = dislikes.length > 0 ? dislikes : ["test"];
        console.log(dislikesUserIds)
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...dislikesUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchData();

    return unsub;
  }, []);
  return (
    <View>
      <Header />

      {Profiles.length !== 0 ? (
        <FlatList
          data={Profiles}
          renderItem={({ item }) => (
            <Post
              uid={item.id}
              name={item.name}
              dob={item.dob}
              batch={item.batch}
              bio={item.bio}
              aboutStuff={item.aboutStuff}
              interests={item.interest}
              img={item.image}
              profilePrompts={item.profilePrompts}
              languages={item.languages}
            />
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={Dimensions.get("screen").height}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          ref={(ref) => {
            SetScrollViewRef(ref);
          }}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={true}
          bounces={true}
          onScroll={handleVerticalScroll}
        />
      ) : (
        <Skeleton />
      )}
    </View>
  );
};

export default HomeScreen;
