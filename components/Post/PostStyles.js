import { StyleSheet,Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    transform: [{ translateY: -50 }]
  },
  uiContainer:{
    height:"100%",
    justifyContent:"flex-end",
  },
  image: {
    position:"absolute",
    top:0,
    left:0,
    bottom:0,
    right:0,
    width: "100%",
    height: "100%",
    resizeMode:'cover'
  },
  textH:{
    position:"absolute",
    top:"75%",
    left:"10%",
    fontSize:30,
    fontWeight:"bold",
    elevation:2,
    color:"#fff"
  },
  text:{
    position:"absolute",
    top:"81%",
    left:"10%",
    fontSize:15,
    elevation:2,
    color:"#fff"
  },
  leftContainer:{
    position:"absolute",
    top:"50%",
    paddingLeft:"10%",
    flexWrap:"wrap",
    flexDirection:"row",
    justifyContent:"center"
  },
  rightContainer: {
    alignSelf: 'flex-end',
    height: 250,
    justifyContent: 'space-evenly',
    marginRight: 10,
    marginBottom:30
  },
  iconContainer: {
    alignItems: 'center',
  },
  firstPage: {
    width: Dimensions.get("window").width
  },
  aboutMeContainer:{
    width: Dimensions.get("window").width,
  },
  aboutMeHeading:{
    position:"absolute",
    top:"20%",
    color:"#292C6D",
    fontSize:40,
    marginLeft:"10%",
    fontWeight:'bold'
  },
  aboutMeContent:{
    position:"absolute",
    top:"30%",
    color:"#292C6D",
    fontSize:20,
    marginLeft:"10%",
    marginRight:"10%",
  }

});
export default styles;
