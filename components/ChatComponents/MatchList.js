import { View, Text, FlatList,ScrollView } from 'react-native';
import React from 'react';
import Match from './Match';

const MatchList = ({matches}) => {   

  console.log("Matches Lenght: ",matches.length)

//  matches = [...matches,...matches,...matches,...matches,...matches,...matches,...matches]

  console.log(matches)

  return  matches.length >= 0 ? (     
    

    <ScrollView
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
            paddingHorizontal: 10,
          }}
        >

          {
            matches.map(match =>{
              console.log(match)
              return (
                <Match key={match.id.toString()} matchDetails={match}/>
              )
            })
          }

        </View>

    </ScrollView>

    // <FlatList
    //   data={matches}
    //   keyExtractor={(item) => item.id.toString()}
    //   renderItem={({ item }) =>             
    //   (<Match matchDetails = {item}/>)
    //   }            
    // />                              
  ) :(
  <View>
    <Text>No match yet :( </Text>
  </View>);
};

export default MatchList;
