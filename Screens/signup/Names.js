import React from 'react'
import { View, Text, TextInput } from 'react-native'
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton';
import Header from './Header'
import ErrorMessage from './ErrorMessage'
import {Formik} from 'formik' 
import * as Yup from 'yup';
const Names = () => {

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

                    <StyledButton page="Dob" text="Next" validate="{handleSubmit}"/>
                </React.Fragment>
            )}
        
        </Formik>


        </View>
    )
}


export default Names
