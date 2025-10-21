import { api } from "../api";
import { AxiosError } from "axios";

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
      const errorMap: Record<number, string> = {
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
    console.log(error);
    if (error instanceof AxiosError) {
      const { status, code } = error;
      const errorMap: Record<number, string> = {
        422: error.response?.data.errors,
      };

      return { error: errorMap[status!] };
    }
  }
};

export { userRegisterFunction, userLoginFunction };
