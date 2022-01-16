import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position:"absolute",
    marginTop: StatusBar.currentHeight || 0,
    width: "100%",
    height: "10%",
    backgroundColor: "rgba(18, 18, 18, 0.25)",
    display:"flex",
    flexDirection:"row",
    alignItems:'center',
    paddingLeft:10,
    elevation:2
  },
  text:{
      fontSize:18,
      color:"#fff",
      marginLeft:10,
      fontWeight:"bold"
  },
  image:{
    width: 20,
    height: 20
  },
  iconWrapper:{
    marginLeft:"auto",
    marginRight:10,
  },
  icon:{
    fontSize:20,
    color:"#fff",
    fontWeight:"bold"
  }

});
export default styles;
