import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import { ThemeProvider } from 'react-native-elements';
import Home from './src/screens/home';
import Register from './src/screens/register';
import Login from './src/screens/login';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
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
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
