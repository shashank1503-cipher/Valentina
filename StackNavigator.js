import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./Screens/HomeScreen";
import SplashScreen from "./Screens/SplashScreen";
import Names from './Screens/signup/Names';
import Dob from './Screens/signup/Dob';
import Gender from './Screens/signup/Gender';
import Identities from './Screens/signup/Identities';
import IdentityConfirmation from './Screens/signup/IdentityConfirmation';
import Sexuality from './Screens/signup/Sexuality';
import GenderInterest from "./Screens/signup/GenderInterest";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}} />
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Names" component={Names} options={{headerShown:false}}/>
      <Stack.Screen name="Dob" component={Dob} options={{headerShown:false}}/>
      <Stack.Screen name="Gender" component={Gender} options={{headerShown:false}}/>
      <Stack.Screen name="Identities" component={Identities} options={{headerShown:false}}/>
      <Stack.Screen name="IdentityConfirmation" component={IdentityConfirmation} options={{headerShown:false}}/>
      <Stack.Screen name="Sexuality" component={Sexuality} options={{headerShown:false}}/>
      <Stack.Screen name="GenderInterest" component={GenderInterest} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default StackNavigator;
