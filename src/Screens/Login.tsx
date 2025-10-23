import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInputChangeEvent,
} from "react-native";

//components
import { TextInputField } from "../Components/TextInputField";
import { ButtonField } from "../Components/ButtonField";
import { TitleRankingGame } from "../Components/TitleRankingGame";

//functions
import { userLoginFunction } from "../Services/usersFunctions";
import { storeDataString } from "../utils/asyncStorage";

//interfaces/types
import { IUserLogin } from "../Types/userTypes";
import { EmptyFieldError } from "../Types/apiErrorsTypes";

export default function Login({ navigation }: any) {
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [inputValues, setInputValues] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const login = async () => {
    const token = await userLoginFunction(inputValues);

    if ("error" in token!) {
      handleErrors(token.error);
      return;
    }

    storeDataString("token", token?.data.token);

    navigation.navigate("Home");

    setInputValues({
      email: "",
      password: "",
    });
  };

  const handleErrors = (value: any) => {
    const errorMap: Record<string, string> = {
      fullName: "Campo NOME COMPLETO deve ser preenchido",
      email: "O campo EMAIL deve ser preenchido com um email válido",
      password: "Campo SENHA deve ser preenchido",
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

    setInputValues({
      email: "",
      password: "",
    });
  };

  return (
    <View className="flex-1 justify-center items-center bg-backgroundGray">
      <View className="flex justify-between items-center h-4/5 w-[90%]">
        <TitleRankingGame />

        <View className="justify-center gap-12 p-8 w-full">
          <TextInputField
            label="Email"
            placeholder="Digite seu email"
            value={inputValues.email}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({
                ...inputValues,
                email: e.nativeEvent.text.toLowerCase(),
              })
            }
            autoCapitalize="none"
            onFocus={() => setErrors({ ...errors, email: "" })}
            error={errors.email ?? errors.email}
          />
          <TextInputField
            label="Senha"
            placeholder="Digite sua senha"
            value={inputValues.password}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({
                ...inputValues,
                password: e.nativeEvent.text.toLowerCase(),
              })
            }
            autoCapitalize="none"
            secureTextEntry
            error={errors.password ?? errors.password}
            onFocus={() => setErrors({ ...errors, password: "" })}
          />
          <ButtonField title="Entrar" onPress={login} />
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text>Não tem uma conta? Inscreva-se já!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
