import Toast from "react-native-toast-message";
import { useState } from "react";
import { TextInputChangeEvent, View } from "react-native";
import { IUserRegister } from "../Types/userTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//components
import { TextInputField } from "../Components/TextInputField";
import { ButtonField } from "../Components/ButtonField";
import { TitleRankingGame } from "../Components/TitleRankingGame";

//functions
import { userRegisterFunction } from "../Services/usersFunctions";

//interfaces/types
import { EmptyFieldError } from "../Types/apiErrorsTypes";

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
    Toast.show({
      type: "success",
      text1: "Sucesso",
      text2: "Usuário cadastrado com sucesso",
    });

    if ("error" in user!) {
      handleErrors(user.error);
      return;
    } else {
      navigation.navigate("Login");
    }

    setUser(user!);

    setInputValues({
      fullName: "",
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

    if (value.err.status == 409) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Email já cadastrado no sistema",
      });
    }
    for (let i = 0; i < errorArray.length; i++) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorArray[i].field]: errorMap[errorArray[i].field],
      }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-backgroundGray" edges={["bottom"]}>
      <KeyboardAwareScrollView
        className="flex-1"
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        extraScrollHeight={30}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center bg-backgroundGray">
          <View className="flex justify-between items-center h-4/5 w-[90%]">
            <TitleRankingGame />

            <View className="justify-center gap-12 p-8 w-full">
              <TextInputField
                label="Nome completo"
                placeholder="Digite seu nome"
                value={inputValues.fullName}
                onChange={(e: TextInputChangeEvent) =>
                  setInputValues({
                    ...inputValues,
                    fullName: e.nativeEvent.text,
                  })
                }
                onFocus={() => setErrors({ ...errors, fullName: "" })}
                error={errors.fullName ?? errors.fullName}
              />
              <TextInputField
                label="Email"
                placeholder="Digite seu email"
                autoCorrect={false}
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
                autoCorrect={false}
                secureTextEntry
                value={inputValues.password}
                onChange={(e: TextInputChangeEvent) =>
                  setInputValues({
                    ...inputValues,
                    password: e.nativeEvent.text.toLowerCase(),
                  })
                }
                autoCapitalize="none"
                onFocus={() => setErrors({ ...errors, password: "" })}
                error={errors.password ?? errors.password}
              />
              <ButtonField title="Cadastrar" onPress={createUser} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
