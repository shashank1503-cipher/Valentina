import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import StyledButton from "../../components/Buttons/StyledButton";
import Header from "./Header";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import I from "react-native-vector-icons/Feather";
import ImageUploadSignup from "./Modals/ImageUploadSignup";
import { LinearGradient } from "expo-linear-gradient";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import AppContext from "../../context/AppContext";

const Photo = () => {
  const navigation = useNavigation();
  let { user } = useAuth();

  const { updateUserData } = useContext(AppContext)

  const [image, setImage] = useState({
    background: "null",
    profile_1: "null",
    profile_2: "null",
  });
  console.log(image);

  const formImage = async (image, text) => {
    let CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dsjzkocno/upload";

    let base64Img = `data:image/jpg;base64,${image.base64}`;

    let data = {
      file: base64Img,
      upload_preset: "valentina",
    };

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    })
      .then(async (r) => r.json())
      .then((data) => {
        console.log(data);

        setImage((i) => ({
          ...i,
          [text]: data.secure_url.toString(),
        }));
      });
  };

  const addImageMedia = async (text) => {
    text = text.toString().toLowerCase();

    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      base64: true,
    });

    if (!_image.cancelled) formImage(_image, text);
  };

  const addImageCamera = async (text) => {
    text = text.toString().toLowerCase();

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let _image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
      base64: true,
    });

    if (!_image.cancelled) formImage(_image, text);
  };
  let handleSubmit = () => {
    if (image.profile_1 === "null" || image.profile_2 === "null") {
      Alert.alert(
        "Invisible beings are not allowed",
        `Add 2 profile photos to proceed furthur`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      let data = { image: image };
      updateDoc(doc(db, "users", user.uid), {
        ...data,
      })
        .then(() => {
          console.log("done");
          updateUserData();
          navigation.navigate("Home");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const colors = ["#FF9B7B", "#FF4E8C"];
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Your Fake Candids</Text>
      </View>

      <ImageUploadSignup
        colors={colors}
        edit={true}
        styles={styles}
        addImageCamera={addImageCamera}
        addImageMedia={addImageMedia}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <LinearGradient
          colors={colors}
          end={{ x: 0.75, y: 0.25 }}
          style={styles.updateButtonGrad}
        >
          <Text style={styles.updateButtonText}>NEXT</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    paddingLeft: 25,
    paddingTop: 25,
    fontWeight: "bold",
  },
  buttonNext: {
    position: "relative",
    alignItems: "center",
    top: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: 0,
  },

  profilePic: {
    width: "110%",
    height: "100%",
    top: -1,
    resizeMode: "cover",
  },

  changeBut: {
    width: "60%",
    height: 50,
    borderRadius: 25,
    marginHorizontal: "20%",
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },

  detailBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  accountHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  editButton: {
    fontSize: 16,
    color: "#FF4E8C",
    width: 60,
    textAlign: "center",
    borderRadius: 10,
    marginTop: 20,
  },

  account: {
    width: "100%",
    top: -680,
    position: "relative",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "column",
  },

  picCont: {
    position: "relative",
    width: 1000,
    height: 1000,
    top: -680,
    left: -340,
    right: 0,
    overflow: "hidden",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    borderWidth: 1,
    borderColor: "#ededed",
    backgroundColor: "#ededed",
  },

  mainPicCont: {
    position: "absolute",
    top: 680,
    left: 0,
    right: 0,
    height: 320,
    width: "100%",
  },

  button: {
    width: 120,
    height: 120,
    position: "absolute",
    borderRadius: 30,
    top: 175,
    left: "35%",
    alignItems: "center",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius:1,
    // elevation: 8,
  },

  input: {
    width: "100%",
    backgroundColor: "rgb(240,240,240)",
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    textAlign: "center",
  },

  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    width: "100%",
  },

  updateButtonGrad: {
    position: "absolute",
    top: 500,
    justifyContent: "center",
    alignSelf: "center",
    width: "75%",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 15,
    overflow: "hidden",
    zIndex: 15,
    elevation: 15,
  },

  imageGrad: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
  },

  inputTag: {
    position: "absolute",
    zIndex: 2,
    fontSize: 16,
    marginVertical: 22,
    marginLeft: 16,
  },

  basicOption: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    padding: 5,
    paddingHorizontal: 10,
  },

  basicText: {
    fontSize: 18,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    display: "flex",
    flexDirection: "row",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default Photo;
