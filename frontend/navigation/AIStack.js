import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AIChat from '../pages/AIChat'
import AIRecipe from '../pages/AIRecipe'

const Stack = createNativeStackNavigator()

export default function AIStackNavigation(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="AIRecipe" 
                component={AIRecipe} 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="AIChat" 
                component={AIChat} 
                options={{headerShown: false}} 
            />
        </Stack.Navigator>
    )
}