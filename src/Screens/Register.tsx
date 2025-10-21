import { useEffect, useState } from "react";
import { TextInputChangeEvent, View } from "react-native";
import { IUserRegister } from "../Types/userTypes";

//components
import { TextInputField } from "../Components/TextInputField";
import { ButtonField } from "../Components/ButtonField";
import { TitleRankingGame } from "../Components/TitleRankingGame";

//functions
import { userRegisterFunction } from "../Services/users/userRegister";

type EmptyFieldError = {
  message: string;
  rule: string;
  field: string;
}[];

export default function Register({ navigation }: any) {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [inputValues, setInputValues] = useState<IUserRegister>({
    fullName: "",
    email: "",
    password: "",
  });

  const createUser = async () => {
    const user = await userRegisterFunction(inputValues);

    if ("error" in user!) {
      handleErrors(user.error);
      return;
    }

    setUser(user!);

    setInputValues({
      fullName: "",
      email: "",
      password: "",
    });
  };

  const handleErrors = (value: string) => {
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
  };

  return (
    <View className="flex-1 justify-center items-center bg-backgroundGray">
      <View className="flex justify-between items-center h-4/5 w-[90%]">
        <TitleRankingGame />

        <View className="justify-center gap-12 p-8 w-full">
          <TextInputField
            label="Nome completo"
            placeholder="Digite seu nome"
            value={inputValues.fullName}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({ ...inputValues, fullName: e.nativeEvent.text })
            }
            onFocus={() => setErrors({ ...errors, fullName: "" })}
            error={errors.fullName ?? errors.fullName}
          />
          <TextInputField
            label="Email"
            placeholder="Digite sua senha"
            value={inputValues.email}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({ ...inputValues, email: e.nativeEvent.text })
            }
            onFocus={() => setErrors({ ...errors, email: "" })}
            error={errors.email ?? errors.email}
          />
          <TextInputField
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={inputValues.password}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({ ...inputValues, password: e.nativeEvent.text })
            }
            onFocus={() => setErrors({ ...errors, password: "" })}
            error={errors.password ?? errors.password}
          />
          <ButtonField title="Cadastrar" onPress={createUser} />
        </View>
      </View>
    </View>
  );
}
