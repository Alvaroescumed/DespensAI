import { useNavigation } from '@react-navigation/native'
import { Text, View, Button } from "react-native"
export default function WelcomePage (){

    const navigation = useNavigation()

    return(
        <View>
            <Text>Bienvenido a DespensAI</Text>
            <Button title="Iniciar Sesión" onPress={() => navigation.navigate('Login')}/>
            <Button title="Registrarse" onPress={() => navigation.navigate('Register')}/>
        </View> 
    )
}