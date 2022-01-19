import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Post from "../components/Post/Post";
import { Dimensions, FlatList, StatusBar, View } from "react-native";
import AppContext from "../context/AppContext";

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
  },
  {
    id: "3",
    name: "Wonder Woman",
    age: "104",
    batch: "2018",
    bio: " Hello, I am Diana Prince aka Wonder Woman. This is my sample bio if you are interested hit the like button, if not tilted plus is right below like button be free to hit that.",
    img: [
      "https://res.cloudinary.com/dpjf6btln/image/upload/c_crop,h_695,x_0,y_20/v1642499380/unsplash_VVEwJJRRHgk_b2xius.png",
      "https://res.cloudinary.com/dpjf6btln/image/upload/v1642499248/image_2_uysr6j.png",
      "https://res.cloudinary.com/dpjf6btln/image/upload/v1642505999/image_2_1_yohp3i.png",
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
  },
];

const HomeScreen = () => {
  // const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  let { headerState, HorizontalScrollViewRef, SetScrollViewRef,SetHeaderState } = useContext(AppContext);
  let style = headerState ? "dark-content" : "light-content";
  StatusBar.setBarStyle(style, true);
  let handleVerticalScroll = (e) => {
        SetHeaderState(0)
        // console.log(HorizontalScrollViewRef)
        // HorizontalScrollViewRef.current.scrollTo({x:0,animated:true})

  };
  return (
    <View>
      <Header />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Post
            name={item.name}
            age={item.age}
            batch={item.batch}
            bio={item.bio}
            aboutStuff={item.aboutStuff}
            interests={item.interests}
            img={item.img}
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
    </View>
  );
};

export default HomeScreen;
