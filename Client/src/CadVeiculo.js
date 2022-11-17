import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { React, useState } from "react";
import estilo from "./css";
import { TextInputMask } from "react-native-masked-text";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function CadVeiculo({ navigation }) {
  const Status = ["Em manutenção", "Disponível", "Ocupado"];
  const Regular = ["Regularizado", "Pendente"];
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

  async function onSubmit(e) {
    e.preventDefault();
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
    setForm({
      Modelo: "",
      Consumo: "",
      Capacidade: "",
      Fabricacao: "",
      Status: "",
      Regularizacao: "",
    });
  }

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Cadastre um novo veículo</Text>
        <View style={estilo.container3}>
          <TextInput
            style={estilo.input}
            placeholder="Digite o modelo"
            value={form.Modelo}
            onChangeText={(e) => updateForm({ Modelo: e })}
          />
          <TextInput
            style={estilo.input}
            placeholder="Digite o consumo"
            keyboardType="numeric"
            value={form.Consumo}
            onChangeText={(e) => updateForm({ Consumo: e })}
          />
          <TextInput
            style={estilo.input}
            placeholder="Digite a capacidade (Ex.: 10, 20...)"
            value={form.Capacidade}
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
            value={form.Fabricacao}
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

          <TouchableOpacity style={estilo.btn} onPress={onSubmit}>
            <Text style={estilo.textBtn}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
