import React from "react";
import { Image, Text, View, Pressable, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./HeaderStyles";
// import HeaderStyles from './HeaderStyles'

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/ico2.png")} style={styles.image} />
      <Text style={styles.text}>Valentina</Text>
      <Pressable style={styles.iconWrapper}>
        <Icon name="filter" style={styles.icon} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Header;
