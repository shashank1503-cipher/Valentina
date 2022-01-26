import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker';
import StyledButton from '../../components/Buttons/StyledButton'
import styles from './Style/Styles'
import Header from './Header'

const Dob = () => {    
       
    const [date, setDate] = useState(new Date());  
    const [open, setOpen] = useState(false)
      
      
    return (
        <View style={styles.container}>
          <Header title="How old are you?"/>

            
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.date} >           
              <Text>Select date</Text>
              <DatePicker               
                  mode="date"
                  date={date}
                  placeholder="DD/MM/YYYY"
                  format="DD/MM/YYYY"
                  minDate="01-01-1900"
                  maxDate="01-01-2003"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  style={{
                    width:250,                    
                    paddingBottom:5,
                  }}
                  onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
              />   
            
                </TouchableOpacity>  

            <StyledButton page="Gender" text="Next"/> 
             
        </View>
    )
}

export default Dob
