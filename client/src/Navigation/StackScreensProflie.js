import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Screens/Profile";
import SelectIneterest from "../Screens/SelectInterest";

const Stack = createNativeStackNavigator();

export default function StackProfile() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SelectInterest" component={SelectIneterest} />
    </Stack.Navigator>
  );
}
