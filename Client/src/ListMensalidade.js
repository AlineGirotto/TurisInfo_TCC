import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
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
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import estilo from "./css";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function ListMensalidade({ navigation }) {
  const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const status = ["Paga", "Não paga"];
  const [msg, setMsg] = useState(
    "Selecione um passageiro(a) para buscar as mensalidades!"
  );
  const [texto,  setTexto] = useState("");
  const [passageiro, setPassageiro] = useState([]);
  const [mensalidade, setMensalidade] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mes, setMes] = useState("Mês");
  const [inputNome, setinputNome] = useState("Passageiro(a)");
  const [valor, setvalor] = useState("");
  const [visible, setModalVisible] = useState(false);
  const [visible2, setModalVisible2] = useState(false);
  const [form, setForm] = useState({
    id:"",
    Pago: "",
    Meses: "",
    Valor: "",
  });

  useEffect(() => {
    passageiros();
  }, []);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function passageiros() {
    const db = getFirestore();
    const q = query(collection(db, "Passageiros"));
    const querySnapshot = await getDocs(q);
    let a = [];
    querySnapshot.forEach((doc) => {
      a.push(doc.data().Nome);
    });
    setPassageiro(a);
  }

  async function mensalidades() {
    const db = getFirestore();
    const p = query(collection(db, "Passageiros"), where("Nome", "==", filtro));
    const querySnapshotp = await getDocs(p);
    let a = [];
    querySnapshotp.forEach((doc) => {
      a = doc.data().Email;
    });
    const q = query(collection(db, "Mensalidades"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
    }));
    const f = JSON.stringify(a);
    data.map(async (elem) => {
      const workQ = query(collection(db, `Mensalidades/${f}/Meses`));
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

  const excluir = async (x) => {
    const db = getFirestore();
    const p = query(collection(db, "Passageiros"), where("Nome", "==", filtro));
    const querySnapshotp = await getDocs(p);
    let a = [];
    querySnapshotp.forEach((doc) => {
      a = doc.data().Email;
    });    
    const f = JSON.stringify(a);
    const querySnapshot = await getDocs(collection(db, "Mensalidades"));
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    queryData.map(async (v) => {
      await deleteDoc(
        doc(db, `Mensalidades/${(f)}/Meses`, x)
      );
    });
    mensalidades();
    alert("Mensalidade excluída!");
  };

  const edit = async () => {
    let identificacao = form.id;
    let adm = false;
    if (form.Pago == "Paga") {
      adm = true;      
    } else {
      adm = false;
    }
    const db = getFirestore();
    const q = query(collection(db, "Passageiros"), where("Nome", "==", filtro));
    const querySnap = await getDocs(q);
    let x = [];
    querySnap.forEach((doc) => {
      x = doc.data().Email;
    });
    const querySnapshot = await getDocs(collection(db, "Mensalidades"));
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    queryData.map(async (v) => {
      await setDoc(
        doc(db, `Mensalidades/${JSON.stringify(x)}/Meses`, identificacao),
        {
          Meses: form.Meses,
          Valor: form.Valor,
          Pago: adm,
        }
      );
    });
    alert("Mensalidade alterada!");
    setModalVisible2(!visible2);
    mensalidades();
  };

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
          <Card.Actions style={estilo.cardAct}>
            <Pressable style={estilo.btncard} onPress={() => ( setModalVisible2(!visible2),
                updateForm({
                  id: item.id,
                  Meses: item.Meses,
                  Valor: item.Valor,
                  Pago: item.Pago,
                }),
                setTexto(adm)
              )}>
              <Ionicons name="pencil-outline" size={25} color={"white"} />
            </Pressable>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluir(item.id)}
            >
              <Ionicons name="trash-outline" size={25} color={"white"} />
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  async function onSubmit() {
    const db = getFirestore();
    const q = query(
      collection(db, "Passageiros"),
      where("Nome", "==", inputNome)
    );
    const querySnapshot = await getDocs(q);
    let x = [];
    querySnapshot.forEach((doc) => {
      x = doc.data().Email;
    });
    for (let i = 1; i < mes + 1; i++) {
      const querySnapshot = await getDocs(collection(db, "Mensalidades"));
      const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));
      queryData.map(async (v) => {
        await setDoc(
          doc(db, `Mensalidades/${JSON.stringify(x)}/Meses`, JSON.stringify(i)),
          {
            Meses: i,
            Valor: valor,
            Pago: false,
          }
        );
      });
    }
    alert("Cadastro realizado!");
    setModalVisible(!visible);
    setForm({
      Nome: "Passageiro(a)",
      Meses: "Mês",
      Valor: "",
    });
    mensalidades();
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
            onPress={() => {
              setModalVisible(!visible)}}
          >
            <Ionicons name="add-outline" size={15} color={"white"} />
            <Text style={estilo.textBtn2}>Adicionar mensalidade</Text>
          </TouchableOpacity>
          <SelectDropdown
            data={passageiro}
            value={filtro}
            onSelect={(selectedItem, index) => {
              setFiltro(selectedItem);
            }}
            defaultButtonText={inputNome}
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
            onPress={() => {
              mensalidades();
              setMsg("Mensalidades de " + filtro);
            }}
          >
            <Ionicons name="search-outline" size={25} color={"white"} />
          </TouchableOpacity>
        </View>
        <Text style={style.titulo}>{msg}</Text>
        <FlatList
          style={estilo.flatList}
          data={mensalidade}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
            onPress={() => excluir()}
          >
            <Text style={estilo.textBtn2}>Excluir todas mensalidades</Text>
          </TouchableOpacity>
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
                  Pago: "",
                  Meses: "",
                  Valor: "",
                });
              }}
              style={{ alignSelf: "flex-end", marginTop: "15%" }}
            />
            <Text style={estilo.titulo2}>{"Cadastro de mensalidade"}</Text>
            <SafeAreaView style={{ width: "100%", height: "90%" }}>
              <ScrollView contentContainerStyle={estilo.ScrollView}>
                <SelectDropdown
                  data={passageiro}
                  value={inputNome}
                  onSelect={(selectedItem, index) => {
                    setinputNome(selectedItem);
                  }}
                  defaultButtonText={inputNome}
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
                <Text style={estilo.txt}>
                  {"Selecione a quantidade de meses: "}
                </Text>
                <View style={style.linha}>
                  <SelectDropdown
                    data={meses}
                    value={mes}
                    onSelect={(selectedItem, index) => {
                      setMes(selectedItem);
                    }}
                    defaultButtonText={mes}
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
                  <TextInputMask
                    style={style.input}
                    type={"money"}
                    placeholder={"Digite o valor"}
                    value={valor}
                    onChangeText={(text) => setvalor(text)}
                  />
                </View>
                <TouchableOpacity style={estilo.btn} onPress={onSubmit}>
                  <Text style={estilo.textBtn}>Salvar</Text>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible2}
          onRequestClose={() => {
            setModalVisible2(!visible2);
          }}
        >
          <View style={estilo.modal}>
            <Ionicons
              name="close-circle-outline"
              size={25}
              color={"black"}
              onPress={() => {
                setModalVisible2(!visible2);
                setForm({
                  Pago: "",
                  Meses: "",
                  Valor: "",
                });
              }}
              style={{ alignSelf: "flex-end", marginTop: "15%" }}
            />
            <Text style={estilo.titulo2}>{"Edição da mensalidade"}</Text>
            <SafeAreaView style={{ width: "100%", height: "90%" }}>
              <ScrollView contentContainerStyle={estilo.ScrollView}>   
                <Text style={estilo.txt}>
                  {"Status de pagamento:"}
                </Text>             
                <View style={style.linha}>
                  <SelectDropdown
                    data={status}
                    value={form.Pago}
                    onSelect={(selectedItem, index) => {
                      updateForm({Pago: selectedItem})
                    }}
                    defaultButtonText={texto}
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
                  <TextInputMask
                    style={style.input}
                    type={"money"}
                    placeholder={"Digite o valor"}
                    value={form.Valor}
                    onChangeText={(text) => updateForm({Valor:text})}
                  />
                </View>
                <TouchableOpacity style={estilo.btn} onPress={edit}>
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
    width: "40%",
    color: "#000000",
    fontSize: RFPercentage(1.5),
    borderRadius: 10,
    borderColor: "#004A85",
    borderWidth: 1,
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
  linha: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
  },
  titulo: {
    padding: 10,
    textAlign: "left",
    fontSize: RFPercentage(2),
  },
  input: {
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
    marginLeft: "1%",
    marginRight: "1%",
  },
  btn: {
    backgroundColor: "#004A85",
    width: "25%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: "2%",
    padding: "1%",
  },
});
