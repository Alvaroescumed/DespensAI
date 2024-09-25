import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View, TextInput, StyleSheet } from "react-native"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyButton from '../components/MyButton'

export default function Login (){

    const [username, setUsername ] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigation = useNavigation()

    async function handleLogin () {
        if (!username || !password) {
            setError('Por favor, completa todos los campos')
            return
        }
    
        axios.post('http://10.0.2.2:8000/api/login/', 
            { username, password }, 
            { headers: { 'Content-Type': 'application/json' } 
            })
            .then(async response => {

                const token = response.data.token
                try{
                    await AsyncStorage.setItem('userToken', token)
                    navigation.navigate('TabNav')    
                    console.log('Inicio de sesion correcto', token)
                } catch (error){
                    console.log('Error al guardar el token', error)
                }

            })
            .catch(error => {
                setError(error.response.data.message) // usamos el mensaje de error del servidor para ver el error del login
                console.log('Error en la solicitud', error.message)
            })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>DespensAI</Text>
            <Text style={styles.subtitle}>Rellena los siguientes campos</Text>
            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder='Nombre de usuario'
                    onChangeText={(value) => setUsername(value)}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value)}
                />

                {error && <Text style={styles.error}>{error}</Text>}

                <MyButton 
                    text='Iniciar sesión'
                    onPress={handleLogin}/>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: '50%',
        backgroundColor: '#fff',
        marginTop: 90,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        marginVertical: 10
    },
    inputsContainer: {
        paddingVertical: 10,
        width: 300
    },
    error: {
        color: 'red',
        marginTop: 8,
    },
    title: {
        fontSize: 42,
        marginBottom: 20,
        fontFamily: 'Righteous',
        color: '#6CB089'
      },
      subtitle:{
        fontFamily: 'Nunito',
        fontSize: 18
      }
})