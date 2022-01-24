import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./StackNavigator";
import {LogBox} from "react-native";
LogBox.ignoreAllLogs(); // Ignore log notifications 
import { StyleSheet } from "react-native";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./hooks/useAuth";

export default function App() {
  return (
    <NavigationContainer style={styles.root}>      
      <AppProvider>
        <AuthProvider>
           {/*Passes down the user auth to the children*/}
          <StackNavigator />
        </AuthProvider>
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
