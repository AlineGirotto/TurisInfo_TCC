import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Login() {
  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.Logo}>
          <Text>LOGO</Text>
        </View>
        <View style={styles.login}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu login"
            autoCorrect={false}
            onChange={() => {}}
          />
          <TextInput
            style={styles.input}            
            placeholder="Digite sua senha"
            autoCorrect={false}
            secureTextEntry
            onChange={() => {}}
          />
          <TouchableOpacity
            style={styles.btn}
            title="Entrar"
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.textBtn}>Acessar</Text>
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
    backgroundColor: "#DFDFDF",
  },
  container: {
    flex: 1,
    width: "80%",
    maxHeight: "70%",
    margin: '10%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#004A85',
  },
  Logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#F5F5F5",
    width: "90%",
    marginBottom: 15,
    color: "#000000",
    fontSize: 17,
    borderRadius: 10,
    padding: 10,
  },
  btn: {
    backgroundColor: "#004A85",
    width: "90%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textBtn: {
    color: "#ffffff",
    fontSize: 18,
  },
});
