import * as FileSystem from "expo-file-system/legacy";
import { getDataString } from "./asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveBase64ImageToFile = async (fileName: string) => {
  try {
    const base64Image = await getDataString(fileName);
    if (!base64Image) {
      console.log("Imagem não encontrada no AsyncStorage");
      return null;
    }

    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const dirPath = FileSystem.documentDirectory + "ranking-game-photos/";
    await FileSystem.makeDirectoryAsync(dirPath, { intermediates: true });

    const filePath = dirPath + fileName;
    await FileSystem.writeAsStringAsync(filePath, base64Data, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await AsyncStorage.removeItem(fileName);

    return filePath;
  } catch (error) {
    console.error("Erro ao salvar imagem:", error);
    return null;
  }
};

const deleteImageFromFiles = async (fileURI: string) => {
  try {
    if (!fileURI || fileURI == "") {
      console.log("FileURI é inválido");
      return;
    }
    const fileInfo = await FileSystem.getInfoAsync(fileURI);

    if (fileInfo.exists) {
      await FileSystem.deleteAsync(fileURI, { idempotent: true });
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export { saveBase64ImageToFile, deleteImageFromFiles };
