import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function login() {
    await signInWithEmailAndPassword(auth, email, senha).then(value =>{  
      navigation.navigate("TabNavi");
    }).catch(error => alert("Erro no login"));
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.Logo}>
          <Text style={{fontSize: 25}}>Faça o login</Text>
        </View>
        <View style={styles.login}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            autoCorrect={false}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />          
          <TouchableOpacity
            style={styles.btn}
            title="Entrar"
            onPress={login}
          >
            <Text style={styles.textBtn}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn2}
            title="Cadastrar login"
            onPress={() => navigation.navigate("CriarLogin")}
          >
            <Text style={{ color: "#004A85", fontSize: 15 }}>
              Cadastrar-se
            </Text>
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
    margin: "10%",
    backgroundColor: "#A4E3F9",
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
  },
  Logo: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%"
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
  btn2: {
    width: "90%",
    height: 45,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textBtn: {
    color: "#ffffff",
    fontSize: 18,
  },
});
