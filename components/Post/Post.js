import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import styles from "./PostStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AppContext from "../../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import Interest from "../Interest/Interest";
import DoubleClick from "../DoubleClick/DoubleClick";
import useAuth from "../../hooks/useAuth";
import { deleteDoc, doc, DocumentSnapshot, getDoc, setDoc, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../../firebase";
import ReportModal from "./Modals/ReportModal";
import generateId from "../../libs/generateId";
import { useNavigation } from "@react-navigation/native";
const Post = ({profUser}) => {
  console.log(profUser)
  let { user } = useAuth();
  let navigation = useNavigation();
  const { changeHeader, ScrollViewRef, SetHorizontalScrollViewRef } =
    useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const onLikePress = () => {
    let personUID = profUser.id
    if(!isLiked){
      const loggedInProf = async() => await (await getDoc(doc(db, "users",user.uid))).data();
      
      let loggedInProfile = loggedInProf();
      const mid = generateId(user.uid,personUID);
      getDoc(doc(db,'users',personUID,'likes',user.uid)).then(
        (documentSnapshot) =>{   

          if(documentSnapshot.exists()){
            // user already liked you
            console.log("You matched with ",profUser.name)
            setDoc(doc(db,"users",user.uid,"likes",personUID),{"id":personUID,"displayName":profUser.name})
            console.log(loggedInProfile._W)
            console.log(profUser)
            //create matches                 
            setDoc(doc(db, "matches",mid),{
              users:{
                [user.uid]: loggedInProfile._W,
                [personUID]: profUser
              },                  
              usersMatched: [user.uid, personUID],
              timestamp: serverTimestamp(),          
            });   
            navigation.navigate("MatchScreen", {
              loggedInProfile,
              profUser
            });
          }else{
            console.log("You liked ",profUser.name)
            setDoc(doc(db,"users",user.uid,"likes",personUID),{"id":personUID,"displayName":profUser.name})
          } 
        }
      );         
    }
    else{
      deleteDoc(doc(db,"users",user.uid,"likes",personUID))
    }
    setIsLiked(isLiked ? false : true);
    
  };
  const onDoubleTap = () => {
    let personUID = profUser.uid
    setIsLiked(true);
    if (!isLiked){
      setDoc(doc(db,"users",user.uid,"likes",personUID),{"id":personUID})
    }
    
  };
  const onDisLikePress = () => {
    let personUID = profUser.uid
    setDoc(doc(db,"users",user.uid,"dislikes",personUID),{"id":personUID})
    if (isLiked){
      deleteDoc(doc(db,"users",user.uid,"likes",personUID))
      setIsLiked(false)
    }
  };
  const [modalVisible, setModalVisible] = useState(false);
  const onReportPress = () => {
    setModalVisible(!modalVisible);
  };

  const emojiMap = {
    height: "📏",
    location: "📍",
    religion: "🛐",
    dob: "📅",
    star_sign: "🔯",
    looking_for: "🧑",
    pronoun: "🏳️‍🌈",
    language: "🗣️",
  };
  const [Age, setAge] = useState(0);
  useEffect(() => {
    const getAge = () => {
      var parts = profUser.dob.split("/")
      var dob = new Date(parts[2],parts[1]-1,parts[0]);
      var month_diff = Date.now() - dob.getTime();

      //convert the calculated difference in date format
      var age_dt = new Date(month_diff);

      //extract year from date
      var year = age_dt.getUTCFullYear();

      //now calculate the age of the user
      var age = Math.abs(year - 1970);
      setAge(age);
    };
    getAge();
  }, [profUser.dob]);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        snapToInterval={Dimensions.get("window").width}
        decelerationRate={"fast"}
        onScroll={changeHeader}
        ref={(ref) => {
          SetHorizontalScrollViewRef(ref);
        }}
      >
        <DoubleClick icon delay={300} timeout={1000} doubleClick={onDoubleTap}>
          <View style={styles.firstPage}>
            <Image style={styles.image} source={{ uri: profUser.image.profile_1 }} />
            <View style={styles.uiContainer}>
              <Text style={styles.textH}>
                {profUser.name}, {Age}
              </Text>
              <Text style={styles.text}>{profUser.aboutStuff[6].value}</Text>
              <View style={styles.rightContainer}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onLikePress}
                >
                  <AntDesign
                    name={isLiked ? "heart" : "hearto"}
                    size={30}
                    color={isLiked ? "red" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onDisLikePress}
                >
                  <AntDesign
                    name="plus"
                    size={30}
                    color={"white"}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onReportPress}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </DoubleClick>
        <DoubleClick icon delay={300} timeout={1000} doubleClick={onDoubleTap}>
          <View style={styles.aboutMeContainer}>
            <LinearGradient
              colors={["#FFFFFF", "#F9D7D5"]}
              style={{ height: "100%" }}
            >
              <Text style={styles.aboutMeHeading}>About Me</Text>
              <Text style={styles.aboutMeContent}>{profUser.bio}</Text>
              <View style={styles.uiContainer}>
                <View style={styles.leftContainer}>
                  {profUser.aboutStuff.map((val) =>
                    val.value ? (
                      <Interest value={val.value} emoji={emojiMap[val.type]} />
                    ) : (
                      <></>
                    )
                  )}
                  {profUser.languages.map((val) => (
                    <Interest value={val} emoji={emojiMap["language"]} />
                  ))}
                </View>
                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onLikePress}
                  >
                    <AntDesign
                      name={isLiked ? "heart" : "hearto"}
                      size={30}
                      color={isLiked ? "red" : "white"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onDisLikePress}
                  >
                    <AntDesign
                      name="plus"
                      size={30}
                      color={"white"}
                      style={{ transform: [{ rotate: "45deg" }] }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onReportPress}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </DoubleClick>
        <DoubleClick icon delay={300} timeout={1000} doubleClick={onDoubleTap}>
          <View style={styles.firstPage}>
            <Image style={styles.image} source={{ uri: profUser.image.profile_2 }} />
            <View style={styles.uiContainer}>
              {/* <Text style={styles.textH}>
                {profUser.name}, {profUser.age}
              </Text>
              <Text style={styles.text}>{profUser.aboutStuff[6].value}</Text> */}
              <View style={styles.rightContainer}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onLikePress}
                >
                  <AntDesign
                    name={isLiked ? "heart" : "hearto"}
                    size={30}
                    color={isLiked ? "red" : "white"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onDisLikePress}
                >
                  <AntDesign
                    name="plus"
                    size={30}
                    color={"white"}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onReportPress}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </DoubleClick>
        <DoubleClick icon delay={300} timeout={1000} doubleClick={onDoubleTap}>
          <View style={styles.aboutMeContainer}>
            <LinearGradient
              colors={["#FFFFFF", "#F9D7D5"]}
              style={{ height: "100%" }}
            >
              <Text style={styles.aboutMeHeading}>Interests</Text>
              <View style={styles.uiContainer}>
                <View style={styles.interestContainer}>
                  {profUser.interest.main.map((val) => (
                    <Interest value={val} />
                  ))}
                  {profUser.interest.new.map((val) => (
                    <Interest value={val} />
                  ))}
                </View>
                <View style={styles.rightContainer}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onLikePress}
                  >
                    <AntDesign
                      name={isLiked ? "heart" : "hearto"}
                      size={30}
                      color={isLiked ? "red" : "white"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onDisLikePress}
                  >
                    <AntDesign
                      name="plus"
                      size={30}
                      color={"white"}
                      style={{ transform: [{ rotate: "45deg" }] }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onReportPress}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </DoubleClick>
        {Object.keys(profUser.profilePrompts)[0] ? (
          profUser.image.background ? (
            <DoubleClick
              icon
              delay={300}
              timeout={1000}
              doubleClick={onDoubleTap}
            >
              <View style={styles.firstPage}>
                <Image
                  style={styles.image}
                  source={{ uri: profUser.image.background }}
                />
                <View style={styles.overlay}>
                  <Text style={styles.promptType}>
                    {Object.keys(profUser.profilePrompts)[0]}
                  </Text>
                  <Text style={styles.promptText}>
                    {Object.values(profUser.profilePrompts)[0]}
                  </Text>
                  <View style={styles.rightContainer}>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onLikePress}
                    >
                      <AntDesign
                        name={isLiked ? "heart" : "hearto"}
                        size={30}
                        color={isLiked ? "red" : "white"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onDisLikePress}
                    >
                      <AntDesign
                        name="plus"
                        size={30}
                        color={"white"}
                        style={{ transform: [{ rotate: "45deg" }] }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onReportPress}
                    >
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </DoubleClick>
          ) : (
            <DoubleClick
              icon
              delay={300}
              timeout={1000}
              doubleClick={onDoubleTap}
            >
              <View style={styles.aboutMeContainer}>
                <LinearGradient
                  colors={["#FFFFFF", "#F9D7D5"]}
                  style={{ height: "100%" }}
                >
                  <Text style={[styles.promptType, { color: "#292C6D" }]}>
                    {Object.keys(profUser.profilePrompts)[0]}
                  </Text>
                  <Text style={[styles.promptText, { color: "#292C6D" }]}>
                    {Object.values(profUser.profilePrompts)[0]}
                  </Text>
                  <View style={styles.uiContainer}>
                    <View style={styles.rightContainer}>
                      <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={onLikePress}
                      >
                        <AntDesign
                          name={isLiked ? "heart" : "hearto"}
                          size={30}
                          color={isLiked ? "red" : "white"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={onDisLikePress}
                      >
                        <AntDesign
                          name="plus"
                          size={30}
                          color={"white"}
                          style={{ transform: [{ rotate: "45deg" }] }}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={onReportPress}
                      >
                        <MaterialCommunityIcons
                          name="dots-vertical"
                          size={30}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </DoubleClick>
          )
        ) : (
          <></>
        )}
        {Object.keys(profUser.profilePrompts)[1] ? (
          <DoubleClick
            icon
            delay={300}
            timeout={1000}
            doubleClick={onDoubleTap}
          >
            <View style={styles.aboutMeContainer}>
              <LinearGradient
                colors={["#FFFFFF", "#F9D7D5"]}
                style={{ height: "100%" }}
              >
                <Text style={[styles.promptType, { color: "#292C6D" }]}>
                  {Object.keys(profUser.profilePrompts)[1]}
                </Text>
                <Text style={[styles.promptText, { color: "#292C6D" }]}>
                  {Object.values(profUser.profilePrompts)[1]}
                </Text>
                <View style={styles.uiContainer}>
                  <View style={styles.rightContainer}>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onLikePress}
                    >
                      <AntDesign
                        name={isLiked ? "heart" : "hearto"}
                        size={30}
                        color={isLiked ? "red" : "white"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onDisLikePress}
                    >
                      <AntDesign
                        name="plus"
                        size={30}
                        color={"white"}
                        style={{ transform: [{ rotate: "45deg" }] }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onReportPress}
                    >
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </DoubleClick>
        ) : (
          <></>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.endView}>
          <View style={styles.modalView}>
            {/* <TouchableOpacity
              onPress={setReportModal(!reportModal)}
            >
              <Text style={[styles.modalText, { color: "#FF0000" }]}>
                Report
              </Text>
            </TouchableOpacity> */}

            <ReportModal profUser={profUser}/>

            <TouchableOpacity>
              <Text style={styles.modalText}>Get Email Id</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={[styles.modalText, { color: "#FF4E8C" }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Post;
