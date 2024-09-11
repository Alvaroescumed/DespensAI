import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomePage from './pages/WelcomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import Inicio from './pages/Inicio'
import NewRecipe from './pages/NewRecipe'
import AIRecipe from './pages/AIRecipe'

const Stack = createNativeStackNavigator()

export default function App(){

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="WelcomePage" 
          component={WelcomePage} 
          options={{
            title: '', 
            headerShown:true
          }} 
        />
        <Stack.Screen 
          name="NewRecipe" 
          component={NewRecipe} 
          options={{
            title: '', 
            headerShown:true
          }} 
        />
        
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#6CB089',
            headerStyle: {
              backgroundColor: '#fff'
            }
            }} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#6CB089',
            headerStyle: {
              backgroundColor: '#fff'
            }
            }} 
          />
          <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#6CB089',
            headerStyle: {
              backgroundColor: '#fff'
            }
            }} 
          />
          <Stack.Screen 
          name="AIRecipe" 
          component={AIRecipe} 
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#6CB089',
            headerStyle: {
              backgroundColor: '#fff'
            }
            }} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}