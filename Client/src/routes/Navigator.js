import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import { React, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import estilo from "../css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAuth, signOut } from "firebase/auth";
import { RFPercentage } from "react-native-responsive-fontsize";
import home from "../Home";
import mensalidade from "../ConsultaMensalidade";
import viagem from "../MarcaViagem";
import Login from "../Login";
import CriarLogin from "../CriarLogin";
import HomeAdm from "../HomeAdm";
import Usuarios from "../Usuarios";
import CadVeiculo from "../CadVeiculo";
import ListVeiculos from "../ListVeiculos";
import Pagamento from "../pagamentos";
import CadPassageiro from "../CadPassageiro";
import ListPassageiro from "../ListPassageiro";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function logout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      navigation.navigate("Login");
    })
    .catch((error) => {
      alert("Erro ao tentar deslogar");
    });
}

function TabNavi() {  
  const [tela, setTela] = useState(false);

  const WhatsApp = () => {
    Platform.select({
      native: () => setTela(true),
      default: () => setTela(false),
    })();

    if(tela){
      Linking.openURL(
        `whatsapp://send?text=Olá, preciso retirar uma dúvida!&phone=55054992122396`
      );
    }else{
      Linking.openURL(
        `https://api.whatsapp.com/send/?phone=55054992122396&text=Ol%C3%A1+estou+com+d%C3%BAvida!`
      );
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerLeft: () => (
          <TouchableOpacity style={{ margin: 10 }} onPress={() => WhatsApp()}>
            <Ionicons name="logo-whatsapp" size={30} color={"white"} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={{ margin: 10 }} onPress={() => logout()}>
            <Ionicons name="exit-outline" size={30} color={"white"} />
          </TouchableOpacity>
        ),
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
          tabBarLabelStyle: {
            fontSize: RFPercentage(1.5),
            color: "white",
          },
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={"white"} />;
            }
            return <Ionicons name="home-outline" size={size} color={"white"} />;
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
          tabBarLabelStyle: {
            fontSize: RFPercentage(1.5),
            color: "white",
          },
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
        name="Efetuar Pagamento"
        component={Pagamento}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#004A85" },
          tabBarLabelStyle: {
            fontSize: RFPercentage(1.5),
            color: "white",
          },
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return <Ionicons name="cash" size={size} color={"white"} />;
            }
            return <Ionicons name="cash-outline" size={size} color={"white"} />;
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
          tabBarLabelStyle: {
            fontSize: RFPercentage(1.5),
            color: "white",
          },
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return <Ionicons name="bus" size={size} color={"white"} />;
            }
            return <Ionicons name="bus-outline" size={size} color={"white"} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function DraNavi() {
  const [pass, setPass] = useState(false);
  const [vei, setVei] = useState(false);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={() => (
            <Text style={{ color: "#ffffff", fontSize: RFPercentage(1.8) }}>
              Passageiros
            </Text>
          )}
          onPress={() => setPass(!pass)}
          icon={() => (
            <Ionicons name="people-outline" size={25} color={"#ffffff"} />
          )}
        />
        {pass && (
          <DrawerItem
            style={{ marginLeft: "10%" }}
            label={() => (
              <Text style={{ color: "#ffffff", fontSize: RFPercentage(1.5) }}>
                Cadastro de passageiro
              </Text>
            )}
            //onPress={() => props.navigation.navigate("CadPassageiro")}
            icon={() => (
              <Ionicons name="person-add-outline" size={25} color={"#ffffff"} />
            )}
          />
        )}
        {pass && (
          <DrawerItem
            style={{ marginLeft: "10%" }}
            label={() => (
              <Text style={{ color: "#ffffff", fontSize: RFPercentage(1.5) }}>
                Lista de passageiros
              </Text>
            )}
            //onPress={() => navigation.navigate("ListPassageiro")}
            icon={() => (
              <Ionicons name="person-outline" size={25} color={"#ffffff"} />
            )}
          />
        )}
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home Administrador"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#004A85",
          color: "ffffff",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home Administrador"
        component={HomeAdm}
        options={{
          title: "Início",
          headerTitleStyle: { color: "#ffffff" },
          headerStyle: { backgroundColor: "#004A85" },
          headerTintColor: "#fff",
          headerRight: () => (
            <TouchableOpacity style={{ margin: 10 }} onPress={() => logout()}>
              <Ionicons name="exit-outline" size={30} color={"white"} />
            </TouchableOpacity>
          ),
          drawerLabelStyle: {
            fontSize: RFPercentage(1.8),
            color: "white",
          },
          drawerIcon: () => (
            <Ionicons name="home" size={25} color={"#ffffff"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Usuarios"
        component={Usuarios}
        options={{
          title: "Usuários cadastrados",
          headerTitleStyle: { color: "#ffffff" },
          headerStyle: { backgroundColor: "#004A85" },
          headerRight: () => (
            <TouchableOpacity style={{ margin: 10 }} onPress={() => logout()}>
              <Ionicons name="exit-outline" size={30} color={"white"} />
            </TouchableOpacity>
          ),
          drawerLabelStyle: {
            fontSize: RFPercentage(1.8),
            color: "white",
          },
          drawerIcon: () => (
            <Ionicons
              name="person-circle-outline"
              size={25}
              color={"#ffffff"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CadVeiculo"
        component={CadVeiculo}
        options={{
          title: "Cadastro de veiculos",
          headerTitleStyle: { color: "#ffffff" },
          headerStyle: { backgroundColor: "#004A85" },
          headerRight: () => (
            <TouchableOpacity style={{ margin: 10 }} onPress={() => logout()}>
              <Ionicons name="exit-outline" size={30} color={"white"} />
            </TouchableOpacity>
          ),
          drawerLabelStyle: {
            fontSize: RFPercentage(1.8),
            color: "white",
          },
          drawerIcon: () => <Ionicons name="bus" size={25} color={"#ffffff"} />,
        }}
      />
      <Drawer.Screen
        name="ListVeiculos"
        component={ListVeiculos}
        options={{
          title: "Lista de veiculos",
          headerTitleStyle: { color: "#ffffff" },
          headerStyle: { backgroundColor: "#004A85" },
          headerRight: () => (
            <TouchableOpacity style={{ margin: 10 }} onPress={() => logout()}>
              <Ionicons name="exit-outline" size={30} color={"white"} />
            </TouchableOpacity>
          ),
          drawerLabelStyle: {
            fontSize: RFPercentage(1.8),
            color: "white",
          },
          drawerIcon: () => (
            <Ionicons name="list-outline" size={25} color={"#ffffff"} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CriarLogin" component={CriarLogin} />
        <Stack.Screen name="TabNavi" component={TabNavi} />
        <Stack.Screen name="DraNavi" component={DraNavi} />
        <Stack.Screen name="ListPassageiro" component={ListPassageiro} />
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
