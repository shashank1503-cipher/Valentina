import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import styles from "./MatchModalStyles";

const MatchModal = ({isVisible}) => {
let navigation = useNavigation();
const [modalVisible, setModalVisible] = useState(isVisible);
  return (
    <View style={styles.container}>
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
            <Text
              style={[styles.modalText, { color: "#FF4E8C", fontSize: 40 }]}
            >
              It's a match!!
            </Text>
              <Text style={[styles.modalText,{fontSize:15}]}>
                Head over to match screen to see them
              </Text>
            <TouchableOpacity onPress={()=>{
                setModalVisible(!modalVisible)
            }}>
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

export default MatchModal;
