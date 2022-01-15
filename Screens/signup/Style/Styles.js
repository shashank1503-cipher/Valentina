import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    conatiner: {
        justifyContent: 'center',
        paddingRight:20,
        paddingLeft:20,
        
        display: 'flex',
    },
    subcontainer:{
        width:'95%',
    },
    heading: {
        top:60,        
        fontSize:30,
        paddingBottom:20,
    },
    input:{
        top:150,
        paddingBottom:20,
        position: "relative",
    },
    inputText:{
        top:160,
        alignItems: "center",
        
        color: '#8C8C8C',
    },
    button: {
  "position": "absolute",
  "width": 330,
  "height": 50,
  "left": 35,
  "top": 500,
  "backgroundColor": "#FFFFFF",
  "borderTopLeftRadius": 30,
  "borderTopRightRadius": 30,
  "borderBottomRightRadius": 30,
  "borderBottomLeftRadius": 30,
  elevation: 3,
},
text:{
    "fontWeight": "500",
    "fontSize": 15,
    "lineHeight": 18,
    "textAlign": "center",
    "textTransform": "uppercase",
    "color": "#373737",
    "marginTop":"5%"
  }
    
});

export default styles;