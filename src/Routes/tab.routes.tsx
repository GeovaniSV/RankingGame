import Home from "../Screens/Home";
import Criar from "../Screens/Criar";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          const MappedRouteNames: Record<string, string> = {
            Home: (iconName = focused ? "home" : "home-outline"),
            Criar: (iconName = focused ? "pencil" : "pencil-outline"),
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
      <Tab.Screen name="Detalhes" component={Criar} />
    </Tab.Navigator>
  );
}
