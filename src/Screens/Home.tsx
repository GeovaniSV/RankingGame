import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";

//functions
import { getGames } from "../Services/gameFunctions";

//components
import { TitleRankingGame } from "../Components/TitleRankingGame";

//types/interfaces
import { IGame } from "../Types/gameTypes";
import { GameCard } from "../Components/GameCard";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { colors } from "../Styles/colors";

export default function Home({ navigation }: any) {
  const [games, setGames] = useState<IGame[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadGames = async (pageNum: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await getGames(pageNum, 5);

      if (response.data.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      if (pageNum === 1) {
        setGames(response.data);
        setPage(2);
        setHasMore(!!response.meta.nextPageUrl);
      } else {
        setGames((prev) => [...prev, ...response.data]);
        setPage(pageNum + 1);
        setHasMore(!!response.meta.nextPageUrl);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      setGames([]);
      setPage(1);
      setHasMore(true);
      loadGames(1);
    }, [])
  );

  const loadMoreGames = () => {
    if (!loading && hasMore) {
      loadGames(page);
    }
  };

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
          <>
            <GameCard
              review={item.review}
              score={item.score}
              filePath={item.file_path}
              onPress={() => navigation.navigate("Game", { gameId: item.id })}
            />
          </>
        )}
        onEndReached={loadMoreGames}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
          gap: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size={"large"} color={colors.bluePrimary} />
          ) : null
        }
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
