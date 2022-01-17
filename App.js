import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./StackNavigator";
import {StyleSheet} from 'react-native';


export default function App() {
  return (
    <NavigationContainer style={styles.root}>
      <StackNavigator />     
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor:'#ffffff',
  }
})
