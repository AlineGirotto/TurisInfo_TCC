import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { React, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
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

export default function Instituicao({ navigation }) {
  const [instituicao, setInstituicao] = useState([]);
  const [filtro, setFiltro] = useState(""); 
  const [submit, setSubmit] = useState("");
  const [nome, setNome] = useState("");
  const [visible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    NomeInst: "",
    CEP: "",
    Estado: "",
    Cidade: "",
    Bairro: "",
    Rua: "",
    Complemento: "",
    Numero: "",
  });

  useEffect(() => {
    instituicoes();
  }, []);

  async function instituicoes() {
    const db = getFirestore();
    const q = query(collection(db, "Instituicoes"), where("NomeInst", "!=", " "));
    const querySnapshot = await getDocs(q);
    let a = [];
    querySnapshot.forEach((doc) => {
      const x = {
        id: doc.id,
        NomeInst: doc.data().NomeInst,
        CEP: doc.data().CEP,
        Estado: doc.data().Estado,
        Cidade: doc.data().Cidade,
        Bairro: doc.data().Bairro,
        Rua: doc.data().Rua,
        Complemento: doc.data().Complemento,
        Numero: doc.data().Numero,
      };
      a.push(x);
    });
    setInstituicao(a);
  }

  const muda = async (item) => { 
    setSubmit("edit");
    setNome(item.NomeInst);
    setModalVisible(!visible);
    setForm({
      NomeInst: item.NomeInst,
      CEP: item.CEP,
      Estado: item.Estado,
      Cidade: item.Cidade,
      Bairro: item.Bairro,
      Rua: item.Rua,
      Complemento: item.Complemento,
      Numero: item.Numero,
     });
  };

  const excluir = async (user) => {
    const db = getFirestore();
    const q = query(collection(db, "Instituicoes"), where("NomeInst", "==", user));
    const querySnapshot = await getDocs(q);
    let id = "";
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    await deleteDoc(doc(db, "Instituicoes", id));
    instituicoes();
    alert("Instituição excluída!");
  };

  
  const add = async () => {
    setSubmit("add");
    setModalVisible(!visible);
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
              <Text style={estilo.info}>{item.NomeInst}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>CEP:</Text>
              <Text style={estilo.info}>{item.CEP}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Bairro:</Text>
              <Text style={estilo.info}>{item.Bairro}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Rua:</Text>
              <Text style={estilo.info}>{item.Rua}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Numero:</Text>
              <Text style={estilo.info}>{item.Numero}</Text>
            </View> 
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Complemento:</Text>
              <Text style={estilo.info}>{item.Complemento}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Cidade:</Text>
              <Text style={estilo.info}>{item.Cidade}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Estado:</Text>
              <Text style={estilo.info}>{item.Estado}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={estilo.cardAct}>
            <Pressable style={estilo.btncard} onPress={() => muda(item)}>
              <Ionicons name="pencil-outline" size={25} color={"white"} />
            </Pressable>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluir(item.NomeInst)}
            >
              <Ionicons name="trash-outline" size={25} color={"white"} />
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  
  function filtrado() {
    let filt = usuario.filter(
      (item) => item.usuario.toLowerCase().indexOf(filtro.toLowerCase()) > -1
    );
    setInstituicao(filt);
  }

  async function onSubmit() {
    if (submit == "edit") {
      const db = getFirestore();
      await deleteDoc(doc(db, "Instituicoes", nome));
      await setDoc(doc(db, "Veiculos", form.NomeInst), {
        NomeInst: form.NomeInst,
        Consumo: form.Consumo,
        Capacidade: form.Capacidade,
        Fabricacao: form.Fabricacao,
        Status: form.Status,
        Regularizacao: form.Regularizacao,
      });
      alert("Edição realizada!");
    } else if (submit == "add") {
      const db = getFirestore();
      await setDoc(doc(db, "Instituicoes", form.Modelo), {
        NomeInst: form.NomeInst,
        Consumo: form.Consumo,
        Capacidade: form.Capacidade,
        Fabricacao: form.Fabricacao,
        Status: form.Status,
        Regularizacao: form.Regularizacao,
      });
      alert("Cadastro realizado!");
    }
    setModalVisible(!visible);
    setForm({
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
        <Text style={estilo.titulo2}>Instituições cadastrados no sistema:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "90%",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#004A85",
              width: "auto",
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              padding: 2,
              marginRight: '10%'
            }}
            onPress={() => add()}
          >
            <Ionicons name="add-outline" size={15} color={"white"} />
            <Text style={estilo.textBtn2}>Adicionar instituição</Text>
          </TouchableOpacity>

          <TextInput
            style={estilo.inputF}
            placeholder="Filtro"
            value={filtro}
            onChangeText={(text) => setFiltro(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#004A85",
              width: "auto",
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginLeft: '0.5%',
              padding:'1%'
            }}
            onPress={() => filtrado()}
          >
            <Ionicons name="search-outline" size={25} color={"white"}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#004A85",
              width: "auto",
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginLeft: '1.5%'
            }}
            onPress={() => instituicoes()}
          >
            <Text style={estilo.textBtn2}>Mostrar tudo</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={estilo.flatList}
          data={instituicao}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
         <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setModalVisible(!visible);
          }}
        >
          <View style={estilo.modal}>
            <Ionicons
              name="close-circle-outline"
              size={25}
              color={"black"}
              onPress={() => {
                setModalVisible(!visible);
              }}
              style={{ alignSelf: "flex-end" }}
            />
            <Text style={estilo.titulo2}>Editar dados</Text>
            

            <TouchableOpacity style={estilo.btn} onPress={onSubmit}>
              <Text style={estilo.textBtn}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}
