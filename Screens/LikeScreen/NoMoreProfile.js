import React from "react";
import { View, Text } from "react-native";
import styles from "./NoMoreProfileStyles";
const NoMoreProfile = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>No More Profiles to Show..... T_T</Text>
      </View>
    </View>
  );
};

export default NoMoreProfile;
