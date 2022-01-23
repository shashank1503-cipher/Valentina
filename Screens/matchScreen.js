import { TouchableHighlight, StyleSheet, View,Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import React from "react";




const MatchScreen = () => {
    const colors = ["#F9D7D5", "#FF9B7B", "#FF4E8C"];
    
    var touchProps = {
    activeOpacity: 1,
    underlayColor: "#aaafff",                              
    style: styles.button, 
                   
    };
    return(
        <View style={styles.container}>
            <LinearGradient colors={colors} 
            style = {styles.background} 
            end={{ x: 0.90, y: 0.10 }}>

            <Text style = {styles.text1}>
                It's A Match!
            </Text>
            <Text style={styles.text2}>
                Lucy Likes you too
            </Text>
            <Image source={require("../assets/matched0.png")} style={styles.image}>
                
            </Image>
            <Image source={require("../assets/matched1.png")} style={styles.image2}></Image>
            <View style={{top:"55%"}}>
            
            <TouchableHighlight {...touchProps} onPress={()=>{console.log("Send a Message")}}><Text style={{color:"white"}}>Send a Message</Text></TouchableHighlight>
            <View style={{height:20}}></View>
            <TouchableHighlight {...touchProps} onPress={()=>{console.log("Keep Swiping")}}><Text>Keep Swiping</Text></TouchableHighlight>
            </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
        flexDirection: "column",
    },
    text1: {
        backgroundColor: "transparent",
        fontSize: 42,
        color: "white",
        top: "19%",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Roboto",
        fontWeight: "700",
    },
    text2: {
        backgroundColor: "transparent",
        fontSize: 14,
        color: "white",
        top: "22%",
        alignItems: "center",
        textAlign: "center",
        fontWeight: "400",
        fontFamily:"Roboto",
        
    },
    image: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: "25%",
        top: "38%",
        height: 112,
        width: 112,
        borderWidth: 2,
        borderRadius: 150,
      },
    image2:{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: "40%",
        top: "38%",
        height: 116,
        width: 116,
        borderColor: "#B055E9",
        borderWidth: 4,
        borderRadius: 150,
    },
    button2:{
        alignItems: "center",
        borderRadius: 30,
        borderWidth:1,
        borderColor: "#aaafff",
        backgroundColor: "transparent",
        width: 330,
        height: 50,
        justifyContent: "center",
        
        
    },
    button:{
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 30,
        borderWidth:1,
        borderColor: "#aaafff",
        backgroundColor: 'transparent',
        width: 330,
        height: 50,
        justifyContent: "center",
    },
});

export default MatchScreen