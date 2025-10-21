import { api } from "../api";
import { AxiosError } from "axios";

//types
import { IUserRegister } from "../../Types/userTypes";

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

export { userRegisterFunction };
