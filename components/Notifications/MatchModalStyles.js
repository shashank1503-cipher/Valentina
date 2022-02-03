import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("screen").height,
    transform: [{ translateY: -25 }],
  },
  
  endView: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalView: {
    
    backgroundColor: "white",
    borderRadius: 20,
    width:Dimensions.get("screen").width,
    padding: "5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color:"#000",
    fontSize:17,
    marginBottom: 15,

  },
});
export default styles;
