import { api } from "../api";
import { IUserRegister } from "../../Types/userTypes";
import { isAxiosError, AxiosError } from "axios";

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
      const errorMap = {
        422: "Invalid user credentials",
      };

      //tamo tentando fazer um negocio ai
    }
  }
};

export { userRegisterFunction };
