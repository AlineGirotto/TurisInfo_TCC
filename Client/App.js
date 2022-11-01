import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import StackNavigator from "./components/StackNavigator";

export default function App() {
  return (
      <StackNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
