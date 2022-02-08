import React, { useContext, useState } from "react";
import { View, Text, Pressable, Button, TouchableOpacity } from "react-native";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import styles from "./Style/Styles";
import useAuth from "../../hooks/useAuth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AppContext from "../../context/AppContext";
const Batch = () => {
  let { user } = useAuth();
  const navigation = useNavigation();

  const { updateUserData } = useContext(AppContext)

  const batches = [
    {
      batchOptions: [
        { batchText: "2018", value: "2018" },
        { batchText: "2019", value: "2019" },
        { batchText: "2020", value: "2020" },
        { batchText: "2021", value: "2021" },
      ],
    },
  ];
  let handleFormData = (batch) => {
    let data = { aboutStuff: arrayUnion({ type: "batch", value: batch })  };
    updateDoc(doc(db, "users", user.uid), {
      ...data,
    })
      .then(() => {
        console.log("done");
        updateUserData();
        navigation.navigate("Bio", { batch: batch });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Header title="Which batch are you from?" />
      
      <View style={styles.interestsconatiner}>
        {batches[0].batchOptions.map((batchOption) => (
          <TouchableOpacity
            style={styles.btnNormal}
            onPress={() => handleFormData(batchOption.value)}
          >
            <Text>{batchOption.batchText}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Batch;
