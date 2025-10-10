import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./src/Routes/tab.routes";

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
