import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View, Button, TextInput, StyleSheet } from "react-native"

export default function Login (){

    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <View style= {styles.inputsContainer}>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder='correo'
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder='contraseña'
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value)}
                />
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
        margin: 20
    },
    inputsContainer: {
        paddingTop: '60%'
    }
})