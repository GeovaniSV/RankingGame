import { Text, View, TouchableOpacity } from "react-native";

//components
import { TextInputField } from "../Components/TextInputField";
import { ButtonField } from "../Components/ButtonField";
import { TitleRankingGame } from "../Components/TitleRankingGame";

export default function Login({ navigation }: any) {
  return (
    <View className="flex-1 justify-center items-center bg-backgroundGray">
      <View className="flex justify-between items-center h-4/5 w-[90%]">
        <TitleRankingGame />

        <View className="justify-center gap-12 p-8 w-full">
          <TextInputField label="Email" placeholder="Digite sua senha" />
          <TextInputField
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
          />
          <ButtonField title="Entrar" />
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
