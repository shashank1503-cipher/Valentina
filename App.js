import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import StackNavigator from "./StackNavigator";
import {LogBox} from "react-native";
 
import { StyleSheet } from "react-native";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./hooks/useAuth";

import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};
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
