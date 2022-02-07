import React, { useState } from "react";
import { View, Text, Pressable, Button, TouchableOpacity } from "react-native";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import styles from "./Style/Styles";
import useAuth from "../../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const Gender = () => {
  let { user } = useAuth();
  const navigation = useNavigation();
  const genders = [
    {
      genderOptions: [
        { genderText: "Woman", value: "female" },
        { genderText: "Man", value: "male" },
        { genderText: "Non-binary", value: "non-binary" },
      ],
    },
  ];
  let handleFormData = (gender) => {
    let data = { gender: gender };
    updateDoc(doc(db, "users", user.uid), {
      ...data,
    })
      .then(() => {
        console.log("done");
        navigation.navigate("Sexuality", { gender: gender });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Header title="How do you identify?" />
      <Text style={styles.Welcometext}>Everyone's welcome here!</Text>

      <View>
        {genders[0].genderOptions.map((genderOption) => (
          <TouchableOpacity
            style={styles.btnNormal}
            onPress={() => handleFormData(genderOption.value)}
          >
            <Text>{genderOption.genderText}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Gender;
