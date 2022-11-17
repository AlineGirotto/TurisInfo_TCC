import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  TextComponent,
  TouchableOpacity,
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
  updateDoc,
  doc,
} from "firebase/firestore";
import estilo from "./css";

export default function Usuarios({ navigation }) {
  const [usuario, setUsuario] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    usuarios();
  }, [filtro]);

  async function usuarios() {
    const db = getFirestore();
    const q = query(collection(db, "Usuarios"), where("Usuario", "!=", " "));
    const querySnapshot = await getDocs(q);
    let a = [];
    querySnapshot.forEach((doc) => {
      const user = {
        id: doc.id,
        usuario: doc.data().Usuario,
        adm: doc.data().Adm,
      };
      a.push(user);
    });
    setUsuario(a);
  }

  const mudaAdm = async (user) => {
    const db = getFirestore();
    const q = query(collection(db, "Usuarios"), where("Usuario", "==", user));
    const querySnapshot = await getDocs(q);
    let id,
      permissao = "";
    querySnapshot.forEach((doc) => {
      (id = doc.id), (permissao = doc.data().Adm);
    });
    const use = doc(db, "Usuarios", id);
    await updateDoc(use, {
      Adm: !permissao,
    });
    usuarios();
    alert("Permissão do usuário alterada");
  };

  const excluirUsu = async (user) => {
    const db = getFirestore();
    const q = query(collection(db, "Usuarios"), where("Usuario", "==", user));
    const querySnapshot = await getDocs(q);
    let id = "";
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    await deleteDoc(doc(db, "Usuarios", id));
    usuarios();
    alert("Usuário excluído!");
  };

  const renderItem = ({ item }) => {
    let adm = false;
    if (item.adm) {
      adm = "Administrador";
    } else {
      adm = "Passageiro";
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
              <Text style={estilo.txtFlat}>Usuário:</Text>
              <Text style={estilo.info}>{item.usuario}</Text>
            </View>
            <View style={estilo.linha}>
              <Text style={estilo.txtFlat}>Cargo:</Text>
              <Text style={estilo.info}>{adm}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={estilo.cardAct}>
            <Pressable
              style={estilo.btncard}
              onPress={() => mudaAdm(item.usuario)}
            >
              <Text style={estilo.textBtn2}>Mudar Permissão</Text>
            </Pressable>
            <Pressable
              style={estilo.btncard}
              onPress={() => excluirUsu(item.usuario)}
            >
              <Text style={estilo.textBtn2}>Excluir Usuário</Text>
            </Pressable>
          </Card.Actions>
        </Card>
      </View>
    );
  };

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Usuários cadastrados no sistema:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            marginRight: "5%",
          }}
        >
          <TextInput
            style={estilo.inputF}
            placeholder="Filtro"
            value={filtro}
            onChangeText={(text) => setFiltro(text)}
          />
        </View>
        <FlatList
          style={estilo.flatList}
          data={
            filtro
              ? usuario.filter(
                  (item) =>
                    item.usuario.toLowerCase().indexOf(filtro.toLowerCase()) >
                    -1
                )
              : usuario
          }
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
