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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInputMask } from "react-native-masked-text";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function MarcaViagem({ navigation }) {
  const Turnos = ["Manhã", "Tarde", "Noite", "Não"];
  const [tela, setTela] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [data, setDate] = useState(new Date());
  const [nome, setNome] = useState("");
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
  }

  async function onDateSelected(event, value) {
    if (event?.type === "dismissed") {
      setDate(data);
      return;
    }
    await setDate(value);
    await updateForm({ Data: value });
    await setDatePicker(false);
  }

  function getData(tela) {
    if (tela) {
      return (
        <View>
          <TouchableOpacity style={styles.btn} onPress={() => showDate()}>
            <Text style={styles.textBtn}>Selecionar data</Text>
          </TouchableOpacity>
          {datePicker && (
            <DateTimePicker
            value={data}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateSelected}
            style={styles.datePicker}
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
            style={styles.input}
            placeholder="Data da viagem"
            type={"datetime"}
            options={{
              format: "DD/MM/YYYY",
            }}
            value={form.Data}
            onChange={(e) => updateForm({ Data: e.target.value })}
            keyboardType="numeric"
          />
        </View>
      );
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setForm(form.Nome = nome);
    const db = getFirestore();
    await setDoc(doc(db, "Viagens", JSON.stringify(data)), {
     form
    });
    
    setForm({
      Data: "",
      Nome: "",
      Ida: "",
      Volta: "",
    });
    setNome("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={{ padding: 10, fontWeight: "bold", fontSize: 20 }}>
          Registre o horário de sua viagem
        </Text>
        <View style={styles.container3}>
          {getData(tela)}              
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
          />
          <SelectDropdown
            data={Turnos}
            value={form.Ida}
            onSelect={(selectedItem, index) => {
              updateForm({ Ida: selectedItem });
            }}
            defaultButtonText={"Turno de ida"}
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
            dropdownStyle={styles.DropdownStyle}
            buttonStyle={styles.drop}
          />
          <SelectDropdown
            data={Turnos}
            value={form.Ida}
            onSelect={(selectedItem, index) => {
              updateForm({ Volta: selectedItem });
            }}
            defaultButtonText={"Turno de volta"}
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
            dropdownStyle={styles.DropdownStyle}
            buttonStyle={styles.drop}
          />
          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={styles.textBtn}>Enviar</Text>
          </TouchableOpacity>
        </View>
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
    width: "95%",
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
  input: {
    backgroundColor: "#F5F5F5",
    width: "60%",
    marginBottom: 15,
    color: "#000000",
    fontSize: 17,
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
  },
  btn: {
    backgroundColor: "#004A85",
    width: "50%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textBtn: {
    color: "#ffffff",
    fontSize: 16,
  },
  DropdownStyle: {
    backgroundColor: "#ffffff",
    height: 125,
    color: "#000000",
    fontSize: 17,
    borderRadius: 10,
    borderColor: "#004A85",
    borderWidth: 1,
  },
  drop: {
    backgroundColor: "#F5F5F5",
    width: "60%",
    marginBottom: 15,
    color: "#000000",
    fontSize: 17,
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
  },
});
