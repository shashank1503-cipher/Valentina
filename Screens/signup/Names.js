import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./Style/Styles";
//import StyledButton from '../../components/Buttons/StyledButton';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../../hooks/useAuth";
import Header from "./Header";
import ErrorMessage from "./ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const Names = () => {
  const navigation = useNavigation();
  let { user } = useAuth();
  const colors = ["#FF4E8C", "#FF9B7B", "#F9D7D5"];
  const validateSchema = Yup.object().shape({
    first: Yup.string()
      .min(4)
      .max(255)
      .required("First name is required")
      .label("First"),
    last: Yup.string().max(255).required("Last name is required").label("Last"),
  });
  let handleFormData = (values) => {
    let name = values.first + " " + values.last;
    let data = {
      id:user.uid,
      name: name,
      age: "",
      bio: "",
      image: {
        background:"",
        profile_1:"",
        profile_2:"",
      },
      gender:"",
      languages: [],
      aboutStuff: [
        {
          type: "height",
          value: {
            feet: "",
            inch: "",
          },
        },
        {
          type: "location",
          value: "",
        },
        {
          type: "star_sign",
          value: "",
        },
        {
          type: "religion",
          value: "",
        },
        {
          type: "looking_for",
          value: "",
        },
        {
          type: "pronouns",
          value: "",
        },
        {
          type:"batch",
          value:""
        }
        
      ],
      interest: {
        main: [],
        new: [],
      },
      dob:"",
      phoneNumber:"",
      profilePrompts: {},
    };
    setDoc(doc(db, "users", user.uid), {
      ...data,
    })
      .then(() => {
        console.log("done");
        navigation.navigate("Are you old enough?");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  let Names = user.displayName;
  let firstName = Names.split(" ")[0];
  let lastName = Names.split(" ").slice(1).join(" ");
  return (
    <View style={styles.container}>
      <Header title="What shall we call you?" />

      <Formik
        initialValues={{ first: firstName, last: lastName }}
        onSubmit={(values) => handleFormData(values)}
        validationSchema={validateSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <React.Fragment>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              onChangeText={handleChange("first")}
              value={values.first}
            />
            <ErrorMessage error={errors.first} />
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={handleChange("last")}
              value={values.last}
            />
            <ErrorMessage error={errors.last} />

            <TouchableOpacity
              onPress={() => {
                handleSubmit();
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

            {/* 
                    <StyledButton page="Are you old enough?" text="Next" validate="{handleSubmit}"/> */}
          </React.Fragment>
        )}
      </Formik>
    </View>
  );
};

export default Names;
