import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
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
  setDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { TextInputMask } from "react-native-masked-text";
import estilo from "./css";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function Instituicao({ navigation }) {
  const [instituicao, setInstituicao] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [dropcfp, setdropcfp] = useState(false);
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

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function instituicoes() {
    const db = getFirestore();
    const q = query(
      collection(db, "Instituicoes"),
      where("NomeInst", "!=", " ")
    );
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

  async function executaPesquisa() {
    const url = "https://viacep.com.br/ws/" + form.CEP + "/json/";

    try {
      const res = await fetch(url);
      const jsres = await res.json();

      let comp = jsres.complemento;
      if (comp == "") {
        comp = "_";
      }
      await updateForm({
        Estado: jsres.uf,
        Cidade: jsres.localidade,
        Bairro: jsres.bairro,
        Rua: jsres.logradouro,
        Complemento: comp,
      });
    } catch (erro) {
      alert("Erro ao buscar CEP informado.");
    }
    setdropcfp(true);
  }

  const muda = async (item) => {
    setSubmit("Edição");
    setdropcfp(true);
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
    const q = query(
      collection(db, "Instituicoes"),
      where("NomeInst", "==", user)
    );
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
    setSubmit("Cadastro");
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
    let filt = instituicao.filter(
      (item) => item.NomeInst.toLowerCase().indexOf(filtro.toLowerCase()) > -1
    );
    setInstituicao(filt);
  }

  async function onSubmit() {
    if (submit == "Edição") {
      const db = getFirestore();
      await deleteDoc(doc(db, "Instituicoes", nome));
      await setDoc(doc(db, "Instituicoes", form.NomeInst), {
        NomeInst: form.NomeInst,
        CEP: form.CEP,
        Estado: form.Estado,
        Cidade: form.Cidade,
        Bairro: form.Bairro,
        Rua: form.Rua,
        Complemento: form.Complemento,
        Numero: form.Numero,
      });
      alert("Edição realizada!");
    } else if (submit == "Cadastro") {
      const db = getFirestore();
      await setDoc(doc(db, "Instituicoes", form.NomeInst), {
        NomeInst: form.NomeInst,
        CEP: form.CEP,
        Estado: form.Estado,
        Cidade: form.Cidade,
        Bairro: form.Bairro,
        Rua: form.Rua,
        Complemento: form.Complemento,
        Numero: form.Numero,
      });
      alert("Cadastro realizado!");
    }
    setModalVisible(!visible);
    setForm({
      NomeInst: "",
      CEP: "",
      Estado: "",
      Cidade: "",
      Bairro: "",
      Rua: "",
      Complemento: "",
      Numero: "",
    });
    setdropcfp(false);
    instituicoes();
  }

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo2}>Instituições cadastradas</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "90%",
            marginBottom: "2%",
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
              marginRight: "10%",
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
              marginLeft: "0.5%",
              padding: "1%",
            }}
            onPress={() => filtrado()}
          >
            <Ionicons name="search-outline" size={25} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#004A85",
              width: "auto",
              height: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              marginLeft: "1.5%",
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
                setForm({
                  NomeInst: "",
                  CEP: "",
                  Estado: "",
                  Cidade: "",
                  Bairro: "",
                  Rua: "",
                  Complemento: "",
                  Numero: "",
                });
                setdropcfp(false);
              }}
              style={{ alignSelf: "flex-end" }}
            />
            <Text style={estilo.titulo2}>{submit + " dos dados"}</Text>
            <SafeAreaView style={{ width: "100%", maxHeight: "80%" }}>
              <ScrollView contentContainerStyle={estilo.ScrollView}>
                <TextInput
                  style={estilo.input}
                  placeholder="Digite o nome da instituição"
                  value={form.NomeInst}
                  onChangeText={(e) => updateForm({ NomeInst: e })}
                />
                <View
                  style={{
                    width: "90%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <TextInputMask
                    style={{
                      backgroundColor: "#F5F5F5",
                      width: "90%",
                      color: "#000000",
                      fontSize: RFPercentage(1.5),
                      borderRadius: 10,
                      borderWidth: 0.5,
                      padding: 10,
                      borderColor: "#004A85",
                      shadowColor: "black",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.58,
                      shadowRadius: 5,
                      elevation: 10,
                    }}
                    type={"zip-code"}
                    placeholder="Digite o CEP"
                    value={form.CEP}
                    onChangeText={(e) => updateForm({ CEP: e })}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#004A85",
                      width: "auto",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      marginLeft: "1%",
                      padding: "1%",
                    }}
                    onPress={() => executaPesquisa()}
                  >
                    <Ionicons name="search-outline" size={15} color={"white"} />
                  </TouchableOpacity>
                </View>
                {dropcfp && (
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <TextInput
                      style={estilo.input}
                      placeholder="Digite o bairro"
                      value={form.Bairro}
                      onChangeText={(e) => updateForm({ Bairro: e })}
                    />
                    <TextInput
                      style={estilo.input}
                      placeholder="Digite a rua"
                      value={form.Rua}
                      onChangeText={(e) => updateForm({ Rua: e })}
                    />
                    <TextInput
                      style={estilo.input}
                      placeholder="Digite o número"
                      value={form.Numero}
                      onChangeText={(e) => updateForm({ Numero: e })}
                    />
                    <TextInput
                      style={estilo.input}
                      placeholder="Digite o complemento"
                      value={form.Complemento}
                      onChangeText={(e) => updateForm({ Complemento: e })}
                    />
                    <TextInput
                      style={estilo.input}
                      placeholder="Digite a cidade"
                      value={form.Cidade}
                      onChangeText={(e) => updateForm({ Cidade: e })}
                    />
                    <TextInput
                      style={estilo.input}
                      placeholder="Digite o estado"
                      value={form.Estado}
                      onChangeText={(e) => updateForm({ Estado: e })}
                    />
                  </View>
                )}
                <TouchableOpacity style={estilo.btn} onPress={onSubmit}>
                  <Text style={estilo.textBtn}>Salvar</Text>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </View>
  );
}
