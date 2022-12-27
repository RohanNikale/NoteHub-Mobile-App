import Login from './components/Login';
import SignUP from './components/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Addnote from './components/Addnote';
import Profile from './components/Profile';
export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUP} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Addnote" component={Addnote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

