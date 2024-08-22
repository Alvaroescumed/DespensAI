import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native"
import axios from 'axios'

export default function Login (){

    const [username, setUsername ] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }
    
        axios.post('https://f34b-83-53-150-152.ngrok-free.app/api/login/', { username, password })
            .then(response => {
                if (response.data.success) {
                    Alert.alert('Éxito', 'Inicio de sesión exitoso');
                    const token = response.data.token;
                    // Aquí navegas a la pantalla principal, por ejemplo 'Home'
                    navigation.navigate('Home');  
                } else {
                    Alert.alert('Error', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error en la solicitud', error);
                Alert.alert('Error', 'No se pudo conectar con el servidor');
            });
    }

    return(
        <View style={styles.container}>
            <View style={styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    value={username}
                    placeholder='Nombre de usuario o correo electrónico'
                    onChangeText={(value) => setUsername(value)}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder='Contraseña'
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value)}
                />

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