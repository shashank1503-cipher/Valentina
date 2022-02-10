import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Style/Styles";
import StyledButton from "../../components/Buttons/StyledButton";
import Header from "./Header";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../../context/AppContext";

const Sexuality = () => {
  let { user } = useAuth();
  const navigation = useNavigation();

  const { updateUserData } = useContext(AppContext)
  const sexuality = [
    {
      Options: [
        { optionText: "Straight", value: "straight" },
        { optionText: "Lesbian", value: "lesbian" },
        { optionText: "Gay", value: "gay" },
        { optionText: "Bisexual", value: "bisexual" },
        { optionText: "Pansexual", value: "pansexual" },
        { optionText: "Questioning", value: "questioning" },
        { optionText: "Asexual", value: "asexual" },
      ],
    },
  ];
  let handleFormData = (sexuality) => {
    let data = { aboutStuff: [{ type: "sexuality", value: sexuality }] };
    updateDoc(doc(db, "users", user.uid), {
      ...data,
    })
      .then(() => {
        // console.log("done");
        updateUserData();
        navigation.navigate("Gender Interest");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Header title="I am" />

      <View style={styles.sexcontainer}>
        {sexuality[0].Options.map((Option) => (
          <TouchableOpacity onPress={() => handleFormData(Option.value)}>
            <Text style={styles.option}>{Option.optionText}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Sexuality;
