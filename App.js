import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={[styles.white]}>Valentina</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4E8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  white: {
    color:"white",
    fontFamily:'Lato',
    fontSize:30,
  }
});
