import { useEffect, useState } from "react";
import { TextInputChangeEvent, View } from "react-native";
import { IUserRegister } from "../Types/userTypes";

//components
import { TextInputField } from "../Components/TextInputField";
import { ButtonField } from "../Components/ButtonField";
import { TitleRankingGame } from "../Components/TitleRankingGame";

//functions
import { userRegisterFunction } from "../Services/users/userRegister";

export default function Register({ navigation }: any) {
  const [inputValues, setInputValues] = useState<IUserRegister>({
    fullName: "",
    email: "",
    password: "",
  });

  const createUser = async () => {
    await userRegisterFunction(inputValues);
  };

  useEffect(() => {
    inputValues.fullName = "";
    inputValues.email = "";
    inputValues.password = "";
  }, []);
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
          />
          <TextInputField
            label="Email"
            placeholder="Digite sua senha"
            value={inputValues.email}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({ ...inputValues, email: e.nativeEvent.text })
            }
          />
          <TextInputField
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            value={inputValues.password}
            onChange={(e: TextInputChangeEvent) =>
              setInputValues({ ...inputValues, password: e.nativeEvent.text })
            }
          />
          <ButtonField title="Cadastrar" onPress={createUser} />
        </View>
      </View>
    </View>
  );
}
