import { createContext, useState } from "react";
import { Dimensions } from "react-native";

const AppContext = createContext();

export default AppContext;

export const AppProvider = ({ children }) => {
  const [HeaderState, setHeaderState] = useState(0);
  const changeHeader = (e) => {
    let scrollX = e.nativeEvent.contentOffset.x;
    let width = Dimensions.get("window").width;
    if (parseInt(scrollX) % parseInt(width) === 0) {
      let counter = parseInt(scrollX) / parseInt(width);
      setHeaderState(counter % 2);
    }
  };
  const [scrollViewRef, setScrollViewRef] = useState(null);
  const [horizontalScrollRef, setHorizontalScrollRef] = useState(null);
  const [totalProfiles,setTotalProfiles]= useState(-1)
  let contextData = {
    headerState: HeaderState,
    SetHeaderState: setHeaderState,
    changeHeader: changeHeader,
    ScrollViewRef: scrollViewRef,
    SetScrollViewRef: setScrollViewRef,
    HorizontalScrollViewRef: horizontalScrollRef,
    SetHorizontalScrollViewRef: setHorizontalScrollRef,
    totalProfiles:totalProfiles,
    setTotalProfiles:setTotalProfiles
  };
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};
