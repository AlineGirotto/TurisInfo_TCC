import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
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
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import estilo from "./css";
import { format } from "fecha";

export default function ListMensalidade({ navigation }) {
  const [tela, setTela] = useState(false);
  const Status = ["Em manutenção", "Disponível", "Ocupado"];
  const Regular = ["Regularizado", "Pendente"];
  const [veiculo, setVeiculo] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [submit, setSubmit] = useState("");
  const [nome, setNome] = useState("");
  const [txt, setTxt] = useState("Selecione uma data");
  const [visible, setModalVisible] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [data, setDate] = useState(new Date());
  const [form, setForm] = useState({
    Modelo: "",
    Consumo: "",
    Capacidade: "",
    Fabricacao: "",
    Status: "",
    Regularizacao: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    veiculos();

    Platform.select({
      native: () => setTela(true),
      default: () => setTela(false),
    })();
  }, []);

  const showDate = () => {
    setDatePicker(true);
  };

  async function onDateSelected(event, value) {
    if (event?.type === "dismissed") {
      setDate(data);
      return;
    }
    let dt = format(value, "DD.MM.YYYY");
    await setDate(value);
    await updateForm({ Fabricacao: dt });
    await setTxt("Data: " + dt);
    await setDatePicker(false);
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

  function getData(tela) {
    if (tela) {
      return (
        <View>
          <TouchableOpacity style={styles.btn} onPress={() => showDate()}>
            <Text style={estilo.textBtn}>{txt}</Text>
          </TouchableOpacity>
          {datePicker && (
            <DateTimePicker
              value={data}
              minimumDate={new Date()}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateSelected}
            />
          )}
        </View>
      );
    } else {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInputMask
            style={estilo.input}
            placeholder="DD.MM.AAAA"
            type={"custom"}
            options={{
              mask: "99.99.9999",
            }}
            value={form.Fabricacao}
            onChange={(e) => updateForm({ Fabricacao: e.target.value })}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
      );
    }
  }

  const excluir = async (Modelo) => {
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

  const edit = async (item) => {
    setSubmit("Edição");
    setNome(item.Modelo);
    setModalVisible(!visible);
    setForm({
      Modelo: item.Modelo,
      Consumo: item.Consumo,
      Capacidade: item.Capacidade,
      Fabricacao: item.Fabricacao,
      Status: item.Status,
      Regularizacao: item.Regularizacao,
    });
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
            <Pressable style={estilo.btncard} onPress={() => edit(item)}>
              <Ionicons name="pencil-outline" size={25} color={"white"} />
            </Pressable>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluir(item.Modelo)}
            >
              <Ionicons name="trash-outline" size={25} color={"white"} />
            </Pressable>
          </Card.Actions>
        </Card>
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
    if (submit == "Edição") {
      const db = getFirestore();
      await deleteDoc(doc(db, "Veiculos", nome));
      await setDoc(doc(db, "Veiculos", form.Modelo), {
        Modelo: form.Modelo,
        Consumo: form.Consumo,
        Capacidade: form.Capacidade,
        Fabricacao: form.Fabricacao,
        Status: form.Status,
        Regularizacao: form.Regularizacao,
      });
      alert("Edição realizada!");
    } else if (submit == "Cadastro") {
      const db = getFirestore();
      await setDoc(doc(db, "Veiculos", form.Modelo), {
        Modelo: form.Modelo,
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
        <Text style={estilo.titulo2}>Mensalidades</Text>
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
            <Text style={estilo.textBtn2}>Adicionar mensalidade</Text>
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
          <View style={estilo.modal}>
            <Ionicons
              name="close-circle-outline"
              size={25}
              color={"black"}
              onPress={() => {
                setModalVisible(!visible);
                setForm({
                  Modelo: "",
                  Consumo: "",
                  Capacidade: "",
                  Fabricacao: "",
                  Status: "",
                  Regularizacao: "",
                });
              }}
              style={{ alignSelf: "flex-end", marginTop: 15 }}
            />

            <Text style={estilo.titulo2}>{submit + " dos dados"}</Text>
            <SafeAreaView style={{ width: "100%", height: "90%" }}>
              <ScrollView contentContainerStyle={estilo.ScrollView}>
                <TextInput
                  style={estilo.input}
                  placeholder="Digite o modelo ou nome"
                  value={form.Modelo}
                  onChangeText={(e) => updateForm({ Modelo: e })}
                />
                <Text style={estilo.txtForm}>Consumo</Text>
                <TextInput
                  style={estilo.input}
                  placeholder="K/L"
                  keyboardType="numeric"
                  value={form.Consumo}
                  onChangeText={(e) => updateForm({ Consumo: e })}
                />
                <Text style={estilo.txtForm}>Capacidade</Text>
                <TextInput
                  style={estilo.input}
                  placeholder="Ex.: 10"
                  value={form.Capacidade}
                  onChangeText={(e) => updateForm({ Capacidade: e })}
                  keyboardType="numeric"
                  maxLength={3}
                />
                <Text style={estilo.txtForm}>Data de fabricação</Text>
                {getData(tela)}
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

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#004A85",
    width: 120,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: "2%",
  },
});
