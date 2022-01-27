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
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
const Post = (props) => {
  let { user } = useAuth();
  const { changeHeader, ScrollViewRef, SetHorizontalScrollViewRef } =
    useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const onLikePress = () => {
    let personUID = props.uid
    if(!isLiked){
      
      setDoc(doc(db,"users",user.uid,"likes",personUID),{"id":personUID})
    }
    else{
      deleteDoc(doc(db,"users",user.uid,"likes",personUID))
    }
    setIsLiked(isLiked ? false : true);
    
    
    
  };
  const onDoubleTap = () => {
    let personUID = props.uid
    setIsLiked(true);
    if (!isLiked){
      setDoc(doc(db,"users",user.uid,"likes",personUID),{"id":personUID})
    }
    
  };
  const onDisLikePress = () => {
    let personUID = props.uid
    setDoc(doc(db,"users",user.uid,"dislikes",personUID),{"id":personUID})
    if (isLiked){
      deleteDoc(doc(db,"users",user.uid,"likes",personUID))
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
      var parts = props.dob.split("/")
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
  }, [props.dob]);
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
            <Image style={styles.image} source={{ uri: props.img.profile_1 }} />
            <View style={styles.uiContainer}>
              <Text style={styles.textH}>
                {props.name}, {Age}
              </Text>
              <Text style={styles.text}>{props.batch}</Text>
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
              <Text style={styles.aboutMeContent}>{props.bio}</Text>
              <View style={styles.uiContainer}>
                <View style={styles.leftContainer}>
                  {props.aboutStuff.map((val) =>
                    val.value ? (
                      <Interest value={val.value} emoji={emojiMap[val.type]} />
                    ) : (
                      <></>
                    )
                  )}
                  {props.languages.map((val) => (
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
            <Image style={styles.image} source={{ uri: props.img.profile_2 }} />
            <View style={styles.uiContainer}>
              {/* <Text style={styles.textH}>
                {props.name}, {props.age}
              </Text>
              <Text style={styles.text}>{props.batch}</Text> */}
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
                  {props.interests.main.map((val) => (
                    <Interest value={val} />
                  ))}
                  {props.interests.new.map((val) => (
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
        {Object.keys(props.profilePrompts)[0] ? (
          props.img.background ? (
            <DoubleClick
              icon
              delay={300}
              timeout={1000}
              doubleClick={onDoubleTap}
            >
              <View style={styles.firstPage}>
                <Image
                  style={styles.image}
                  source={{ uri: props.img.background }}
                />
                <View style={styles.overlay}>
                  <Text style={styles.promptType}>
                    {Object.keys(props.profilePrompts)[0]}
                  </Text>
                  <Text style={styles.promptText}>
                    {Object.values(props.profilePrompts)[0]}
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
                    {Object.keys(props.profilePrompts)[0]}
                  </Text>
                  <Text style={[styles.promptText, { color: "#292C6D" }]}>
                    {Object.values(props.profilePrompts)[0]}
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
        {Object.keys(props.profilePrompts)[1] ? (
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
                  {Object.keys(props.profilePrompts)[1]}
                </Text>
                <Text style={[styles.promptText, { color: "#292C6D" }]}>
                  {Object.values(props.profilePrompts)[1]}
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
            <TouchableOpacity>
              <Text style={[styles.modalText, { color: "#FF0000" }]}>
                Report
              </Text>
            </TouchableOpacity>
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
