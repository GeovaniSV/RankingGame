import { Pressable, View, Text } from "react-native";
import { CustomButtom } from "../Types/componentsTypes";

function ButtonField({
  title,
  buttonClassName,
  className,
  containerClassName,
  ...props
}: CustomButtom) {
  return (
    <View className={`${className ? className : ""}`}>
      <Pressable
        className={`${containerClassName ? containerClassName : "p-4"} bg-bluePrimary rounded-sm shadow-sm
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
