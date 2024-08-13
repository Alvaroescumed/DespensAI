import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomePage from './components/WelcomePage'
import Login from './components/Login'
import Register from './components/Register'

const Stack = createNativeStackNavigator()

export default function App(){

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{title: 'Inicio'}} />
        <Stack.Screen name="Login" component={Login} options={{title: 'Login'}} />
        <Stack.Screen name="Register" component={Register} options={{title: 'Register'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}