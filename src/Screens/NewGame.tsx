import * as ImagePicker from "expo-image-picker";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInputChangeEvent,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

//components
import { TextInputField } from "../Components/TextInputField";
import { ButtonField } from "../Components/ButtonField";
import { TitleRankingGame } from "../Components/TitleRankingGame";
import { postGame } from "../Services/gameFunctions";

//functions
import { storeDataString } from "../utils/asyncStorage";
import { saveBase64ImageToFile } from "../utils/imagesFunction";

//types/intefaces
import { IGame } from "../Types/gameTypes";

export default function NewGame({ navigation }: any) {
  const [image, setImage] = useState({
    fileName: "",
    fileUri: "",
    mimeType: "",
  });
  const [inputValues, setInputValues] = useState({
    name: "",
    description: "",
    review: "",
    score: 1,
    filePath: "",
  });
  const [stars, setStars] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Precisamos de permissão para acessar suas fotos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (result.canceled) return;

    const imagePicked = result.assets[0];
    const imageBase64 = imagePicked.base64;
    const fileName = imagePicked.fileName || `image_${Date.now()}.jpg`;
    const absoluteUri = imagePicked.uri;
    const mimeType = imagePicked.mimeType;

    await storeDataString(fileName, imageBase64!);

    const filePath = await saveBase64ImageToFile(fileName);

    setInputValues({ ...inputValues, filePath: filePath! });

    setImage({
      fileName: fileName,
      fileUri: absoluteUri,
      mimeType: mimeType!,
    });
  };

  const handleStars = (value: number) => {
    setStars((prevStars) => {
      const newStars: Record<number, boolean> = { ...prevStars };

      if (prevStars[value] == false) {
        for (let i = 1; i <= value; i++) {
          newStars[i] = true;
        }
      } else {
        for (let i = value + 1; i <= 5; i++) {
          newStars[i] = false;
        }
      }

      return newStars;
    });

    console.log(inputValues);
    setInputValues({ ...inputValues, score: value });
  };

  const createCard = async () => {
    console.log(inputValues.filePath);
    if (inputValues.filePath != "") {
      await postGame(inputValues);
      navigation.navigate("Home");
    }
  };

  return (
    <View className="flex-1 bg-backgroundGray rounded-2xl p-5">
      <TitleRankingGame
        firstLetterSize="text-4xl"
        textSize="text-2xl"
        className="top-0"
      />

      <View className="mt-3 h-[80%]">
        <Text className="text-sm font-thin">
          Campos marcados com * são obrigatórios
        </Text>

        <View className="flex-1 justify-center">
          {!image.fileUri ? (
            <ButtonField title="Escolha uma imagem" onPress={pickImage} />
          ) : (
            <TouchableOpacity
              className="w-[50%] h-[60%] mx-auto "
              onPress={pickImage}
            >
              <Image
                source={{ uri: image.fileUri }}
                className="w-full h-full mx-auto rounded-lg"
              />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <TextInputField
            label="Jogo*"
            placeholder="Digite o nome do jogo"
            value={inputValues.name}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({ ...inputValues, name: e.nativeEvent.text })
            }
          />

          <TextInputField
            label="Review*"
            placeholder="Digite o que achou do jogo"
            value={inputValues.review}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({ ...inputValues, review: e.nativeEvent.text })
            }
          />

          <View className="flex mb-5">
            <Text className="text-sm font-semibold ">Nota*</Text>
            <View className="flex-row justify-around items-center">
              <TouchableOpacity onPress={() => handleStars(1)}>
                <Ionicons
                  name={stars[1] == false ? "star-outline" : "star"}
                  size={38}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleStars(2)}>
                <Ionicons
                  name={stars[2] == false ? "star-outline" : "star"}
                  size={38}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleStars(3)}>
                <Ionicons
                  name={stars[3] == false ? "star-outline" : "star"}
                  size={38}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleStars(4)}>
                <Ionicons
                  name={stars[4] == false ? "star-outline" : "star"}
                  size={38}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleStars(5)}>
                <Ionicons
                  name={stars[5] == false ? "star-outline" : "star"}
                  size={38}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ButtonField title="Enviar" onPress={createCard} />
        </View>
      </View>
    </View>
  );
}
