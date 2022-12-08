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
import { useEffect, useState } from "react";
import { Card } from "react-native-paper";
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
import SelectDropdown from "react-native-select-dropdown";

export default function ListPassageiro({ navigation }) {
  const Estado = [
    "Solteiro(a)",
    "Casado(a)",
    "Separado(a)",
    "Divorciado(a)",
    "Viúvo(a)",
  ];
  const [instituicao, setInstituicao] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [passageiro, setPassageiro] = useState("");
  const [dropcfp, setdropcfp] = useState(false);
  const [submit, setSubmit] = useState("");
  const [nome, setNome] = useState("");
  const [visible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    Nome: "",
    RG: "",
    CPF: "",
    DtNascimento: "",
    EstadoCivil: "",
    Instituicao: "",
    CEP: "",
    Bairro: "",
    Numero: "",
    Rua: "",
    Complemento: "",
    Contato: "",
    Email: "",
    Contrato: "",
  });

  useEffect(() => {
    passageiros();
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
      a.push(doc.data().NomeInst);
    });
    setInstituicao(a);
  }

  async function passageiros() {
    const db = getFirestore();
    const q = query(collection(db, "Passageiros"), where("Nome", "!=", " "));
    const querySnapshot = await getDocs(q);
    let a = [];
    querySnapshot.forEach((doc) => {
      const x = {
        id: doc.id,
        Nome: doc.data().Nome,
        RG: doc.data().RG,
        CPF: doc.data().CPF,
        DtNascimento: doc.data().DtNascimento,
        EstadoCivil: doc.data().EstadoCivil,
        Instituicao: doc.data().Instituicao,
        CEP: doc.data().CEP,
        Bairro: doc.data().Bairro,
        Numero: doc.data().Numero,
        Rua: doc.data().Rua,
        Complemento: doc.data().Complemento,
        Contato: doc.data().Contato,
        Email: doc.data().Email,
        Contrato: doc.data().Contrato,
      };
      a.push(x);
    });
    setPassageiro(a);
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
    await setForm({
      Nome: item.Nome,
      RG: item.RG,
      CPF: item.CPF,
      DtNascimento: item.DtNascimento,
      EstadoCivil: item.EstadoCivil,
      Instituicao: item.Instituicao,
      CEP: item.CEP,
      Bairro: item.Bairro,
      Numero: item.Numero,
      Rua: item.Rua,
      Complemento: item.Complemento,
      Contato: item.Contato,
      Email: item.Email,
      Contrato: item.Contrato,
    })
    setSubmit("Edição");
    setNome(item.Nome);
    setModalVisible(!visible);
    setdropcfp(false);
  };

  const excluir = async (user) => {
    const db = getFirestore();
    const q = query(collection(db, "Passageiros"), where("Nome", "==", user));
    const querySnapshot = await getDocs(q);
    let id = "";
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    await deleteDoc(doc(db, "Passageiros", id));
    instituicoes();
    alert("Registro excluído!");
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
              <Text style={estilo.info}>{item.Nome}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>CPF:</Text>
              <Text style={estilo.info}>{item.CPF}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>RG:</Text>
              <Text style={estilo.info}>{item.RG}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Data de nascimento:</Text>
              <Text style={estilo.info}>{item.DtNascimento}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Estado civil:</Text>
              <Text style={estilo.info}>{item.EstadoCivil}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Instituição:</Text>
              <Text style={estilo.info}>{item.Instituicao}</Text>
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
              <Text style={estilo.txtFlat}>Contato:</Text>
              <Text style={estilo.info}>{item.Contato}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>E-mail:</Text>
              <Text style={estilo.info}>{item.Email}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Contrato:</Text>
              <Text style={estilo.info}>{item.Contrato}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={estilo.cardAct}>
            <Pressable style={estilo.btncard} onPress={() => muda(item)}>
              <Ionicons name="pencil-outline" size={25} color={"white"} />
            </Pressable>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluir(item.Nome)}
            >
              <Ionicons name="trash-outline" size={25} color={"white"} />
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  function filtrado() {
    let filt = passageiro.filter(
      (item) => item.Nome.toLowerCase().indexOf(filtro.toLowerCase()) > -1
    );
    setPassageiro(filt);
  }

  async function onSubmit() {
    if (submit == "Edição") {
      const db = getFirestore();
     await deleteDoc(doc(db, "Passageiros", nome));
      await setDoc(doc(db, "Passageiros", form.Nome), {
        Nome: form.Nome,
        RG: form.RG,
        CPF: form.CPF,
        DtNascimento: form.DtNascimento,
        EstadoCivil: form.EstadoCivil,
        Instituicao: form.Instituicao,
        CEP: form.CEP,
        Bairro: form.Bairro,
        Numero: form.Numero,
        Rua: form.Rua,
        Complemento: form.Complemento,
        Contato: form.Contato,
        Email: form.Email,
        Contrato: form.Contrato,
      });
      alert("Edição realizada!");
    } else if (submit == "Cadastro") {
      const db = getFirestore();
      await setDoc(doc(db, "Passageiros", form.Nome), {
        Nome: form.Nome,
        RG: form.RG,
        CPF: form.CPF,
        DtNascimento: form.DtNascimento,
        EstadoCivil: form.EstadoCivil,
        Instituicao: form.Instituicao,
        CEP: form.CEP,
        Bairro: form.Bairro,
        Numero: form.Numero,
        Rua: form.Rua,
        Complemento: form.Complemento,
        Contato: form.Contato,
        Email: form.Email,
        Contrato: "form.Contrato",
      });
      alert("Cadastro realizado!");
    }
    setModalVisible(!visible);
    setForm({
      Nome: "",
      RG: "",
      CPF: "",
      DtNascimento: "",
      EstadoCivil: "",
      CEP: "",
      Bairro: "",
      Numero: "",
      Rua: "",
      Complemento: "",
      Contato: "",
      Email: "",
      Contrato: "",
    });
    setdropcfp(false);
    passageiros();
  }

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo2}>Passageiros(as) cadastrados(as)</Text>
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
            <Text style={estilo.textBtn2}>Adicionar passageiro(a)</Text>
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
            onPress={() => passageiros()}
          >
            <Text style={estilo.textBtn2}>Mostrar tudo</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={estilo.flatList}
          data={passageiro}
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
                  Nome: "",
                  RG: "",
                  CPF: "",
                  DtNascimento: "",
                  EstadoCivil: "",
                  CEP: "",
                  Bairro: "",
                  Numero: "",
                  Rua: "",
                  Complemento: "",
                  Contato: "",
                  Email: "",
                  Contrato: "",
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
                  placeholder="Digite o nome completo"
                  value={form.Nome}
                  onChangeText={(e) => updateForm({ Nome: e })}
                />
                <TextInputMask
                  style={{
                    backgroundColor: "#F5F5F5",
                    width: "90%",
                    color: "#000000",
                    marginBottom: 15,
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
                  type={"cpf"}
                  placeholder="Digite o CPF"
                  value={form.CPF}
                  onChangeText={(e) => updateForm({ CPF: e })}
                  keyboardType="numeric"
                  maxLength={15}
                />
                <TextInput
                  style={estilo.input}
                  placeholder="Digite o RG"
                  value={form.RG}
                  onChangeText={(e) => updateForm({ RG: e })}
                  keyboardType="numeric"
                />
                <Text style={estilo.txtForm}>Data de nascimento:</Text>
                <TextInputMask
                  style={{
                    backgroundColor: "#F5F5F5",
                    width: "90%",
                    color: "#000000",
                    marginBottom: 15,
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
                  placeholder="DD.MM.AAAA"
                  type={"custom"}
                  options={{
                    mask: "99.99.9999",
                  }}
                  value={form.DtNascimento}
                  onChangeText={(e) => updateForm({ DtNascimento: e })}
                  keyboardType="numeric"
                  maxLength={10}
                />
                <SelectDropdown
                  data={Estado}
                  onSelect={(selectedItem, index) => {
                    updateForm({ EstadoCivil: selectedItem });
                  }}
                  defaultButtonText={"Estado Civil"}
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
                <SelectDropdown
                  data={instituicao}
                  onSelect={(selectedItem, index) => {
                    updateForm({ Instituicao: selectedItem });
                  }}
                  defaultButtonText={"Instituição"}
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
                <TextInputMask
                  style={{
                    backgroundColor: "#F5F5F5",
                    width: "90%",
                    color: "#000000",
                    marginBottom: 15,
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
                  type={"cel-phone"}
                  placeholder="Digite o contato"
                  value={form.Contato}
                  onChangeText={(e) => updateForm({ Contato: e })}
                  keyboardType="numeric"
                  maxLength={15}
                />
                <TextInput
                  style={estilo.input}
                  placeholder="Digite o e-mail"
                  value={form.Email}
                  onChangeText={(e) => updateForm({ Email: e })}
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
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: "#004A85",
                    width: "90%",
                    height: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    marginBottom: 15,
                  }}
                >
                  <Text style={estilo.textBtn}>Cadastrar um contrato</Text>
                </TouchableOpacity>

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
