import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import estilo from "./css";
import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function CriarLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function cadastrarLogin() {
    const auth = getAuth();
    const db = getFirestore();
    await createUserWithEmailAndPassword(auth, email, senha).then(value =>{
      try {
        setDoc(doc(db, "Usuarios", value.user.uid), {
          Uid: value.user.uid,
          Usuario: email,
          Adm: false
        });        
        navigation.navigate("Login");
        alert("Cadastro realizado!");
      } catch (e) {
        console.error("Erro ao adicionar o documento: ", e);
      }
    }).catch(error => console.log(error));
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <View style={estilo.Logo}>
          <Text style={estilo.titulo}>Faça seu cadastro</Text>
        </View>
        <View style={estilo.login}>
          <TextInput
            style={estilo.input}
            placeholder="Digite seu e-mail"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={estilo.input}
            placeholder="Digite sua senha"
            autoCorrect={false}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={estilo.btn}
            title="Entrar"
            onPress={cadastrarLogin}
          >
            <Text style={estilo.textBtn}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    width: "80%",
    maxHeight: "70%",
    margin: "10%",
    backgroundColor: "#b5b5b5",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#004A85",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  }
});
