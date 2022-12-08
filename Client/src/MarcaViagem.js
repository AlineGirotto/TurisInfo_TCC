import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { React, useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInputMask } from "react-native-masked-text";
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { format } from "fecha";
import estilo from "./css";

export default function MarcaViagem({ navigation }) {
  const Turnos = ["Manhã", "Tarde", "Noite", "Não"];
  const [tela, setTela] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [data, setDate] = useState(new Date());
  const [nome, setNome] = useState("");
  const [txt, setTxt] = useState("Selecione uma data");
  const [form, setForm] = useState({
    Data: "",
    Nome: nome,
    Ida: "",
    Volta: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });

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
    await updateForm({ Data: dt });
    await setTxt("Data: " + dt);
    await setDatePicker(false);
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
          <Text style={estilo.txtForm}>Data da viagem</Text>
          <TextInputMask
            style={estilo.input}
            placeholder="DD.MM.AAAA"
            type={"custom"}
            options={{
              mask: "99.99.9999",
            }}
            value={form.Data}
            onChange={(e) => updateForm({ Data: e.target.value })}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
      );
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setForm((form.Nome = nome));
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "Viagens"));
    const queryData = querySnapshot.docs.map((detail) => ({
      ...detail.data(),
      id: detail.id,
    }));
    queryData.map(async (v) => {
      await setDoc(
        doc(db, `Viagens/${JSON.stringify(form.Data)}/Nomes`, form.Nome),
        {
          Data: form.Data,
          Nome: form.Nome,
          Ida: form.Ida,
          Volta: form.Volta,
        }
      );
    });
    alert("Cadastro de viagem realizado!");
    setForm({
      Data: "",
      Nome: "",
      Ida: "",
      Volta: "",
    });
    setNome("");
    setTxt("Selecione uma data");
  }

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Registre o horário de sua viagem</Text>
        {getData(tela)}
        <Text style={estilo.txtForm}>Nome completo</Text>
        <TextInput
          style={estilo.input}
          placeholder="Nome Sobrenome"
          value={nome}
          onChangeText={setNome}
        />
        <Text style={estilo.txtForm}>Selecione o turno de ida</Text>
        <SelectDropdown
          data={Turnos}
          value={form.Ida}
          onSelect={(selectedItem, index) => {
            updateForm({ Ida: selectedItem });
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
          dropdownStyle={estilo.DropdownStyle}
          buttonStyle={estilo.drop}
        />
        <Text style={estilo.txtForm}>Selecione o turno de retorno</Text>
        <SelectDropdown
          data={Turnos}
          value={form.Ida}
          onSelect={(selectedItem, index) => {
            updateForm({ Volta: selectedItem });
          }}
          defaultButtonText={"Retorno"}
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
          <Text style={estilo.textBtn}>Enviar</Text>
        </TouchableOpacity>
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
