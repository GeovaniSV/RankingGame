import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Home from "../Screens/Home";
import NewGame from "../Screens/NewGame";
import Game from "../Screens/Game";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="NewGame" component={NewGame} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}

export default MyStack;
