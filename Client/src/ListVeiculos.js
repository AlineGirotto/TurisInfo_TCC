import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Card } from "react-native-paper";
import { React, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import estilo from "./css";

export default function ListVeiculos({ navigation }) {
  const [veiculo, setVeiculo] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [visible, setModalVisible] = useState(false);

  useEffect(() => {
    usuarios();
  }, [filtro, veiculo]);

  async function usuarios() {
    const db = getFirestore();
    const q = query(collection(db, "Veiculos"), where("Modelo", "!=", " "));
    const querySnapshot = await getDocs(q);
    let a = [];
    querySnapshot.forEach((doc) => {
      const x = {
        Modelo: doc.data().Modelo,
        Consumo: doc.data().Consumo,
        Capacidade: doc.data().Capacidade,
        Fabricacao: doc.data().Fabricacao,
        Status: doc.data().Status,
        Regularizacao: doc.data().Regularizacao,
      };
      a.push(x);
    });
    setVeiculo(a);
  }

  const excluirUsu = async (Modelo) => {
    const db = getFirestore();
    const q = query(collection(db, "Veiculos"),where("Modelo", "==", Modelo));
    const querySnapshot = await getDocs(q);
    let id = "";
    querySnapshot.forEach((doc) => {
      id = doc.data().Modelo;
    });
    await deleteDoc(doc(db, "Veiculos", id));
    usuarios();
    alert("Veículo excluído!");
  };

  const renderItem = ({ item }) => {
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
              <Text style={estilo.txtFlat}>Modelo:</Text>
              <Text style={estilo.info}>{item.Modelo}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Consumo:</Text>
              <Text style={estilo.info}>{item.Consumo}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Capacidade:</Text>
              <Text style={estilo.info}>{item.Capacidade}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Fabricacao:</Text>
              <Text style={estilo.info}>{item.Fabricacao}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Status:</Text>
              <Text style={estilo.info}>{item.Status}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Regularização:</Text>
              <Text style={estilo.info}>{item.Regularizacao}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={estilo.cardAct}>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluirUsu(item.Modelo)}
            >
              <Text style={estilo.textBtn2}>Excluir veículo</Text>
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Veículos cadastrados:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            marginRight: "5%",
          }}
        >
          <TextInput
            style={estilo.inputF}
            placeholder="Filtro"
            value={filtro}
            onChangeText={(text) => setFiltro(text)}
          />
        </View>
        <FlatList
          style={estilo.flatList}
          data={
            filtro
              ? veiculo.filter(
                  (item) =>
                    item.Modelo.toLowerCase().indexOf(filtro.toLowerCase()) > -1
                )
              : veiculo
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.Modelo}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!visible);
          }}
        >
          <View >
            <View >
              <Text>Hello World!</Text>
              <Pressable
              
                onPress={() => setModalVisible(!visible)}
              >
                <Text>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
