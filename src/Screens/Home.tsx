import { Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

//functions
import { getGames } from "../Services/gameFunctions";

//components
import { TitleRankingGame } from "../Components/TitleRankingGame";

//types/interfaces
import { IGame } from "../Types/gameTypes";

export default function Home({ navigation }: any) {
  const [stars, setStars] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
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
    <View className="flex-1 border bg-backgroundGray pt-10">
      <TitleRankingGame
        firstLetterSize="text-4xl"
        textSize="text-2xl"
        className="top-0"
      />
      <View className="w-full h-full p-5 gap-1">
        {games
          ? games.map((game) => (
              <View
                className="border w-full h-1/6 rounded-2xl flex-row p-2"
                key={game.id}
              >
                <View className="w-[25%]">
                  <Image
                    source={{ uri: game.filePath }}
                    className="mx-auto rounded-lg border"
                  />
                </View>
                <View className="flex-1 items-center p-1">
                  <View className="flex-row">
                    <Ionicons
                      name={stars[1] == false ? "star-outline" : "star"}
                      size={28}
                    />
                    <Ionicons
                      name={stars[2] == false ? "star-outline" : "star"}
                      size={28}
                    />
                    <Ionicons
                      name={stars[3] == false ? "star-outline" : "star"}
                      size={28}
                    />
                    <Ionicons
                      name={stars[4] == false ? "star-outline" : "star"}
                      size={28}
                    />
                    <Ionicons
                      name={stars[5] == false ? "star-outline" : "star"}
                      size={28}
                    />
                  </View>
                  <Text className="text-clip">{game.review}</Text>
                </View>
              </View>
            ))
          : null}
      </View>

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
