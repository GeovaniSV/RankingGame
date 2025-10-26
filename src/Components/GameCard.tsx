import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import { IGame } from "../Types/gameTypes";

function GameCard({
  id,
  name,
  description,
  review,
  score,
  filePath,
  onPress,
}: IGame & { onPress?: () => void }) {
  const [stars, setStars] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  return (
    <Pressable
      onPress={onPress}
      className="border w-full rounded-2xl flex-row p-2 mb-3"
      style={{ height: 120 }}
      android_ripple={{ color: "#ccc" }}
    >
      <View className="w-[35%] border rounded-lg overflow-hidden">
        <Image
          source={{ uri: filePath }}
          className="h-full w-full rounded-lg"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 items-center p-1">
        <View className="flex-row">
          <Ionicons
            name={stars[1] == false ? "star-outline" : "star"}
            size={28}
          />
          <Ionicons
            name={stars[2] == false ? "star-outline" : "star"}
            size={28}
          />
          <Ionicons
            name={stars[3] == false ? "star-outline" : "star"}
            size={28}
          />
          <Ionicons
            name={stars[4] == false ? "star-outline" : "star"}
            size={28}
          />
          <Ionicons
            name={stars[5] == false ? "star-outline" : "star"}
            size={28}
          />
        </View>
        <Text className="text-clip">{review}</Text>
      </View>
    </Pressable>
  );
}

export { GameCard };
