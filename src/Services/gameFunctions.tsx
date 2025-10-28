import { AxiosError } from "axios";
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
    const hasfilePath = filePath ? filePath : null;
    await api.post(
      "/games",
      {
        name: hasName,
        description: hasDescription,
        review,
        score,
        filePath: hasfilePath,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, code } = error;
      const errorMap: Record<number, AxiosError> = {
        422: error.response?.data.errors,
      };
      console.log(errorMap[status!]);
      return { error: errorMap[status!] };
    }
  }
};

const getGames = async (page: number, limit: number) => {
  try {
    const token = await getDataString("token");
    const response = await api.get(`/games?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, code } = error;
      const errorMap: Record<number, AxiosError> = {
        422: error.response?.data.errors,
        404: error.response?.data,
      };
      console.log(errorMap[status!]);
      return { error: errorMap[status!] };
    }
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
