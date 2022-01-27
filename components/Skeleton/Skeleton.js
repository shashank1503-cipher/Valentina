import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./SkeletonStyles";
const Skeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstPage}>
        <ActivityIndicator size={100} color="#FF4E8C"  />
      </View>
    </View>
  );
};

export default Skeleton;
