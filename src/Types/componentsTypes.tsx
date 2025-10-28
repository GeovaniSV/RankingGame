import { ButtonProps, TextInputProps } from "react-native";

interface CustomTextInput extends TextInputProps {
  label?: string;
  error?: string | null;
  inputClassName?: string;
}

interface CustomButtom extends ButtonProps {
  title: string;
  containerClassName?: string;
  buttonClassName?: string;
  className?: string;
}

interface CustomTitleRankingGame {
  className?: string;
  firstLetterSize?: string;
  textSize?: string;
}

export { CustomTextInput, CustomButtom, CustomTitleRankingGame };
