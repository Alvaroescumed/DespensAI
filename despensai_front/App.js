import {NavigationContainer} from '@react-navigation/native'
import WelcomePage from './components/WelcomePage'
const Stack = createNativeStackNavigator()

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigation>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{title: 'Inicio'}} />
      </Stack.Navigation>
    </NavigationContainer>
  )
}