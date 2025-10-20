import { ButtonProps, TextInputProps } from "react-native";

interface CustomTextInput extends TextInputProps {
  label?: string;
  error?: string;
  inputClassName?: string;
}

interface CustomButtom extends ButtonProps {
  title: string;
  containerClassName?: string;
  buttonClassName?: string;
}

export { CustomTextInput, CustomButtom };
