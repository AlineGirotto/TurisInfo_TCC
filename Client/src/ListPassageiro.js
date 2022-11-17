import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useEffect } from "react";
import estilo from "./css";
import { TextInputMask } from "react-native-masked-text";

export default function ListPassageiro({ navigation }) {
  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Passageiros Cadastrados</Text>
        <View style={estilo.container3}>
        </View>
      </View>
    </View>
  );
}