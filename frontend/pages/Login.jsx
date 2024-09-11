import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import axios from 'axios'

export default function Login (){

    const [username, setUsername ] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigation = useNavigation()

    function handleLogin () {
        if (!username || !password) {
            setError('Por favor, completa todos los campos')
            return
        }
    
        axios.post('http://127.0.0.1:8000/api/login/', { username, password }, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                const token = response.data.token
                navigation.navigate('Inicio')    
            })
            .catch(error => {
                setError(error.response.data.message) // usamos el mensaje de error del servidor para ver el error del login
                console.log('Error en la solicitud', error.message)
            })
    }

    return(
        <View style={styles.container}>
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

                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 90
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
        paddingTop: '40%',
        paddingHorizontal: 20
    },
    error: {
        color: 'red',
        marginTop: 8,
    },
    button: {
        backgroundColor: '#6CB089',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    }
})