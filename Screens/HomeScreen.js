import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Header from "../components/Header/Header";
import Post from "../components/Post/Post";
import { Dimensions, FlatList, StatusBar, Text, View } from "react-native";
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
} from "@firebase/firestore";
import { db } from "../firebase";
import Skeleton from "../components/Skeleton/Skeleton";
import NoMoreProfile from "./LikeScreen/NoMoreProfile";
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
  
];

const HomeScreen = () => {
  let navigation = useNavigation();
  let { user } = useAuth();
  let {
    headerState,
    HorizontalScrollViewRef,
    SetScrollViewRef,
    SetHeaderState,
    totalProfiles,
    setTotalProfiles
  } = useContext(AppContext);
  let style = headerState ? "dark-content" : "light-content";
  StatusBar.setBarStyle(style, true);
  const [Profiles, setProfiles] = useState([]);
  const [Loading,setLoading] = useState(true)
  let handleVerticalScroll = (e) => {
    SetHeaderState(0);
    // console.log(HorizontalScrollViewRef)
    // HorizontalScrollViewRef.current.scrollTo({x:0,animated:true})
  };
  useLayoutEffect(
    () => 
      onSnapshot(doc(db,'users', user.uid),(snapshot) => {
        if(!snapshot.exists()){
          navigation.navigate("What's in the name tho?");
        }
        else{
          let image = snapshot.get("image")
          if(image){
            if(image["background"] === "null" || image["profile_1"] === "null" || image["profile_2"] === "null"){
              navigation.navigate("Photo")
            }
          }
          
        }
      }),
    []
  );
  
  useLayoutEffect(() => {
    let unsub;
    let dislikes = [];
    const fetchData = async () => {
      const dislikesSnapshot = await getDocs(
        collection(db, "users", user.uid, "dislikes")
      )
      dislikesSnapshot.forEach((doc) =>{
        let id = doc.id
        dislikes.push(id)
      })
      let dislikesUserIds = dislikes.length > 0 ? dislikes : ["test"];
      //console.log(Profiles.forEach((profile) => console.log(profile.id)));
      const userDetails = await getDoc(doc(db,"users",user.uid))
      // const getAboutStuff = await userDetails.get("aboutStuff")
      // const getPreference =  await getAboutStuff[0]["value"]
      const getPreference = userDetails.get("aboutStuff")[1].value
      console.log(getPreference)
      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...dislikesUserIds]),
          where("gender","==",getPreference)
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
          setLoading(false)
          setTotalProfiles(Profiles.length)
        }
      );
    };

    fetchData();
    return unsub;
  }, []);
  useLayoutEffect(() => {
    if(Profiles.length === 0){
      SetHeaderState(1)
    }
    else{
      SetHeaderState(0)
    }
    
    
  }, [Profiles]);
  
  return (
    <View>
      <Header/>
      {!Loading ? Profiles.length !== 0 ? (
        <FlatList
          data={Profiles}
          renderItem={({ item }) => (
            <Post
              profUser = {item}
              TotalProfiles = {Profiles.length}
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
          extraData={Profiles}
        />
      ) : (
       
       <NoMoreProfile/>
      ) :  <Skeleton />}
     
    </View>
  );
};

export default HomeScreen;
