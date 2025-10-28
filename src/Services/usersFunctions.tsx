import Toast from "react-native-toast-message";
import { api } from "./api";
import { AxiosError, AxiosResponse } from "axios";

//types
import { IUserRegister, IUserLogin } from "../Types/userTypes";

const userRegisterFunction = async ({
  fullName,
  email,
  password,
}: IUserRegister) => {
  try {
    const user = await api.post("/auth/register", {
      fullName,
      email,
      password,
    });

    if (user) {
      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Usuário cadastrado com sucesso",
      });
    }

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, code } = error;

      if (status == 409) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Email já cadastrado no sistema",
        });
      }
      const errorMap: Record<number, AxiosError> = {
        422: error.response?.data.errors,
      };

      return { error: errorMap[status!] };
    }
  }
};

const userLoginFunction = async ({ email, password }: IUserLogin) => {
  try {
    const token = await api.post("/auth/login", {
      email,
      password,
    });

    return token;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, response } = error;
      const errorMap: Record<number, AxiosResponse<any, any, {}> | undefined> =
        {
          422: error.response?.data.errors,
        };

      if (status === 400) {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Credenciais de usuário inválidas",
        });
      }

      return { error: errorMap[status!] };
    }
  }
};

export { userRegisterFunction, userLoginFunction };
