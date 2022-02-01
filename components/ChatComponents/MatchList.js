import { View, Text, FlatList, } from 'react-native';
import React from 'react';
import Match from './Match';

const MatchList = ({matches}) => {   
  //console.log("Hi",matches); 
  return  matches.length > 0 ? (          
    <FlatList
    data={matches}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) =>             
     (<Match matchDetails = {item}/>)
    }            
    />                              
  ) :(
  <View>
    <Text>No match yet :( </Text>
  </View>);
};

export default MatchList;
