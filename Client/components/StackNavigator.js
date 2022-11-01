import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import home from "./Home";
import mensalidade from "./consultamensalidade";
import viagem from "./MarcaViagem";
import Login from "./Login";
import CriarLogin from "./CriarLogin";
import HomeAdm from "./HomeAdm";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavi() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#004A85",
            borderTopWidth: 0,
            bottom: 14,
            left: 10,
            right: 10,
            borderRadius: 10,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={home}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#004A85" },
            tabBarIcon: ({ size, focused }) => {
              if (focused) {
                return <Ionicons name="home" size={size} color={"white"} />;
              }
              return (
                <Ionicons name="home-outline" size={size} color={"white"} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Consultar Mensalidade"
          component={mensalidade}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#004A85" },
            tabBarIcon: ({ size, focused }) => {
              if (focused) {
                return (
                  <Ionicons name="folder-open" size={size} color={"white"} />
                );
              }
              return (
                <Ionicons
                  name="folder-open-outline"
                  size={size}
                  color={"white"}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Registar Viagem"
          component={viagem}
          options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#004A85" },
            tabBarIcon: ({ size, focused }) => {
              if (focused) {
                return <Ionicons name="bus" size={size} color={"white"} />;
              }
              return (
                <Ionicons name="bus-outline" size={size} color={"white"} />
              );
            },
          }}
        />
      </Tab.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#004A85",
            borderTopWidth: 0,
            bottom: 14,
            left: 10,
            right: 10,
            borderRadius: 10,
          },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CriarLogin" component={CriarLogin} />
        <Stack.Screen name="TabNavi" component={TabNavi} />
        <Stack.Screen name="HomeAdm" component={HomeAdm} options={{
            headerShown: true,
            headerTitle: "",
            headerStyle: { backgroundColor: "#004A85" }
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
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
