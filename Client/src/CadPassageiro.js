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

export default function CadPassageiro({ navigation }) {
  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Cadastre um novo passageiro</Text>
        <View style={estilo.container3}>
          <Text style={estilo.txt2}>Nome</Text>
          <TextInput style={estilo.input} placeholder="Digite o Nome" />

          <TouchableOpacity style={estilo.btn}>
            <Text style={estilo.textBtn}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}