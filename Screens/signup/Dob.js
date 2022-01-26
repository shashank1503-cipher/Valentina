import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
//import DatePicker from 'react-native-datepicker';
import DateTimePicker from "@react-native-community/datetimepicker";

import StyledButton from '../../components/Buttons/StyledButton'
import styles from './Style/Styles'
import Header from './Header'

const Dob = () => {    
       
    const [date, setDate] = useState(new Date());  
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);
    };

    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode("date");
    };

    const showTimepicker = () => {
      showMode("time");
    };

      
    return (
        <View style={styles.container}>
          <Header title="How old are you?"/>

            
            <TouchableOpacity onPress={showDatepicker}
             style={styles.date} >           
              <Text style={styles.datetext}>DD/MM/YYYY </Text>

              {show && (

                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  minDate="01-01-1900"
                  maxDate="01-01-2003"
                  style={{
                    width:250,                    
                    paddingBottom:5,
                  }}
                />
              )}
            
                </TouchableOpacity>  
                <Text style={styles.showdate}>{date.toLocaleDateString().slice(0,10)}</Text>


            <StyledButton page="Gender" text="Next"/> 
             
        </View>
    )
}

export default Dob
