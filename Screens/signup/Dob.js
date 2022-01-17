import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import DatePicker from 'react-native-datepicker';
import StyledButton from '../../components/Buttons/StyledButton'
import styles from './Style/Styles'


const Dob = () => {    
       
    const [date, setDate] = useState('15-01-2022');        
      
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>How old are you?</Text>

            <View style={styles.date} >
            

              <DatePicker               
                  mode="date"
                  date={date}
                  placeholder="Select date"
                  format="DD/MM/YYYY"
                  minDate="01-01-1900"
                  maxDate="01-01-2003"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                

                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      right: -5,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      borderColor : "gray",
                      alignItems: "flex-start",
                      borderWidth: 0,
                      borderBottomWidth: 1,
                    },
                    placeholderText: {
                      fontSize: 17,
                      color: "gray"
                    },
                    dateText: {
                      fontSize: 17,
                    }
                  }}
                  onDateChange={(date) => {
                    setDate(date);
                  }}
            />   
            
            </View> 

            <StyledButton page="Gender" text="Next"/> 
             
        </View>
    )
}

export default Dob
