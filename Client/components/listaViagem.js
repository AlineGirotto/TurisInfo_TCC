import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { React, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export default function listaViagem() {
  const Turnos = ["Manhã", "Tarde", "Noite", "Não"];
  const [form, setForm] = useState({
    Data: "",
    Nome: "",
    Ida: "",
    Volta: "",
  });
  const [datePicker, setDatePicker] = useState(false);
  const [data, setDate] = useState(new Date());

  function showDatePicker() {
    setDatePicker(true);
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

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newV = { ...form };

    await fetch("http://localhost:5000/record/addViagem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newV),
    }).catch((error) => {
      window.alert(error);
    });

    setForm({
      Data: "",
      Nome: "",
      Ida: "",
      Volta: "",
    });
    window.location.reload();
  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={{ padding: 10, fontWeight: "bold", fontSize: 20 }}>
          Registre o horário de sua viagem
        </Text>
        <View style={styles.container3}>
          <View style={styles.container4}>
            <View style={styles.selectDate}>
              <TextInput
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "50%",
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
                }}
                placeholder="Data"
                autoCorrect={false}
                value={form.Data}
                onChange={(e) => updateForm({ Data: e.target.value })}
                
              />
              {!datePicker && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#004A85",
                    width: "40%",
                    height: 45,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                  onPress={showDatePicker}
                >
                  <Text style={styles.textBtn}>Selecione</Text>
                </TouchableOpacity>
              )}
            </View>
            {datePicker && (
              <DateTimePicker
                value={data}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onDateSelected}
                style={styles.datePicker}
              />
            )}
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
  container4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  selectDate: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxHeight: "10%",
  },
  input: {
    backgroundColor: "#F5F5F5",
    width: "50%",
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
  datePicker: {
    backgroundColor: "#F5F5F5",
    width: "50%",
    marginBottom: 15,
    color: "#000000",
    fontSize: 17,
    borderRadius: 10,
    borderColor: "#004A85",
    borderWidth: 1,
    padding: 10,
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
    width: "50%",
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
