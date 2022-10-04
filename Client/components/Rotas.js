import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import home from "./Home";
import mensalidade from "./consultamensalidade";
import viagem from './listaViagem';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Rotas() {
  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        initialRouteName={"Registar Viagem"}
        screenOptions={{ tabBarShowLabel: true, tabBarStyle:{
          position: 'absolute',
          backgroundColor: "#004A85",
          borderTopWidth:0,
          bottom: 14,
          left: 10,
          right: 10,
          borderRadius: 10
        } }}
      >
        <Tab.Screen name="Início" component={home} options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: ({backgroundColor: "#004A85", }) ,
          tabBarIcon:({size, focused}) => {
            if(focused){
              return <Ionicons name="home" size={size} color={"white"}/>
            }
            return <Ionicons name="home-outline" size={size} color={"white"}/>
          }
        }}/>
        <Tab.Screen name="Consultar Mensalidade" component={mensalidade} options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: ({backgroundColor: "#004A85", }) ,
          tabBarIcon:({size, focused}) => {
            if(focused){
              return <Ionicons name="folder-open" size={size} color={"white"}/>
            }
            return <Ionicons name="folder-open-outline" size={size} color={"white"}/>
          }
        }}/>
        <Tab.Screen name="Registar Viagem" component={viagem} options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: ({backgroundColor: "#004A85", }) ,
          tabBarIcon:({size, focused}) => {
            if(focused){
              return <Ionicons name="bus" size={size} color={"white"}/>
            }
            return <Ionicons name="bus-outline" size={size} color={"white"}/>
          }
        }}/>
      </Tab.Navigator>
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
