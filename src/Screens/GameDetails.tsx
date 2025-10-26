import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonField } from "../Components/ButtonField";
import { TitleRankingGame } from "../Components/TitleRankingGame";

//functions
import { getUniqueGame, deleteGame } from "../Services/gameFunctions";

//types/interfaces
import { IGame } from "../Types/gameTypes";

export default function Game({ navigation }: any) {
  const [stars, setStars] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const route = useRoute();
  const { gameId } = route.params as { gameId: number };
  const [gameDetail, setGameDetail] = useState<IGame>();

  const getGame = async () => {
    const game = await getUniqueGame(gameId);

    if (game) {
      setGameDetail(game.data);
    }
  };

  const deleteGameDetail = async () => {
    await deleteGame(gameDetail?.id!);
    navigation.goBack();
  };

  useEffect(() => {
    getGame();
  }, []);

  return (
    <View className="flex-1 pt-10 pb-10 justify-center items-center">
      <View className={`flex items-center justify-center mb-10`}>
        <View className="flex-row items-end">
          <Text className={`font-jaini text-6xl`}>
            {gameDetail?.name?.slice(0, 1)}
          </Text>
          <Text className={`font-jaini text-4xl`}>
            {gameDetail?.name?.slice(1)}
          </Text>
        </View>
      </View>
      <View className="flex w-[80%] h-[30%] mb-5">
        <Image
          source={{ uri: gameDetail?.filePath }}
          className="w-full h-full mx-auto rounded-lg"
        />
      </View>

      <View className="flex-1 w-full p-10">
        <Text>{gameDetail?.review}</Text>
        <View className="flex-1 items-end">
          <View className="flex-row">
            <Text className="text-sm font-jaini">Nota: </Text>
            <Ionicons
              name={stars[1] == false ? "star-outline" : "star"}
              size={15}
            />
            <Ionicons
              name={stars[2] == false ? "star-outline" : "star"}
              size={15}
            />
            <Ionicons
              name={stars[3] == false ? "star-outline" : "star"}
              size={15}
            />
            <Ionicons
              name={stars[4] == false ? "star-outline" : "star"}
              size={15}
            />
            <Ionicons
              name={stars[5] == false ? "star-outline" : "star"}
              size={15}
            />
          </View>
        </View>
      </View>
      <View className="flex-row justify-around w-full gap-1 p-2">
        <ButtonField
          title={"Fechar"}
          className="w-1/2"
          onPress={() => navigation.goBack()}
        />
        <ButtonField
          title={"Apagar"}
          buttonClassName="bg-red-500"
          className="w-1/2"
          onPress={deleteGameDetail}
        />
      </View>
    </View>
  );
}
