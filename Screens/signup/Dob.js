import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DatePicker from "react-native-datepicker";
import StyledButton from "../../components/Buttons/StyledButton";
import styles from "./Style/Styles";
import Header from "./Header";
import { LinearGradient } from "expo-linear-gradient";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Dob = () => {
  let { user } = useAuth();
  const navigation = useNavigation();
  const [date, setDate] = useState("15-01-2000");
  let handleFormData = () => {
    let data = { dob: date };
    updateDoc(doc(db, "users", user.uid), {
      ...data,
    })
      .then(() => {
        console.log("done");
        navigation.navigate("Gender");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const colors = ["#FF4E8C", "#FF9B7B", "#F9D7D5"];
  return (
    <View style={styles.container}>
      <Header title="How old are you?" />


      <TouchableOpacity style={styles.date}>
        <DatePicker
          mode="date"
          style={styles.datetext}
          date={date}
          placeholder="Select date"
          format="DD/MM/YYYY"
          minDate="01-01-1996"
          maxDate="01-01-2005"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          handleFormData();
        }}
        style={styles.button}
      >
        <LinearGradient
          colors={colors}
          style={styles.background}
          end={{ x: 0.85, y: 0.15 }}
        >
          <Text style={styles.text}>NEXT</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Dob;
