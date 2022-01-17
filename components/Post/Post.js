import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./PostStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DoubleClick from "react-native-double-tap";
const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const onLikePress = () => {
    setIsLiked(isLiked ? false : true);
  };
  const onDisLikePress = () => {
    //code
  };
  return (
    <View style={styles.container}>
      <DoubleClick doubleTap={onLikePress}>
        <Image
          style={styles.image}
          source={require("../../assets/unsplash_VVEwJJRRHgk.png")}
        />
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
                // style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </DoubleClick>
    </View>
  );
};

export default Post;
