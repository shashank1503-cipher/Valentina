import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems:"center",
    width:"45%",
    padding:10,
    flexDirection:"row",
    justifyContent:"space-around",
    marginRight:"5%",
    marginBottom:"5%",
   
    
  },
  emoji:{
    height:10,
    width:10,
    color:"#000"
  },
  text:{
      color:"#FF4E8D",
      textAlign:"center",
      textTransform:"uppercase"
  }
});

export default styles