import { IGame } from "../Types/gameTypes";
import { getDataString } from "../utils/asyncStorage";
import { api } from "./api";

const postGame = async ({
  name,
  description,
  review,
  score,
  filePath,
}: IGame) => {
  try {
    const token = await getDataString("token");
    const hasName = name ? name : null;
    const hasDescription = description ? description : null;
    const hasFilePath = filePath ? filePath : null;
    await api.post(
      "/games",
      {
        name: hasName,
        description: hasDescription,
        review,
        score,
        filePath: hasFilePath,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
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
  const token = await getDataString("token");
  const response = await api.get(`/games/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export { postGame, getGames, getUniqueGame };
