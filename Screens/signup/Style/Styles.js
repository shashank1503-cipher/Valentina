import {StyleSheet,Platform, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:40,
        paddingTop:5,
         backgroundColor: '#fff',
         display: 'flex',
         flex: 1,
    },
    heading: {
        fontSize:28,
        paddingTop:25,
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
    position: "relative",
        alignItems: "center",        
        top:250,
        justifyContent: "center",
    },
    date: {
        alignItems: "center", 
        top:180,
    },
    Welcometext: {
        paddingTop:5,
        paddingBottom:70,
    },
    Moretext: {
        alignItems: "center",
        paddingTop:10,
        marginBottom:-70,
    },
    btn:{
        backgroundColor: "#fff",
        color: '#000',
    },
    btnNormal: {
        borderColor: "#c4c4c4",
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:12,
        marginVertical:8,
        borderRadius:6,
        alignItems: "center",
        justifyContent: "center",
      },
      btnPress: {
        borderColor: '#000',
        backgroundColor:'#000',
        color: '#fff',
        borderWidth: 1,
        paddingHorizontal:20,
        paddingVertical:12,
        marginVertical:8,
        borderRadius:6,
        alignItems: "center",
        justifyContent: "center",
        
      },
    option: {
        borderColor: "#c4c4c4",
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:12,
        marginVertical:8,
        borderRadius:6,
        alignItems: "center",
        justifyContent: "center",
    },
    Searchcontainer:{
        backgroundColor:'#fff',
        height:'100%',
    },
    search:{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        color: '#8C8C8C',
    },
    IdentityConfirmationPress:{
        borderColor: "#c4c4c4",
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:12,
        marginVertical:8,
        borderRadius:6,
        alignItems: "center",
        justifyContent: "center",
    },
    showOnProfile: {
        position: 'relative',
        top:40,
        borderColor: "#c4c4c4",
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:12,
        marginVertical:8,
        borderRadius:6,
        paddingBottom:-30
    },
    subcontainer:{
        justifyContent: "center",
    },
    toggleSwitch: {
        top:-20,
    },
    showText: {
        fontSize:20,
        marginBottom:-20,
    },
    turnText: {
        marginBottom:8,
        width:'80%',
        fontSize:14,
        color: '#817B7B'
    },
    sexcontainer: {
        position: 'relative',
        paddingTop:50,
        marginBottom:-120
    },
    interestsconatiner: {
        position: 'relative',
        paddingTop:100,
        marginBottom:-50,
    }, 
    dropdown: {
        paddingTop:30,
        borderBottomWidth:1,
        borderBottomColor: "#c4c4c4",
        color: '#8E8E8E',
        
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    textItem: {
        flex: 1,
        fontSize: 16,       
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    circle:{
        backgroundColor:'#c4c4c4',
        height:150,
        width:150,
        borderRadius:80,
        paddingVertical:12,
        left:'28%',
        top:70,
        alignItems:'center',
    },
    icon:{        
        top:30,
    },
    camcontainer:{
        flexDirection: 'column',
        position: 'relative',
        top:120,
        width:'90%',
    },
    subcamcontainer:{
        flexDirection: 'row',
        borderBottomWidth:1,
        paddingVertical:8,
        marginBottom:8,
        borderRadius:2,
    },
    opicons:{
        paddingRight:60,
        marginBottom:2,
    },
    optext:{
        marginBottom:-5,
    }

    
    
});

export default styles;