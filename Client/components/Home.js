import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import { React } from "react";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={{ padding: 10, fontWeight: "bold", fontSize: 20 }}>
          Seja bem vindo(a)!
        </Text>
        <View style={styles.cards}>
          <Card style={styles.card} 
        onPress={() => navigation.navigate('Consultar Mensalidade')}>
            <Text>Consultar as mensalidades</Text>
          </Card>
          <Card style={styles.card}  onPress={() => navigation.navigate('Registar Viagem')}>
            <Text>Registrar horário das Viagens</Text>
          </Card>
          <Card style={styles.card}  onPress={() => navigation.navigate('Efetuar Pagamento')}>
            <Text>Efetuar pagamentos</Text>
          </Card>
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
    borderWidth: 1,
    borderColor: "#004A85",
    marginTop: '1%',
    marginBottom: '5%'
  },
  cards:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '5%'
  },
  card: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    padding: 10,
    height: "20%",
    width: "30%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,    
    margin: '10%',
  },
});
