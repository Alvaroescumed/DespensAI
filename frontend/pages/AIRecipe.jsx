import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native"
import axios from 'axios'

export default function AIRecipe ({ingredients}){

    const [receta, setReceta] = useState(null)
    const [preferences, setPreferences] = useState(null)

        async function generarReceta(){

        try{
            const res = await axios.post('http://localhost:8000/api/generaterecipe/', {
                ingredients,
                preferences
            })

            console.log(ingredients)

            
            setReceta(res.data.recipe)

        }catch(err){
            console.error(err.message)
        }
    }

    useEffect(() => {
        setPreferences('baja en sal')
        generarReceta()
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Receta Generada</Text>

            {/* Mostrar la receta generada */}
            {receta ? (
                <Text style={styles.receta}>{receta}</Text>
            ) : (
                <Text>Cargando receta...</Text>
            )}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    receta: {
        fontSize: 18,
        marginTop: 10,
    },
})