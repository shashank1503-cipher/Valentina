import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "10%",
    backgroundColor: "#fff",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',
    alignSelf:"flex-end",
    paddingLeft:30,
    paddingRight:30,
    elevation:100
    
  },
  icon:{
    fontSize:20,
    color:"#000",
    fontWeight:"bold"
  },
  iconActive:{
    fontSize:20,
    color:"#FF4E8D",
    fontWeight:"bold"
  }

});
export default styles;
