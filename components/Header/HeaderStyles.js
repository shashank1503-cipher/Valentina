import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // marginTop: StatusBar.currentHeight || 0,
    width: "100%",
    height: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    elevation: 1,
  },
  containerB: {
    position: "absolute",
    // marginTop: StatusBar.currentHeight || 0,
    width: "100%",
    height: "5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    elevation: 1,
  },
  text: {
    marginTop: StatusBar.currentHeight || 0,
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  textB: {
    marginTop: StatusBar.currentHeight || 0,
    fontSize: 18,
    color: "#292C6D",
    marginLeft: 10,
    fontWeight: "bold",
  },
  image: {
    marginTop: StatusBar.currentHeight || 0,
    width: 20,
    height: 20,
  },
  iconWrapper: {
    marginLeft: "auto",
    marginRight: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  icon: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});
export default styles;
