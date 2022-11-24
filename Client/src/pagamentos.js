import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { React, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import estilo from "./css";

export default function Pagamentos({ navigation }) {
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      "00020101021126580014br.gov.bcb.pix01362fc8fd02-fa45-4ff3-80a4-1c2f3439231b5204000053039865802BR5907LIVEPIX6009SAO PAULO62150511linegirotto6304D4F3"
    );
  };

  return (
    <View style={estilo.background}>
      <View style={estilo.container}>
        <Text style={estilo.titulo}>Pague agora:</Text>
          <Text style={estilo.titulo}>
            Escaneie o QR Code abaixo com o app do seu banco:
          </Text>
          <Image
            source={require("../assets/qrCode.png")}
            style={{
              width: 250,
              height: 250,
              marginTop: "5%",
              marginBottom: "5%",
            }}
          />
          <TouchableOpacity
            onPress={() => copyToClipboard()}
            style={{
              backgroundColor: "#004A85",
              width: "70%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={estilo.textBtn}>Copiar código</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}
