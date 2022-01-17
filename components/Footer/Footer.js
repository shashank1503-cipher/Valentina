import React, { useState } from "react";
import { View, Pressable, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "../Footer/FooterStyles";
const Footer = () => {
  const [ActiveTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable styles = {styles.iconWrapper} onPress={() =>{setActiveTab(0)}}>
        <Icon name="home" style={ActiveTab === 0 ? styles.iconActive : styles.icon}></Icon>
      </Pressable>
      <Pressable styles = {styles.iconWrapper} onPress={() =>{setActiveTab(1)}}>
        <Icon name={ActiveTab === 1 ?"heart" : "hearto"} style={ActiveTab === 1 ? styles.iconActive : styles.icon}></Icon>
      </Pressable>
      <Pressable styles = {styles.iconWrapper} onPress={() =>{setActiveTab(2)}}>
        <Icon name="message1" style={ActiveTab === 2 ? styles.iconActive : styles.icon}></Icon>
      </Pressable>
      <Pressable styles = {styles.iconWrapper} onPress={() =>{setActiveTab(3)}}>
        <Icon name="user" style={ActiveTab === 3 ? styles.iconActive : styles.icon}></Icon>
      </Pressable>
    </SafeAreaView>
  );
};

export default Footer;
