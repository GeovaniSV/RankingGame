import { IGame } from "../Types/gameTypes";
import { getDataString } from "../utils/asyncStorage";
import { api } from "./api";

const postGame = async ({
  name,
  description,
  review,
  score,
  file_path,
}: IGame) => {
  try {
    const token = await getDataString("token");
    const hasName = name ? name : null;
    const hasDescription = description ? description : null;
    const hasfile_path = file_path ? file_path : null;
    await api.post(
      "/games",
      {
        name: hasName,
        description: hasDescription,
        review,
        score,
        file_path: hasfile_path,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("passei aqui");
  } catch (error) {
    console.log(error);
  }
};

const getGames = async () => {
  try {
    const token = await getDataString("token");
    const response = await api.get("/games", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const getUniqueGame = async (id: number) => {
  try {
    const token = await getDataString("token");
    const response = await api.get(`/games/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteGame = async (id: number) => {
  try {
    const token = await getDataString("token");
    const response = await api.delete(`/games/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { postGame, getGames, getUniqueGame, deleteGame };
