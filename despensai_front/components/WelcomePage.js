import {UseNavigation} from '@react-navigation/native'
import { Text } from "react-native"
export default function WelcomePage (){
    return(
        <View>
            <Text>Bienvenido a DespensAI</Text>
            <Button title="Iniciar Sesión"/>
            <Button title="Registrarse"/>
        </View> 
    )
}