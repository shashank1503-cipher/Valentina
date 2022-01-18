import { createContext, useRef, useState } from "react";
import { Dimensions } from "react-native";

const AppContext = createContext();

export default AppContext;

export const AppProvider = ({ children }) => {
  const [HeaderState, setHeaderState] = useState(0);
  const changeHeader = (e) => {
    let scrollX = e.nativeEvent.contentOffset.x
    let width= Dimensions.get("window").width
    if (parseInt(scrollX) % parseInt(width) === 0){
        let counter = parseInt(scrollX) / parseInt(width)
        setHeaderState(counter%2)
    }
  };
  let scrollRef = useRef();
  let contextData = {
    headerState: HeaderState,
    SetHeaderState:setHeaderState,
    changeHeader: changeHeader,
    ScrollViewRef:scrollRef,
  };
  return (
    <AppContext.Provider value={contextData}>
      {children}
    </AppContext.Provider>
  );
};
