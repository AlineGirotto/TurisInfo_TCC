import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Button,
} from "react-native";
import { React, useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-datepicker";

export default function ListaViagem({ navigation }) {
  const Turnos = ["Manhã", "Tarde", "Noite", "Não"];
  const [tela, setTela] = useState(false);
  const [datePicker, setDatePicker] = useState(tela);
  const [data, setDate] = useState(new Date());
  const [form, setForm] = useState({
    Data: "",
    Nome: "",
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
        const uid = user.uid;
      } else {
        navigation.navigate("Home");
      }
    });

    Platform.select({
      native: () => setTela(true),
      default: () => setTela(false),
    })();
  }, []);

  function showDatePicker() {
    setDatePicker(true);
    return (
      <View style={styles.container}>
        <DateTimePicker
          value={data}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      </View>
    );
  }

  function onDateSelected(event, value) {
    if (event?.type === "dismissed") {
      setDate(date);
      return;
    }
    setDate(value);
    updateForm({ Data: value });
    setDatePicker(false);
  }

  function getData(tela) {
    if (tela) {
      return <View style={styles.container}>
        <TouchableOpacity style={styles.btn} onPress={showDatePicker}>
            <Text style={styles.textBtn}>Selecionar data</Text>
          </TouchableOpacity>
      </View>;
    } else {
      return (
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Data da viagem"
            autoCorrect={false}
            value={form.Data}
            onChange={(e) => updateForm({ Data: e.target.value })}
          />
        </View>
      );
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    console.log(form);

    setForm({
      Data: "",
      Nome: "",
      Ida: "",
      Volta: "",
    });
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
            autoCorrect={false}
            value={form.Nome}
            onChange={(e) => updateForm({ Nome: e.target.value })}
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
