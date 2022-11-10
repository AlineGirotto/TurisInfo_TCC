import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { React, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import estilo from "./css";

export default function ConsultaMensalidade({ navigation }) {  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);


  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>
          Suas mensalidades
        </Text>
        <View style={estilo.container3}></View>
      </View>
    </View>
  );
}