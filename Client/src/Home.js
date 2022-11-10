import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { React, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import estilo from "./css"

export default function Home({ navigation }) {
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        signOut(auth).then(() => {
          navigation.navigate("Login");
        })
      }
    });
  }, []);

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>
          Seja bem vindo(a)!
        </Text>
        <View style={estilo.cardsH}>
          <Card
            style={estilo.cardH}
            onPress={() => navigation.navigate("Consultar Mensalidade")}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, color: "#004A85" }}
            >
              Consultar as mensalidades
            </Text>
            <Ionicons
              name="ios-document-text-outline"
              size={45}
              color={"#004A85"}
              style={estilo.icon}
            />
          </Card>
          <Card
            style={estilo.cardH}
            onPress={() => navigation.navigate("Registar Viagem")}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, color: "#004A85" }}
            >
              Registrar horário de viagem
            </Text>
            <Ionicons
              name="md-time-outline"
              size={45}
              color={"#004A85"}
              style={estilo.icon}
            />
          </Card>
          <Card
            style={estilo.cardH}
            onPress={() => navigation.navigate("Efetuar Pagamento")}
          >
            <Text
              style={{ textAlign: "center", fontSize: 15, color: "#004A85" }}
            >
              Efetuar pagamentos
            </Text>
            <Ionicons
              name="md-cash-outline"
              size={45}
              color={"#004A85"}
              style={estilo.icon}
            />
          </Card>
        </View>
      </View>
    </View>
  );
}