import { NavigationContainer } from '@react-navigation/native';
import Loading from './src/screens/loading';
import Login from './src/screens/login';
import Register from './src/screens/register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import TimeRegistration from './src/screens/timeRegistration';
import Profile from './src/screens/profile';
import EditProfile from './src/screens/editProfile';
import WeeklySummary from './src/screens/weeklySummary';
import SearchWorker from './src/screens/searchWorker'; // Importa la pantalla SearchWorker

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Loading: Record<string, string> | undefined;
  Home: Record<string, string> | undefined;
  Register: Record<string, string> | undefined;
  Login: Record<string, string> | undefined;
  Profile: Record<string, string> | undefined;
  TimeRegistration: { timeRegistration?: { date: string; id: number; id_user: number } } | undefined;
  EditProfile: Record<string, string> | undefined;
  WeeklySummary: Record<string, string> | undefined;
  SearchWorker: undefined; // Agrega la pantalla SearchWorker
};

const RouterProvider = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Loading"
          component={Loading}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TimeRegistration"
          component={TimeRegistration}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="WeeklySummary"
          component={WeeklySummary}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="SearchWorker" // Asegúrate de que el nombre de la pantalla coincida con "SearchWorker"
          component={SearchWorker}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouterProvider;
