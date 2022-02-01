import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("screen").height,
    justifyContent:"center",
    alignContent:"center",
  },
  text:{
      textAlign:"center"
  }
})
  export default styles;