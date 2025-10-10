import { NavigationContainer } from "@react-navigation/native";
import MyStack from "./src/Routes/tab.routes";

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
