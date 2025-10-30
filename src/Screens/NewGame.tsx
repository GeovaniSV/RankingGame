import * as ImagePicker from "expo-image-picker";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInputChangeEvent,
} from "react-native";
import { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

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
import Toast from "react-native-toast-message";
import { EmptyFieldError } from "../Types/apiErrorsTypes";

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
  const [errors, setErrors] = useState({
    name: "",
    review: "",
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
    setErrors({ ...errors, filePath: "" });
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

    if (mimeType === "image/svg+xml") {
      Toast.show({
        type: "error",
        text1: "Formato não suportado",
        text2: "Imagens SVG não são suportadas. Envie JPG, PNG ou WEBP.",
      });
      return;
    }

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

    setInputValues({ ...inputValues, score: value });
  };

  const createCard = async () => {
    const response = await postGame(inputValues);
    console.log(response);
    if ("error" in response!) {
      handleErrors(response.error);
      console.log(response.error);
    } else {
      navigation.navigate("Home");
    }
  };

  const handleErrors = (value: any) => {
    const errorMap: Record<string | number, string> = {
      name: "O campo NOME deve ser preenchido",
      review: "O campo Review deve ser preenchido",
      filePath: "Uma imagem deve ser selecionada",
    };

    let errorArray: EmptyFieldError = [];
    for (let i = 0; i < value.length; i++) {
      errorArray.push(value[i]);
    }

    for (let i = 0; i < errorArray.length; i++) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorArray[i].field]: errorMap[errorArray[i].field],
      }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundGray" edges={["top"]}>
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TitleRankingGame
          firstLetterSize="text-4xl"
          textSize="text-2xl"
          className="top-0"
        />

        <View className="mt-3">
          <Text className="text-sm font-thin">
            Campos marcados com * são obrigatórios
          </Text>

          <View className="justify-center my-4">
            {!image.fileUri ? (
              <>
                <TouchableOpacity
                  className={`bg-gray-300 w-1/2 py-10 mx-auto rounded-lg flex justify-center items-center shadow ${errors.filePath ? "border border-red-500" : ""}`}
                  onPress={pickImage}
                >
                  <View className="border-hairline border-dashed flex justify-center items-center">
                    <MaterialCommunityIcons
                      name="file-image-plus-outline"
                      color={"#a9a9a9"}
                      size={100}
                    />
                  </View>
                  <Text>photo.jpg</Text>
                </TouchableOpacity>
                <Text className="text-red-500 text-xs mt-1 text-center">
                  {errors.filePath}
                </Text>
              </>
            ) : (
              <TouchableOpacity
                className="w-1/2 aspect-square mx-auto"
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
              label="Nome do jogo*"
              placeholder="Digite o nome do jogo"
              value={inputValues.name}
              onChange={(e: TextInputChangeEvent) =>
                setInputValues({ ...inputValues, name: e.nativeEvent.text })
              }
              onFocus={() => setErrors({ ...errors, name: "" })}
              error={errors.name ?? errors.name}
            />

            <TextInputField
              label="Review*"
              placeholder="Digite o que você achou desse game"
              value={inputValues.review}
              onChange={(e: TextInputChangeEvent) =>
                setInputValues({ ...inputValues, review: e.nativeEvent.text })
              }
              onFocus={() => setErrors({ ...errors, review: "" })}
              error={errors.review ?? errors.review}
            />

            <View className="flex mb-5">
              <Text className="text-sm font-semibold">Nota*</Text>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
