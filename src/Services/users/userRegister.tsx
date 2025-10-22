import Toast from "react-native-toast-message";
import { api } from "../api";
import { AxiosError, AxiosResponse } from "axios";

//types
import { IUserRegister, IUserLogin } from "../../Types/userTypes";

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

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, code } = error;
      let conflictError: any = {};
      if (status == 409) {
        const err = error.response?.data.Error;
        conflictError = {
          field: "conflict",
          err,
        };
      }
      const errorMap: Record<number, AxiosError> = {
        422: error.response?.data.errors,
        409: conflictError,
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
          400: response,
        };

      return { error: errorMap[status!] };
    }
  }
};

export { userRegisterFunction, userLoginFunction };
