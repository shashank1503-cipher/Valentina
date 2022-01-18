import React, { useContext } from "react";
import { Image, Text, View, Pressable, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AppContext from "../../context/AppContext";
import styles from "./HeaderStyles";
// import HeaderStyles from './HeaderStyles'

const Header = ({VerticalHeaderScroll}) => {
  let {headerState} = useContext(AppContext)
  return (
    <SafeAreaView style={headerState ? styles.containerB : styles.container}>
      <Image source={require("../../assets/ico2.png")} style={styles.image} />
      <Text style={headerState ? styles.textB : styles.text}>Valentina</Text>
      <Pressable style={styles.iconWrapper}>
        <Icon name="filter" style={headerState?'':styles.icon} />
      </Pressable>
    </SafeAreaView>
  );
};

export default Header;
