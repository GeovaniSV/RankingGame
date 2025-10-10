import { StyleSheet, Text, View } from "react-native";

export default function Game() {
  return (
    <View style={styles.container}>
      <Text>
        aqui é a tela onde veremos algumas informações adicionais dos jogos
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
    padding: 18,
  },
});
