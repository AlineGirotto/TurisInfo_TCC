import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
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
  doc,
} from "firebase/firestore";
import estilo from "./css";
import { Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import SelectDropdown from "react-native-select-dropdown";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Viagens({ navigation }) {
  const Turnos = ["Manhã", "Tarde", "Noite"];
  const [viagem, setViagem] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    viagens();
  }, []);

  async function viagens() {
    const db = getFirestore();
    const q = query(collection(db, "Viagens"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    data.map(async (elem) => {
      const workQ = query(
        collection(db, `Viagens/${JSON.stringify(busca)}/Nomes`)
      );
      const workDetails = await getDocs(workQ);
      let a = [];
      const workInfo = workDetails.docs.map((doc) => {
        const x = {
          id: doc.id,
          Nome: doc.data().Nome,
          Data: doc.data().Data,
          Ida: doc.data().Ida,
          Volta: doc.data().Volta,
        };
        a.push(x);
      });
      setViagem(a);
    });
  }

  const excluirUsu = async (user) => {
    const db = getFirestore();
    const q = query(collection(db, "Usuarios"), where("Usuario", "==", user));
    const querySnapshot = await getDocs(q);
    let id = "";
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    await deleteDoc(doc(db, "Usuarios", id));
    viagens();
    alert("Usuário excluído!");
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
              <Text style={estilo.txtFlat}>Nome:</Text>
              <Text style={estilo.info}>{item.Nome}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Ida:</Text>
              <Text style={estilo.info}>{item.Ida}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Volta:</Text>
              <Text style={estilo.info}>{item.Volta}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={estilo.cardAct}>
            <Pressable
              style={estilo.btncard}
              onPress={() => mudaAdm(item.Nome)}
            >
              <Text style={estilo.textBtn2}>Mudar Permissão</Text>
            </Pressable>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluirUsu(item.Nome)}
            >
              <Ionicons name="trash-outline" size={25} color={"white"} />
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  function filtrado() {}

  function filtrado2() {
    let filt = viagem.filter((item) => item.Volta == filtro);
    setViagem(filt);
  }

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Viagens</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            marginRight: "5%",
            marginBottom: "5%",
          }}
        >
          <TextInputMask
            style={estilo.inputF}
            placeholder="Digite uma data"
            type={"custom"}
            options={{
              mask: "99.99.9999",
            }}
            value={busca}
            onChangeText={(text) => setBusca(text)}
            keyboardType="numeric"
            maxLength={10}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#004A85",
              width: "20%",
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginLeft: "2%",
            }}
            onPress={() => viagens()}
          >
            <Text style={estilo.textBtn2}>Buscar</Text>
          </TouchableOpacity>
          <SelectDropdown
            data={Turnos}
            value={filtro}
            onSelect={(selectedItem, index) => {
              let filt = viagem.filter((item) => item.Ida == selectedItem);
              setViagem(filt);
            }}
            defaultButtonText={"Ida"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <Ionicons
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={style.DropdownStyle}
            buttonStyle={style.drop}
          />
          <SelectDropdown
            data={Turnos}
            value={filtro}
            onSelect={(selectedItem, index) => {
              let filt = viagem.filter((item) => item.Volta == selectedItem);
              setViagem(filt);
            }}
            defaultButtonText={"Volta"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <Ionicons
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  color={"#444"}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={style.DropdownStyle}
            buttonStyle={style.drop}
          />
        </View>
        <Text style={estilo.titulo}>{"Data da viagem: " + busca}</Text>
        <FlatList
          style={estilo.flatList}
          data={viagem}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  DropdownStyle: {
    backgroundColor: "#ffffff",
    height: "auto",
    color: "#000000",
    fontSize: RFPercentage(1.5),
    borderRadius: 10,
    borderColor: "#004A85",
    borderWidth: 1,
  },
  drop: {
    backgroundColor: "#F5F5F5",
    height: 45,
    width: "auto",
    color: "#000000",
    fontSize: RFPercentage(1.5),
    borderRadius: 10,
    borderColor: "#004A85",
    borderWidth: 1,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: "3%",
  },
});
