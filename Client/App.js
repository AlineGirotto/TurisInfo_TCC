import { StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./components/stackNavigator";

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
