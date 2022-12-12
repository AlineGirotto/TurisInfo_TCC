import { StyleSheet, Text, View, FlatList} from "react-native";
import { React, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import estilo from "./css";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Card } from "react-native-paper";

export default function ConsultaMensalidade({ navigation }) {
  const [mensalidade, setMensalidade] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
        mensalidades(user.email);
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  async function mensalidades(email) {
    const db = getFirestore();
    const q = query(collection(db, "Mensalidades"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
    }));
    data.map(async (elem) => {
      const workQ = query(collection(db, `Mensalidades/${JSON.stringify(email)}/Meses`));
      const workDetails = await getDocs(workQ);
      let a = [];
      workDetails.docs.map((doc) => {
        const x = {
          id: doc.id,
          Meses: doc.data().Meses,
          Valor: doc.data().Valor,
          Pago: doc.data().Pago,
        };
        a.push(x);
      });
      setMensalidade(a);
    });
  }

  const renderItem = ({ item }) => {
    let adm = false;
    let info = false;
    if (item.Pago) {
      adm = "Paga";
      info = {
        fontSize: RFPercentage(1.5),
        textAlign: "center",
        alignSelf: "center",
        marginLeft: "1%",
        fontStyle: "italic",
        color: "green",
      };
    } else {
      adm = "Não paga";
      info = {
        fontSize: RFPercentage(1.5),
        textAlign: "center",
        alignSelf: "center",
        marginLeft: "1%",
        fontStyle: "italic",
        color: "red",
      };
    }

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          marginBottom: "1%",
        }}
      >
        <Card style={estilo.card}>
          <Card.Content style={estilo.coluna}>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Mês:</Text>
              <Text style={estilo.info}>{item.Meses}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Valor das parcelas:</Text>
              <Text style={estilo.info}>{item.Valor}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Status</Text>
              <Text style={info}>{adm}</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Suas mensalidades</Text>
        <FlatList
          style={estilo.flatList}
          data={mensalidade}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
  container3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFDFDF",
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
});
