import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import DatePicker from 'react-native-datepicker';
import StyledButton from '../../components/Buttons/StyledButton'
import styles from './Style/Styles'
import Header from './Header'

const Dob = () => {    
       
    const [date, setDate] = useState(new Date());  
         
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


            <StyledButton page="Gender" text="Next"/> 
             
        </View>
    )
}

export default Dob
