import { StyleSheet, Text, View } from "react-native";

export default function Algo() {
  return (
    <View style={styles.container}>
      <Text>
        Tela de criação de objetos, onde iremos adicionar os jogos, dar contexto
        e nota
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
