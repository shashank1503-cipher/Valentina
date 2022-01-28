import React from 'react'
import { View, Text, TextInput, Pressable } from 'react-native'
import styles from './Style/Styles'
//import StyledButton from '../../components/Buttons/StyledButton';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import Header from './Header'
import ErrorMessage from './ErrorMessage'
import {Formik} from 'formik' 
import * as Yup from 'yup';
const Names = () => {
    const navigation = useNavigation();
    const colors = ["#FF4E8C", "#FF9B7B", "#F9D7D5"];
    const Pressed = () => {
        navigation.navigate("Dob");
        handleSubmit;
      }
    const validateSchema = Yup.object().shape({
        first: Yup.string().min(4).max(255).required('First name is required').label("First"),
        last: Yup.string().max(255).required('Last name is required').label("Last"),
    }); 

    return (
        <View style={ styles.container }>
        <Header title="What shall we call you?"/>

        <Formik
            initialValues={{first: "", last: ""}}
            onSubmit={(values) => console.log(values)}
            validationSchema={validateSchema}
        >
            {({handleChange, handleSubmit, errors, values}) => (
                <React.Fragment>
                    <TextInput 
                        placeholder="First Name" 
                        style={styles.input}
                        onChangeText={handleChange("first")
                    }
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

                    <Pressable  
                        onPress={() => {
                            handleSubmit();
                            navigation.navigate("Are you old enough?");
                        }}
                            style={styles.button}
                    >
                        <LinearGradient
                            colors={colors}
                            style={styles.background}
                            end={{ x: 0.85, y: 0.15 }}
                        >
                         <Text style={styles.text}>
                            NEXT
                            </Text>
                        </LinearGradient>
                    </Pressable>

                    {/* 
                    <StyledButton page="Are you old enough?" text="Next" validate="{handleSubmit}"/> */}
                </React.Fragment>
            )}
        
        </Formik>


        </View>
    )
}


export default Names
