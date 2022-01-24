import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const DoubleClick = (props) => {
  const delayTime = props.delay ? props.delay : 300;
  const [firstPress, setFirstPress] = useState(true);
  const [lastTime, setLastTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  let timer = false;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeout = props.timeout ? props.timeout : 1000;
  useEffect(() => {
    if (modalVisible) {
      fadeIn();
      setTimeout(() => {
        fadeOut();
      }, timeout);
      setModalVisible(false);
    }
  }, [fadeIn, fadeOut, modalVisible]);

  useEffect(() => {
    if (timer) clearTimeout(timer);
  }, [timer]);

  const onPress = () => {
    const now = new Date().getTime();

    if (firstPress) {
      setFirstPress(false);

      timer = setTimeout(() => {
        setFirstPress(true);
      }, delayTime);

      setLastTime(now);
    } else if (now - lastTime < delayTime) {
      setModalVisible(true);
      if (timer) clearTimeout(timer);
      props.doubleClick();
      setFirstPress(true);
    }
  };

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
      easing: Easing.in(),
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        {props.icon && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              ...styles.favoriteIcon,
            }}
          >
            <AntDesign
              name="heart"
              size={props.size ? props.size : 120}
              color={props.color ? props.color : "#F60711"}
            />
          </Animated.View>
        )}
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  favoriteIcon: {
    position: "absolute",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginTop: Dimensions.get("window").height * 0.5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DoubleClick;
