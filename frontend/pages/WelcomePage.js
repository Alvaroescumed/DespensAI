import { useNavigation } from '@react-navigation/native'
import { Text, View, Button, StyleSheet } from "react-native"
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

const styles = StyleSheet.create({
    container: {
      flex: 1,  // Ocupa toda la pantalla
      justifyContent: 'center',  // Centra el contenido verticalmente
      alignItems: 'center',  // Centra el contenido horizontalmente
      backgroundColor: '#fff',  // Fondo blanco
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
  })