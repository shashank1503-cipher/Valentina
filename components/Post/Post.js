import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import styles from "./PostStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DoubleClick from "react-native-double-tap";
import AppContext from "../../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import Interest from "../Interest/Interest";

const Post = (props) => {
  const { changeHeader, ScrollViewRef,SetHorizontalScrollViewRef } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  let pageIndex=1;
  const onLikePress = () => {
    setIsLiked(isLiked ? false : true);
  };
  const onDisLikePress = () => {
    ScrollViewRef.scrollToOffset({ offset: Dimensions.get("screen").height*pageIndex, animated: true });
    pageIndex++;
  };

  const emojiMap = {
    height: "📏",
    location: "📍",
    religion: "🛐",
    dob: "📅",
    star_sign: "🔯",
    looking_for: "🧑",
    pronouns: "🏳️‍🌈",
  };
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
          SetHorizontalScrollViewRef(ref)
        }}
      >
        <DoubleClick doubleTap={onLikePress}>
          <View style={styles.firstPage}>
            <Image style={styles.image} source={{ uri: props.img[0] }} />
            <View style={styles.uiContainer}>
              <Text style={styles.textH}>
                {props.name}, {props.age}
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
                  onPress={onDisLikePress}
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
        <DoubleClick doubleTap={onLikePress}>
          <View style={styles.aboutMeContainer}>
            <LinearGradient
              colors={["#FFFFFF", "#F9D7D5"]}
              style={{ height: "100%" }}
            >
              <Text style={styles.aboutMeHeading}>About Me</Text>
              <Text style={styles.aboutMeContent}>{props.bio}</Text>
              <View style={styles.uiContainer}>
                <View style={styles.leftContainer}>
                  {props.aboutStuff.map((val) => (
                    <Interest value={val.value} emoji={emojiMap[val.type]} />
                  ))}
                  {/* <Interest value="5'11" emoji="📏" />
                  <Interest value="2002" emoji="📅" />
                  <Interest value="5'11" emoji="📏" />
                  <Interest value="2002" emoji="📅" />
                  <Interest value="2002" emoji="📅" />
                  <Interest value="2002" emoji="📅" />
                  <Interest value="2002" emoji="📅" />
                  <Interest value="2002" emoji="📅" /> */}
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
                    onPress={onDisLikePress}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color={"white"}
                      // style={{transform: [{rotate: '45deg'}]}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </DoubleClick>
        <DoubleClick doubleTap={onLikePress}>
          <View style={styles.firstPage}>
            <Image style={styles.image} source={{ uri: props.img[1] }} />
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
                  onPress={onDisLikePress}
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
        <DoubleClick doubleTap={onLikePress}>
          <View style={styles.aboutMeContainer}>
            <LinearGradient
              colors={["#FFFFFF", "#F9D7D5"]}
              style={{ height: "100%" }}
            >
              <Text style={styles.aboutMeHeading}>Interests</Text>
              <View style={styles.uiContainer}>
                <View style={styles.interestContainer}>
                  {props.interests.map((val) => (
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
                    onPress={onDisLikePress}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color={"white"}
                      // style={{transform: [{rotate: '45deg'}]}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </DoubleClick>
        {props.img[2] ? (
          <DoubleClick doubleTap={onLikePress}>
            <View style={styles.firstPage}>
              <Image style={styles.image} source={{ uri: props.img[2] }} />
              <View style={styles.overlay}>
                <Text style={styles.promptType}>My Thing.....</Text>
                <Text style={styles.promptText}>Humour</Text>
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
                    onPress={onDisLikePress}
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
          <DoubleClick doubleTap={onLikePress}>
            <View style={styles.aboutMeContainer}>
              <LinearGradient
                colors={["#FFFFFF", "#F9D7D5"]}
                style={{ height: "100%" }}
              >
                <Text style={[styles.promptType, { color: "#292C6D" }]}>
                  My Thing.....
                </Text>
                <Text style={[styles.promptText, { color: "#292C6D" }]}>
                  Humour
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
                      onPress={onDisLikePress}
                    >
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        color={"white"}
                        // style={{transform: [{rotate: '45deg'}]}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </DoubleClick>
        )}
      </ScrollView>
    </View>
  );
};

export default Post;
