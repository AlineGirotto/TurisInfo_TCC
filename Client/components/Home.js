import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { React, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebaseConfig";

export default function Home({ navigation }) {

  useEffect(() => {
    const logado = auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate("Home")
      }else{
        navigation.navigate("Login")
      }
    })

    return logado; 
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={{ padding: 10, fontWeight: "bold", fontSize: 25 }}>
          Seja bem vindo(a)!
        </Text>
        <View style={styles.cards}>
          <Card
            style={styles.card}
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
              style={styles.icon}
            />
          </Card>
          <Card
            style={styles.card}
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
              style={styles.icon}
            />
          </Card>
          <Card
            style={styles.card}
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
              style={styles.icon}
            />
          </Card>
        </View>
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
