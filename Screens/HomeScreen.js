import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Post from "../components/Post/Post";
import { Dimensions, FlatList } from "react-native";
const data = [
  {
    id: "1",
    name: "Gal",
    age: "27",
    batch: "2020",
  },
  {
    id: "2",
    name: "Gal Gadot",
    age: "28",
    batch: "2019",
  },
  {
    id: "3",
    name: "Wonder Woman",
    age: "104",
    batch: "2018",
  },
];

const HomeScreen = () => {
//   const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Header />
      <FlatList
        data={data}
        renderItem={({item}) => <Post name={item.name} age={item.age} batch={item.batch} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
      {/* <Post /> */}
      <Footer />
    </SafeAreaView>
  );
};

export default HomeScreen;
