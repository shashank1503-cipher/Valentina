import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import ErrorMessage from "./ErrorMessage";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./Style/Styles";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import AppContext from '../../context/AppContext';

const Bio = () => {
    const navigation = useNavigation();
    let {user} = useAuth()
    const colors = ["#FF4E8C", "#FF9B7B", "#F9D7D5"];

    const { updateUserData } = useContext(AppContext)

    const validateSchema = Yup.object().shape({
        bio: Yup.string()
          .min(4)
          .max(255)
          .required("This field is required")
          .label("Bio")
      });
    let handleFormData = (values) => {
        let biodata = values.bio;
        let data = { bio: biodata };
        updateDoc(doc(db, "users", user.uid), {
          ...data,
        })
          .then(() => {
            // console.log("done");
            navigation.navigate("Interests");
            updateUserData()
          })
          .catch((err) => {
            alert(err.message);
          });
      };
    //let BioData = user.displayName;
  
  return (
    <View style={styles.container}>
        <Header title="Tell us a bit about yourself" />
        <Formik
            initialValues={{ bio: '' }}
        onSubmit={(values) => handleFormData(values)}
        validationSchema={validateSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <React.Fragment>
            <TextInput
              placeholder="Loading Bio..."
              style={styles.bioinput}
              onChangeText={handleChange("bio")}
              value={values.first}
              multiline={true}
            />
            <ErrorMessage error={errors.bio} />

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

          </React.Fragment>
        )}
      </Formik>

      
    </View>
  );
};

export default Bio;
