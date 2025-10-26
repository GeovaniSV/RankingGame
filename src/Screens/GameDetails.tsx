import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//functions
import { getUniqueGame } from "../Services/gameFunctions";

export default function Game({}) {
  const route = useRoute();
  const { gameId } = route.params as { gameId: number };
  const [gameDetail, setGameDetail] = useState();

  const getGame = async () => {
    console.log(gameId);
    const game = await getUniqueGame(gameId!);
    console.log(game);
  };

  useEffect(() => {
    getGame();
  }, []);

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
