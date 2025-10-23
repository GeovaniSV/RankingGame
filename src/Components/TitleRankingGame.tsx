import { View, Text } from "react-native";

//types/interface
import { CustomTitleRankingGame } from "../Types/componentsTypes";

function TitleRankingGame({
  className,
  firstLetterSize,
  textSize,
}: CustomTitleRankingGame) {
  return (
    <View
      className={`flex items-center justify-center ${className ? className : ""}`}
    >
      <View className="flex-row items-end">
        <Text
          className={`font-jaini ${firstLetterSize ? firstLetterSize : "text-6xl"}`}
        >
          R
        </Text>
        <Text className={`font-jaini ${textSize ? textSize : "text-4xl"}`}>
          anking
        </Text>
      </View>
      <View className="flex-row items-end">
        <Text
          className={`font-jaini ml-2 ${firstLetterSize ? firstLetterSize : "text-6xl"}`}
        >
          G
        </Text>
        <Text className={`font-jaini ${textSize ? textSize : "text-4xl"}`}>
          ame
        </Text>
      </View>
    </View>
  );
}

export { TitleRankingGame };
