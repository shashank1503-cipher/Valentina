import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import styles from "../../components/Post/PostStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import Interest from "../../components/Interest/Interest";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import ReportModal from "../../components/Post/Modals/ReportModal";
const DisplayMatchedScreen = ({ route }) => {
  
  let { user } = useAuth();
  
  const navigation = useNavigation();
  const props = route.params;
  
  console.log(props.img)

  console.log(typeof props.img.profile_1)

  const onDisLikePress = () => {
  
    let personUID = props.id;
  
    setDoc(doc(db, "users", user.uid, "dislikes", personUID), {
      id: personUID,
    });
  
    deleteDoc(doc(db, "users", user.uid, "likes", personUID));
    deleteDoc(doc(db, "matches", props.mid));
  
    navigation.navigate("Chat");
  
    Alert.alert(
      "We'll never show you him again",
      `Next time you open the app the profile will not be shown to you`,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
  );
  };
  const [modalVisible, setModalVisible] = useState(false);
  const onReportPress = () => {
    setModalVisible(!modalVisible);
  };

  const emojiMap = {
    height: "📏",
    location: "📍",
    religion: "🛐",
    dob: "📅",
    star_sign: "🔯",
    looking_for: "🧑",
    pronouns: "🏳️‍🌈",
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator
        snapToInterval={Dimensions.get("window").width}
        decelerationRate={"fast"}
      >
        <View style={styles.firstPage}>
          <Image style={styles.image} source={{ uri: props.img["profile_1"] }} />
          <View style={styles.uiContainer}>
            <Text style={styles.textH}>
              {props.name.split(" ")[0]}, {props?.age}
            </Text>
            <Text style={styles.text}>{props.batch}</Text>
            <View style={[styles.rightContainer,{
              display: props.isUserProfile?'none':'flex'
            }]}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onDisLikePress}
              >
                <AntDesign
                  name="plus"
                  size={30}
                  color={"white"}
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onReportPress}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={30}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.aboutMeContainer}>
          <LinearGradient
            colors={["#FFFFFF", "#F9D7D5"]}
            style={{ height: "100%" }}
          >
            <Text style={styles.aboutMeHeading}>About Me</Text>
            <Text style={styles.aboutMeContent}>{props.bio}</Text>
            <View style={styles.uiContainer}>
              <View style={styles.leftContainer}>
              {props.aboutStuff.map((val) =>
                          val.value && (val.type !=="looking_for" && val.type !=="pronoun") ? (
                            <Interest
                              value={val.value}
                              emoji={emojiMap[val.type]}
                              type={val.type}
                            />
                          ) : (
                            <></>
                          )
                        )}
                        {props.languages.map((val) => (
                          <Interest value={val} emoji={emojiMap["language"]} />
                        ))}
              </View>
              <View style={[styles.rightContainer,{
                display: props.isUserProfile?'none':'flex'
              }]}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onDisLikePress}
                >
                  <AntDesign
                    name="plus"
                    size={30}
                    color={"white"}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onReportPress}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.firstPage}>
          <Image style={styles.image} source={{ uri: props.img.profile_2 }} />
          <View style={styles.uiContainer}>
            {/* <Text style={styles.textH}>
                    {props.name}, {props.age}
                  </Text>
                  <Text style={styles.text}>{props.batch}</Text> */}
            <View style={[styles.rightContainer, {
              display: props.isUserProfile?'none':'flex'
            }]}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onDisLikePress}
              >
                <AntDesign
                  name="plus"
                  size={30}
                  color={"white"}
                  style={{ transform: [{ rotate: "45deg" }] }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={onReportPress}
              >
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={30}
                  color={"white"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.aboutMeContainer}>
          <LinearGradient
            colors={["#FFFFFF", "#F9D7D5"]}
            style={{ height: "100%" }}
          >
            <Text style={styles.aboutMeHeading}>Interests</Text>
            <View style={styles.uiContainer}>
              <View style={styles.interestContainer}>
                {props.interests.map((val) => (
                  <Interest value={val} />
                ))}
              </View>
              <View style={[styles.rightContainer, {
                display: props.isUserProfile?'none':'flex'
              }]}>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onDisLikePress}
                >
                  <AntDesign
                    name="plus"
                    size={30}
                    color={"white"}
                    style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={onReportPress}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color={"white"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>
        {Object.keys(props.profilePrompts)[0] ? (
          props.img.background ? (
            <View style={styles.firstPage}>
              <Image
                style={styles.image}
                source={{ uri: props.img.background }}
              />
              <View style={styles.overlay}>
                <Text style={styles.promptType}>
                  {Object.keys(props.profilePrompts)[0]}
                </Text>
                <Text style={styles.promptText}>
                  {Object.values(props.profilePrompts)[0]}
                </Text>
                <View style={[styles.rightContainer,{
                  display: props.isUserProfile?'none':'flex'
                }]}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onDisLikePress}
                  >
                    <AntDesign
                      name="plus"
                      size={30}
                      color={"white"}
                      style={{ transform: [{ rotate: "45deg" }] }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onReportPress}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.aboutMeContainer}>
              <LinearGradient
                colors={["#FFFFFF", "#F9D7D5"]}
                style={{ height: "100%" }}
              >
                <Text style={[styles.promptType, { color: "#292C6D" }]}>
                  {Object.keys(props.profilePrompts)[0]}
                </Text>
                <Text style={[styles.promptText, { color: "#292C6D" }]}>
                  {Object.values(props.profilePrompts)[0]}
                </Text>
                <View style={styles.uiContainer}>
                  <View style={[styles.rightContainer, {
                    display: props.isUserProfile?'none':'flex'
                  }]}>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onDisLikePress}
                    >
                      <AntDesign
                        name="plus"
                        size={30}
                        color={"white"}
                        style={{ transform: [{ rotate: "45deg" }] }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={onReportPress}
                    >
                      <MaterialCommunityIcons
                        name="dots-vertical"
                        size={30}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
          )
        ) : (
          <></>
        )}
        {Object.keys(props.profilePrompts)[1] ? (
          <View style={styles.aboutMeContainer}>
            <LinearGradient
              colors={["#FFFFFF", "#F9D7D5"]}
              style={{ height: "100%" }}
            >
              <Text style={[styles.promptType, { color: "#292C6D" }]}>
                {Object.keys(props.profilePrompts)[0]}
              </Text>
              <Text style={[styles.promptText, { color: "#292C6D" }]}>
                {Object.values(props.profilePrompts)[0]}
              </Text>
              <View style={styles.uiContainer}>
                <View style={[styles.rightContainer,{
                  display: props.isUserProfile?'none':'flex'
                }]}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onDisLikePress}
                  >
                    <AntDesign
                      name="plus"
                      size={30}
                      color={"white"}
                      style={{ transform: [{ rotate: "45deg" }] }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onReportPress}
                  >
                    <MaterialCommunityIcons
                      name="dots-vertical"
                      size={30}
                      color={"white"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <></>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.endView}>
          <View style={styles.modalView}>
            {/* <TouchableOpacity>
              <Text style={[styles.modalText, { color: "#FF0000" }]}>
                Report
              </Text>
            </TouchableOpacity> */}
            <ReportModal props={props} />
            <TouchableOpacity onPress={()=>{
               Alert.alert(
                "Email",
                props.email,
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            }}>
              <Text style={styles.modalText}>Get Email Id</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={[styles.modalText, { color: "#FF4E8C" }]}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DisplayMatchedScreen;
