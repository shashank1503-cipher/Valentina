import {StyleSheet,Platform, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:45,
         paddingVertical:90,
         backgroundColor: '#fff',
         display: 'flex',
         flex: 1,
         alignSelf: 'center',         
    },
    subcontainer:{
        width:'95%',
    },
    heading: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:28,
        paddingBottom:20,
        fontWeight: 'bold',
    },
    input:{
        top:150,
        paddingVertical:12,
        paddingHorizontal:10,
        marginVertical: 8,
        position: "relative",
        borderWidth:1,
        borderColor:'#8c8c8c',
        borderRadius:6,
    },
    inputText:{        
        alignItems: "center",        
        color: '#8C8C8C',       
    },
   text:{
        "fontWeight": "500",
        "fontSize": 15,
        "lineHeight": 18,
        "textAlign": "center",
        "textTransform": "uppercase",
        "color": "#fff",
        "marginTop":"5%"
    },
  background: {          
        "width": 300,
        "height": 50,     
        "borderTopLeftRadius": 30,
        "borderTopRightRadius": 30,
        "borderBottomRightRadius": 30,
        "borderBottomLeftRadius": 30,
        elevation: 3,
    },
  button:{
        alignItems: "center",        
        top:280,
        justifyContent: "center",
    },
    date: {
        alignItems: "center", 
        top:180,
    },
    Welcometext: {
        paddingBottom:100,
    },
    Moretext: {
        alignItems: "center",
        paddingTop:10,
    },
    option: {
        borderColor: "#c4c4c4",
        borderWidth:1,
        paddingHorizontal:10,
        paddingVertical:12,
        marginVertical:8,
        borderRadius:6,
    },
    Searchcontainer:{
        backgroundColor:'#fff',
        height:'100%',
    },
    search:{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        color: '#8C8C8C',
    }
    
});

export default styles;