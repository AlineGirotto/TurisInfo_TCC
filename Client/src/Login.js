import {
  TextInput,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import estilo from "./css";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (x) => {
      if (x) {
        consulta(x.uid);
      }
    });
  }, []);

  async function consulta(uid) {
    const db = getFirestore();
    const q = query(collection(db, "Usuarios"), where("Uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().Adm) {
        navigation.navigate("DraNavi");
      } else {
        navigation.navigate("TabNavi");
      }
    });
  }

  async function login() {
    const db = getFirestore();
    const q = query(collection(db, "Usuarios"), where("Usuario", "==", email));
    const querySnapshot = await getDocs(q);
    await signInWithEmailAndPassword(auth, email, senha)
      .then((x) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().Adm) {
            navigation.navigate("DraNavi");
          } else {
            navigation.navigate("TabNavi");
          }
        });
      })
      .catch((error) => (alert("Erro no login"), setEmail(""), setSenha("")));
  }

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <View style={estilo.Logo}>
          <Text style={estilo.titulo}>Touris Info</Text>
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
          <TouchableOpacity style={estilo.btn} title="Entrar" onPress={login}>
            <Text style={estilo.textBtn}>Acessar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={estilo.btn2}
            title="Cadastrar login"
            onPress={() => navigation.navigate("CriarLogin")}
          >
            <Text style={{ color: "#004A85", fontSize: 15 }}>
              Não possui login? Cadastrar-se
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
  },
});
