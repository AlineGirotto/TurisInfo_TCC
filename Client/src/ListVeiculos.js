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
  setDoc,
  doc,
} from "firebase/firestore";
import { TextInputMask } from "react-native-masked-text";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import estilo from "./css";

export default function ListVeiculos({ navigation }) {
  const Status = ["Em manutenção", "Disponível", "Ocupado"];
  const Regular = ["Regularizado", "Pendente"];
  const [veiculo, setVeiculo] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [nome, setNome] = useState("");
  const [visible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({
    Modelo: "",
    Consumo: "",
    Capacidade: "",
    Fabricacao: "",
    Status: "",
    Regularizacao: "",
  });

  
  useEffect(() => {
    veiculos();
  }, []);

  function updateForm(value) {
    return setModalData((prev) => {
      return { ...prev, ...value };
    });
  }

  async function veiculos() {
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
    const q = query(collection(db, "Veiculos"), where("Modelo", "==", Modelo));
    const querySnapshot = await getDocs(q);
    let id = "";
    querySnapshot.forEach((doc) => {
      id = doc.data().Modelo;
    });
    await deleteDoc(doc(db, "Veiculos", id));
    veiculos();
    alert("Veículo excluído!");
  };

  const editUsu = async (item) => {
  setNome(item.Modelo);
   setModalVisible(!visible);
   setModalData({
      Modelo: item.Modelo,
      Consumo: item.Consumo,
      Capacidade: item.Capacidade,
      Fabricacao: item.Fabricacao,
      Status: item.Status,
      Regularizacao: item.Regularizacao,
    });
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
              onPress={() => editUsu(item)}
            >
              <Text style={estilo.textBtn2}>Editar</Text>
            </Pressable>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluirUsu(item.Modelo)}
            >
              <Text style={estilo.textBtn2}>Excluir</Text>
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  const ModalItem = () => {
    return (
      <View style={estilo.modal}>
        <Text style={estilo.titulo}>Editar veículo</Text>
        <TextInput
          style={estilo.input}
          placeholder={modalData.Modelo}
          value={modalData.Modelo}
          onChangeText={(e) => updateForm({ Modelo: e })}
        />
        <Text style={estilo.txtForm}>Consumo</Text>
        <TextInput
          style={estilo.input}
          placeholder={modalData.Consumo}
          keyboardType="numeric"
          value={modalData.Consumo}
          onChangeText={(e) => updateForm({ Consumo: e })}
        />
        <Text style={estilo.txtForm}>Capacidade</Text>
        <TextInput
          style={estilo.input}
          placeholder={modalData.Capacidade}
          value={modalData.Capacidade}
          onChangeText={(e) => updateForm({ Capacidade: e })}
          keyboardType="numeric"
          maxLength={3}
        />
        <Text style={estilo.txtForm}>Data de fabricação</Text>
        <TextInputMask
          style={estilo.input}
          placeholder="DD.MM.AAAA"
          type={"custom"}
          options={{
            mask: "99.99.9999",
          }}
          value={modalData.Fabricacao}
          onChange={(e) => updateForm({ Fabricacao: e.target.value })}
          keyboardType="numeric"
          maxLength={10}
        />
        <Text style={estilo.txtForm}>Status</Text>
        <SelectDropdown
            data={Status}
            onSelect={(selectedItem, index) => {
              updateForm({ Status: selectedItem });
            }}
            defaultButtonText={"Status"}
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
            dropdownStyle={estilo.DropdownStyle}
            buttonStyle={estilo.drop}
          />
          <Text style={estilo.txtForm}>Regularização</Text>
          <SelectDropdown
            data={Regular}
            onSelect={(selectedItem, index) => {
              updateForm({ Regularizacao: selectedItem });
            }}
            defaultButtonText={"Regularização"}
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
            dropdownStyle={estilo.DropdownStyle}
            buttonStyle={estilo.drop}
          />

        <TouchableOpacity
          style={estilo.btn}
          onPress={onSubmit}
        >
          <Text style={estilo.textBtn}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  function filtrado() {
    let filt = veiculo.filter(
      (item) => item.Modelo.toLowerCase().indexOf(filtro.toLowerCase()) > -1
    );
    setVeiculo(filt);
  }

  async function onSubmit() {
    const db = getFirestore();
    await deleteDoc(doc(db, "Veiculos", nome));
    await setDoc(doc(db, "Veiculos", modalData.Modelo), {
      Modelo: modalData.Modelo,
      Consumo: modalData.Consumo,
      Capacidade: modalData.Capacidade,
      Fabricacao: modalData.Fabricacao,
      Status: modalData.Status,
      Regularizacao: modalData.Regularizacao,
    });
    setModalVisible(!visible);
    alert("Cadastro realizado!");
    setModalData({
      Modelo: "",
      Consumo: "",
      Capacidade: "",
      Fabricacao: "",
      Status: "",
      Regularizacao: "",
    });
    veiculos();
  }

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
            onPress={() => filtrado()}
          >
            <Text style={estilo.textBtn2}>Filtar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#004A85",
              width: "auto",
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginLeft: "2%",
            }}
            onPress={() => veiculos()}
          >
            <Text style={estilo.textBtn2}>Mostrar tudo</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={estilo.flatList}
          data={veiculo}
          renderItem={renderItem}
          keyExtractor={(item) => item.Modelo}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setModalVisible(!visible);
          }}
        >
          <ModalItem />
        </Modal>
      </View>
    </View>
  );
}
