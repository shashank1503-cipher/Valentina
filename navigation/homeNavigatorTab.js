import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import ChatScreen from "../Screens/ChatScreen/ChatScreen";
import ProfilePage from "../Screens/Profile/ProfilePage";
import HomeScreen from "../Screens/HomeScreen";
const Tab = createBottomTabNavigator();
  
const homeNavigatorTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarActiveTintColor: "#FF4E8D", tabBarInactiveTintColor: "#121212",tabBarShowLabel:false}}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color,focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={25} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Likes"
        component={LikeScreen}
        options={{
          tabBarIcon: ({ color,focused }) => (
            <AntDesign name={focused ? "heart" : "hearto"} size={25} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color,focused }) => (
            <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={25} color={color} />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color,focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={25} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default homeNavigatorTab;
