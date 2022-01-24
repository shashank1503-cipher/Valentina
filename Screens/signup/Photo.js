import { View, Text } from 'react-native';
import React from 'react';
import styles from './Style/Styles'
import StyledButton from '../../components/Buttons/StyledButton'
import Header from './Header'

const Photo = () => {
  return (
    <View style={styles.container}>
            <Header title="I am"/>
    </View>
  );
};

export default Photo;
