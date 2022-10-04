import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Card } from "react-native-paper";
import { React} from "react";

export default function consultamensalidade() {
  return (
    <View style={styles.container}>
      <Card><Text>OIII</Text></Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDFDF",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A4E3F9",
    width: "90%",
    maxHeight: "95%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#004A85",
  },
});
