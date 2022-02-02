import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./Style/Styles";
import StyledButton from "../../components/Buttons/StyledButton";
import Header from "./Header";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

const GenderInterest = () => {
    let { user } = useAuth();
  const navigation = useNavigation();
  const Interests = [
    {
      Options: [
        { optionText: "Men", value: "male" },
        { optionText: "Women", value: "female" },
        { optionText: "Both", value: "both" },
      ],
    },
  ];
  let handleFormData = (lookingFor) => {
    let data = { aboutStuff: arrayUnion({ type: "looking_for", value: lookingFor }) };
    updateDoc(doc(db, "users", user.uid), {
      ...data,
    })
      .then(() => {
        console.log("done");
        navigation.navigate("Bio");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Header title="I like" />

      <View style={styles.interestsconatiner}>
        {Interests[0].Options.map((Option) => (
          <TouchableOpacity onPress={() => handleFormData(Option.value)}>
            <Text style={styles.option}>{Option.optionText}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default GenderInterest;
