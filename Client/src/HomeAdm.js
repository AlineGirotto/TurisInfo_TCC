import { StyleSheet, Text, View } from "react-native";
import { React, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import estilo from "./css";

export default function HomeAdm({ navigation }) {
  const [users, SetUsers] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home Administrador");
        SetUsers(user);
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>
          Seja bem vindo(a) Administrador!
        </Text>
      </View>
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
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#004A85",
    marginTop: "1%",
    marginBottom: "5%",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  cards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "3%",
  },
  card: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    padding: 10,
    maxWidth: "30%",
    maxHeight: 150,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    margin: "5%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#004A85",
  },
  icon: {
    textAlign: "center",
    padding: "20%",
  },
});
