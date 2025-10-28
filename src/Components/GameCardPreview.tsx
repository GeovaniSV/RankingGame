import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { View, Text, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { IGameCardPreview } from "../Types/gameTypes";
import { colors } from "../Styles/colors";

function GameCardPreview({ review, score, onPress }: IGameCardPreview) {
  const [stars, setStars] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const handleScore = (value: number) => {
    if (value) {
      setStars((prevStars) => {
        const newStars: Record<number, boolean> = { ...prevStars };

        if (prevStars[value] == false) {
          for (let i = 1; i <= value; i++) {
            newStars[i] = true;
          }
        } else {
          for (let i = value + 1; i <= 5; i++) {
            newStars[i] = false;
          }
        }

        return newStars;
      });
    }
  };

  useEffect(() => {
    handleScore(score);
  }, []);
  return (
    <Pressable
      onPress={onPress}
      className="border w-full rounded-2xl flex-row p-2 mb-3"
      style={{ height: 120 }}
      android_ripple={{ color: "#ccc" }}
    >
      <View className="w-[35%]">
        <MaterialIcons name="post-add" size={100} />
      </View>

      <View className=" flex-1 items-center p-1">
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
        <View className="flex-1 w-full items-center justify-center">
          <Text>{review}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export { GameCardPreview };
