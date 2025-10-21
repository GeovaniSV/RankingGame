import { TextInput, View, Text } from "react-native";
import { CustomTextInput } from "../Types/componentsTypes";

function TextInputField({
  label,
  error,
  inputClassName,
  ...props
}: CustomTextInput) {
  return (
    <View>
      <Text className="text-sm font-semibold mb-1">{label}</Text>
      <TextInput
        className={`bg-inputGray p-4 rounded-lg shadow-sm ${error ? "border border-red-500 text-red-500" : ""}`}
        placeholder="Digite sua senha"
        {...props}
      />
      <Text className="text-red-500 text-xs mt-1">{error}</Text>
    </View>
  );
}

export { TextInputField };
