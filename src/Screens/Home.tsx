import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

//functions
import { getGames } from "../Services/gameFunctions";

//components
import { TitleRankingGame } from "../Components/TitleRankingGame";

//types/interfaces
import { IGame } from "../Types/gameTypes";
import { GameCard } from "../Components/GameCard";

export default function Home({ navigation }: any) {
  const [games, setGames] = useState<IGame[]>([]);

  const getGameFromAPI = async () => {
    const response = await getGames();
    setGames(response.data);
  };

  useEffect(() => {
    getGameFromAPI();
    console.log(games);
  }, []);
  return (
    <View className="flex-1 bg-backgroundGray pt-10">
      <TitleRankingGame
        firstLetterSize="text-4xl"
        textSize="text-2xl"
        className="top-0"
      />

      <FlatList
        data={games}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <GameCard
            review={item.review}
            score={item.score}
            filePath={item.filePath}
            onPress={() => navigation.navigate("Game", { gameId: item.id })}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
          gap: 1,
        }}
        showsVerticalScrollIndicator={false}
      />

      <View className="bg-backgroundGray border w-[15%] h-[7%] absolute bottom-[10%] right-[5%] flex justify-center items-center shadow-black shadow rounded-lg">
        <TouchableOpacity
          className="flex-1 w-full items-center justify-center"
          onPress={() => navigation.navigate("NewGame")}
        >
          <Ionicons name="add" size={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
