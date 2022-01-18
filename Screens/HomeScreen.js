import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Post from "../components/Post/Post";
import { Dimensions, FlatList } from "react-native";
import AppContext from "../context/AppContext";

const data = [
  {
    id: "1",
    name: "Gal",
    age: "27",
    batch: "2020",
    bio:" Hello, I am Gal Gadot. This is my sample bio if you are interested hit the like button, if not tilted plus is right below like button be free to hit that.",
    aboutStuff:[
      {
        type:"height",
        value:"5'11"
      },
      {
        type:"location",
        value:"Lucknow"
      },
      {
        type:"dob",
        value:"2002"
      },
      {
        type:"star_sign",
        value:"Capricorn"
      },
      {
        type:"religion",
        value:"Christian"
      },
      {
        type:"looking_for",
        value:"Men"
      },
      {
        type:"pronouns",
        value:"She/Her"
      }
    ]
  },
  {
    id: "2",
    name: "Gal Gadot",
    age: "28",
    batch: "2019",
    bio:" Hello, I am Gal Gadot from another universe for batch 2019. This is my sample bio if you are interested hit the like button, if not tilted plus is right below like button be free to hit that.",
    aboutStuff:[
      {
        type:"height",
        value:"5'11"
      },
      {
        type:"location",
        value:"Lucknow"
      },
      {
        type:"dob",
        value:"2002"
      },
      {
        type:"star_sign",
        value:"Capricorn"
      },
      {
        type:"religion",
        value:"Christian"
      },
      {
        type:"looking_for",
        value:"Men"
      },
      {
        type:"pronouns",
        value:"She/Her"
      }
    ]
  },
  {
    id: "3",
    name: "Wonder Woman",
    age: "104",
    batch: "2018",
    bio:" Hello, I am Diana Prince aka Wonder Woman. This is my sample bio if you are interested hit the like button, if not tilted plus is right below like button be free to hit that.",
    aboutStuff:[
      {
        type:"height",
        value:"5'11"
      },
      {
        type:"location",
        value:"Lucknow"
      },
      {
        type:"dob",
        value:"2002"
      },
      {
        type:"star_sign",
        value:"Capricorn"
      },
      {
        type:"religion",
        value:"Christian"
      },
      {
        type:"looking_for",
        value:"Men"
      },
      {
        type:"pronouns",
        value:"She/Her"
      }
    ]
  },
];

const HomeScreen = () => {
  
  let {SetHeaderState,ScrollViewRef} = useContext(AppContext)
  let handleVerticalScroll = () => {
    SetHeaderState(0)
    ScrollViewRef.current.scrollTo({
      x: 0,
    });
  }
  return (
    <SafeAreaView>
      
        <Header />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Post name={item.name} age={item.age} batch={item.batch} bio={item.bio} aboutStuff={item.aboutStuff} />
          )}
          showsVerticalScrollIndicator={false}
          snapToInterval={Dimensions.get("window").height}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          onScroll={handleVerticalScroll}
        />
        {/* <Post /> */}
        <Footer />
    </SafeAreaView>
  );
};

export default HomeScreen;
