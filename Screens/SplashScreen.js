import { TouchableOpacity, StyleSheet, View,Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from '../components/Buttons/StyledButton';
import useAuth from "../hooks/useAuth"; 

const SplashScreen = () => {
  const colors = ["#F9D7D5", "#FF9B7B", "#FF4E8C"];
  const navigation = useNavigation();
  const {user,logout} = useAuth();
  console.log(user);

  return (     
    <View style={styles.container}>
                 
      <LinearGradient
        colors={colors}
        style={styles.background}
        end={{ x: 0.90, y: 0.10 }}
      >     
        <View style={{top: 100,alignItems: "center"}}>
          <Text style={styles.text,{color: '#fff'}} >
              Hello, {user.displayName}
          </Text>
        </View>                
        <Image source={require("../assets/ico.png")} style={styles.image} />
        <TouchableOpacity onPress={() => navigation.navigate("Main")}  style={styles.button}>
            <Text style={styles.text}>
                Get Started
            </Text>
        </TouchableOpacity>
      </LinearGradient>
      <Button page="What's in the name tho?" text="Sign up"/>
      <TouchableOpacity onPress={logout} style={styles.logout}>
            <Text style={styles.text}>
                Logout
            </Text>
      </TouchableOpacity>
    </View>   
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  white: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "37.5%",
    top: "40%",
    height: 100,
    width: 100,
  },
  button: {
    "position": "absolute",
    "width": "80%",
    "height": 50,
    "left": 35,
    "top": 500,
    "backgroundColor": "#FFFFFF",
    "borderTopLeftRadius": 30,
    "borderTopRightRadius": 30,
    "borderBottomRightRadius": 30,
    "borderBottomLeftRadius": 30,
    elevation: 3,
  },
  logout: {
    "position": "absolute",
    "width": "80%",
    "height": 50,
    "left": 35,
    "top": 700,
    "backgroundColor": "#FFFFFF",
    "borderTopLeftRadius": 30,
    "borderTopRightRadius": 30,
    "borderBottomRightRadius": 30,
    "borderBottomLeftRadius": 30,
    elevation: 3,
  },
  text:{
    "fontWeight": "500",
    "fontSize": 15,
    "lineHeight": 18,
    "textAlign": "center",
    "textTransform": "uppercase",
    "color": "#373737",
    "marginTop":"5%"
  }
});

export default SplashScreen;
