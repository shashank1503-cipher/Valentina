import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ChatRow from "./ChatRow";

const Chatlist = () => {
  //const [matches, setMatches] = useState([]);

  useEffect(
    //code to fetch matches from firebase
    () => {}
  );
  //static matches
  const matches = [
    {
      id: "X3lIhOpPycUGbOB9dK11WuJBFn43",
      name: "Bhavya",
      age: "20",
      batch: "2020",
      imageSrc: "matched2.png",
    },
    {
      id: "2",
      name: "Lucy",
      age: "28",
      batch: "2019",
      imageSrc: "matched1.png",
    },
    {
      id: "3",
      name: "Lucy",
      age: "19",
      batch: "2018",
      imageSrc: "matched4.png",
    },
    {
      id: "4",
      name: "Lucy",
      age: "21",
      batch: "2018",
      imageSrc: "matched3.png",
    },
  ];
  return matches.length > 0 ? (
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ChatRow matchDetails={item} />
      )}
    />
  ) : (
    <View>
      <Text>No matches yet :( </Text>
    </View>
  );
};

export default Chatlist;
