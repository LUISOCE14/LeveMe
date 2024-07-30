import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Screens/Profile";
import SelectInterest from "../Screens/SelectInterest";

const Stack = createNativeStackNavigator();

export default function StackGroupProfile() {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="ProfileMain" component={Profile} />
            <Stack.Screen name="SelectInterest" component={SelectInterest} options={({route}) => ({
                params: {interesesUser: route.params.intereses, idUser: route.params.idUser,}
            })}/>
        </Stack.Navigator>
    );
}