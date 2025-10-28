import Toast from "react-native-toast-message";
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
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../Styles/colors";

//functions
import { getGames } from "../Services/gameFunctions";

//components
import { TitleRankingGame } from "../Components/TitleRankingGame";
import { GameCardPreview } from "../Components/GameCardPreview";

//types/interfaces
import { IGame } from "../Types/gameTypes";
import { GameCard } from "../Components/GameCard";

export default function Home({ navigation }: any) {
  const [games, setGames] = useState<IGame[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadGames = async (pageNum: number) => {
    if (loading || !hasMore) {
      return;
    }

    try {
      const response = await getGames(pageNum, 5);

      if (pageNum === 1) {
        setGames(response.data);
      } else {
        setGames((prev) => [...prev, ...response.data]);
      }

      if (response.meta.nextPageUrl && response.data.length > 0) {
        setPage(pageNum + 1);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setGames([]);
      setPage(1);
      setHasMore(true);
      setTimeout(() => {
        loadGames(1);
      }, 100);
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
        ListEmptyComponent={
          !loading ? (
            <GameCardPreview
              review="Nenhum card ainda, crie um clicando aqui, ou no botão abaixo!"
              score={5}
              onPress={() => navigation.navigate("NewGame")}
            />
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
