import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Rotas from './components/Rotas';

export default function App() {
  return (
    <Rotas/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFDFDF",
    alignItems: "center",
    justifyContent: "center",
  },
});
