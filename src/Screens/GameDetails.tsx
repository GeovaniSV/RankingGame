import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, View, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ButtonField } from "../Components/ButtonField";

//functions
import { getUniqueGame, deleteGame } from "../Services/gameFunctions";

//types/interfaces
import { IGame } from "../Types/gameTypes";
import Toast from "react-native-toast-message";

export default function Game({ navigation }: any) {
  const [openModal, setOpenModal] = useState(false);
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

    if (!game) {
      Toast.show({
        type: "error",
        text1: "Erro inesperado",
        text2: "Ocorreu um erro inesperado, tente novamente mais tarde!",
      });
      navigation.goBack();
    } else {
      setGameDetail(game);
    }
  };

  const handleScore = () => {
    if (gameDetail) {
      setStars((prevStars) => {
        const newStars: Record<number, boolean> = { ...prevStars };

        if (prevStars[gameDetail.score] == false) {
          for (let i = 1; i <= gameDetail.score; i++) {
            newStars[i] = true;
          }
        } else {
          for (let i = gameDetail.score + 1; i <= 5; i++) {
            newStars[i] = false;
          }
        }

        return newStars;
      });
    }
  };

  const deleteGameDetail = async () => {
    setOpenModal(false);
    const deleted = await deleteGame(gameDetail?.id!);

    if (deleted) {
      navigation.navigate("Home", { refresh: true });
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        getGame();
      }, 100);
    }, [])
  );

  useEffect(() => {
    if (gameDetail) {
      handleScore();
    }
  }, [gameDetail]);

  return (
    <View className="flex-1 pt-10 pb-10 justify-center items-center bg-backgroundGray">
      <Modal visible={openModal} transparent={true} animationType="fade">
        <View className="bg-black/45 flex-1 items-center justify-center">
          <View className="bg-backgroundGray rounded-sm w-[90%]">
            <View className="p-2 rounded-t-sm bg-red-500 ">
              <Text className="font-inter text-2xl text-white">
                Apagar Review
              </Text>
            </View>

            <View className="p-2 mt-2">
              <Text className="font-inter text-sm">
                Tem certeza que deseja apagar a review de:
                <Text className="font-bold"> {gameDetail?.name}</Text>?
              </Text>
            </View>

            <View className="flex-row gap-4 justify-end p-2 border-t border-gray-300 mt-2">
              <ButtonField
                title="Cancelar"
                buttonClassName="bg-buttonGray"
                containerClassName="p-2"
                onPress={() => setOpenModal(false)}
              />
              <ButtonField
                title="Apagar"
                buttonClassName="bg-red-500"
                containerClassName="p-2"
                onPress={deleteGameDetail}
              />
            </View>
          </View>
        </View>
      </Modal>
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
      <View className="flex w-[50%] h-[25%] mb-5">
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
          onPress={() => setOpenModal(true)}
        />
      </View>
    </View>
  );
}
