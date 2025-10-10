import Home from "../Screens/Home";
import NewGame from "../Screens/NewGame";
import Game from "../Screens/Game";
import { Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          const MappedRouteNames: Record<string, string> = {
            Home: (iconName = focused ? "home" : "home-outline"),
            NewGame: (iconName = focused ? "pencil" : "pencil-outline"),
          };

          iconName = MappedRouteNames[route.name];

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "gray",
        animation: "shift",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="NewGame" component={NewGame} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MyTabs} />

      <Stack.Screen
        name="Game"
        component={Game}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
