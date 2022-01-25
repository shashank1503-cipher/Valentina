import { View, Text } from 'react-native';
import React, {useState} from 'react';
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
import Header from './Header'
import MultiSelect from 'react-native-multiple-select';

const interestsOptions = [
  {label: 'Photography', value: 'photography'},
  {label: 'Netflix & Chill', value: 'netflix'},
  {label: 'Coding', value: 'coding'},
  {label: 'Gaming', value: 'gaming'},
  {label: 'Singing', value: 'singing'},
  {label: 'Dancing', value: 'dancing'},
  {label: 'Music', value: 'music'},
  {label: 'Outing', value: 'outing'},
];

const Interests = (props) => {

  const [selected, setSelected] = useState([]);

  const _renderItem = item => {
    return (
    <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
    </View>
    );
  }  

  return (
    <View style={styles.container}>
      <Header title="My interests"/>

      <MultiSelect
      
        style={styles.dropdown}
        data={interestsOptions}
        labelField="label"
        valueField="value"
        label="Multi Select"
        placeholder="Add something"
        search
        searchPlaceholder="Search"
        value={selected}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#FF4E8D"
        tagBorderRadius="6"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{color: '#C4c4c4'}}
        onChange={item => {
          setSelected(item);
          console.log('selected', item);
        }}
        renderItem={item => _renderItem(item)}
      />

      <StyledButton page="Photo" text="Next"/>


    </View>
  );
};

export default Interests;
