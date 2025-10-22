import "./global.css";
import MyStack from "./src/Routes/tab.routes";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { JainiPurva_400Regular } from "@expo-google-fonts/jaini-purva";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    JainiPurva_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      <Toast visibilityTime={4000} />
    </>
  );
}
