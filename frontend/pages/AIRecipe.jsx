import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import axios from 'axios'

export default function AIRecipe(){
    // Usamos useRoute para obtener los datos pasados por navegación
    const route = useRoute() 
    const { ingredients } = route.params
    const [receta, setReceta] = useState(null)
    const [preferences, setPreferences] = useState('sin gluten')

    async function generarReceta(){

        try{
            const res = await axios.post('http://localhost:8000/api/generaterecipe/', {
                ingredients,
                preferences,
            },
            {
            headers: {
                'Content-Type' : 'application/json'
            },
            })

            console.log('Ingredients:', ingredients, 'Preferences:', preferences);

            
            setReceta(res.data.recipe)

        }catch(error){
            console.error(error.response.data)
        }
    }

    useEffect(() => {
        generarReceta()
    }, [])

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Receta Generada</Text>

            {/* Mostrar la receta generada */}
            {receta ? (
                <>
                <Text style={styles.receta}>{receta}</Text>
                <TouchableOpacity><Text>Guardar</Text></TouchableOpacity>
                </>
            ) : (
                <Text>Cargando receta...</Text>
            )}
        </ScrollView> 
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