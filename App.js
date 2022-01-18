import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./StackNavigator";
import { StyleSheet } from "react-native";
import { AppProvider } from "./context/AppContext";
export default function App() {
  return (
    <NavigationContainer style={styles.root}>
      <AppProvider>
        <StackNavigator />
      </AppProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
