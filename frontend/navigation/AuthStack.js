import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomePage from '../pages/WelcomePage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tabs from './Tabs'

const Stack = createNativeStackNavigator()

export default function AuthStack(){

  return(
    <Stack.Navigator
     initialRouteName="WelcomePage"
     screenOptions={{
      cardStyle: { backgroundColor: '#fff' }, 
        }}
      >
        <Stack.Screen 
          name="WelcomePage" 
          component={WelcomePage} 
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
            name="TabNav" 
            component={Tabs}  
            options={{
              headerShown:false
            }}
          />
          
      </Stack.Navigator>
)}
