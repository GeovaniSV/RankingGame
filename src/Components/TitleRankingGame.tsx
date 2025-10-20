import { TextInput, View, Text } from "react-native";

function TitleRankingGame() {
  return (
    <View className="flex items-center justify-center">
      <View className="flex-row items-end">
        <Text className="text-6xl font-jaini">R</Text>
        <Text className="text-4xl font-jaini">anking</Text>
      </View>
      <View className="flex-row items-end">
        <Text className="text-6xl font-jaini ml-2">G</Text>
        <Text className="text-4xl font-jaini">ame</Text>
      </View>
    </View>
  );
}

export { TitleRankingGame };
