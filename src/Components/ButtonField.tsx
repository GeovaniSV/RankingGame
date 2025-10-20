import { Pressable, View, Text } from "react-native";
import { CustomButtom } from "../Types/componentsTypes";

function ButtonField({
  title,
  buttonClassName,
  containerClassName,
  ...props
}: CustomButtom) {
  return (
    <View>
      <Pressable
        className={`p-4 bg-bluePrimary rounded-lg shadow-sm
          ${buttonClassName ? buttonClassName : ""}`}
        {...props}
      >
        <Text className="text-lg font-bold text-white text-center">
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

export { ButtonField };
