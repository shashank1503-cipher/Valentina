import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import DatePicker from 'react-native-datepicker';
import StyledButton from '../../components/Buttons/StyledButton'
import styles from './Style/Styles'
import Header from './Header'
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const Dob = () => {    
       
    const [date, setDate] = useState(new Date());
    const navigation = useNavigation();
    const colors = ["#FF4E8C", "#FF9B7B", "#F9D7D5"];  
         
    return (
        <View style={styles.container}>
          <Header title="How old are you?"/>

            
            <TouchableOpacity 
             style={styles.date} > 

                <DatePicker
                    mode="date"
                    style={styles.datetext}
                    date={date}
                    placeholder='Select date'
                    format="DD/MM/YYYY"
                    minDate="01-01-1996"
                    maxDate="01-01-2003"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(date) => {
                      setDate(date);
                  }}
                />             
            
            </TouchableOpacity>  


            <Pressable  
              onPress={() => {
                handleSubmit();
                navigation.navigate("Gender");
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
             
        </View>
    )
}

export default Dob
