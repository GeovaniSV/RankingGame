import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text className="">
        Tela de inicio, onde teremos todos os jogos que já foram adicionados
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Game")}>
        <View style={styles.card}>
          <View style={styles.cardTitleView}>
            <Text style={styles.cardTitle}>Título </Text>
            <Text>10/10</Text>
          </View>
          <Text>Aqui vai uma descrição do jogo</Text>
          <Text>Clique no card!!!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    padding: 18,
  },

  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    margin: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  cardTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
});
