import { TabRouter, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import MyButton from '../components/MyButton'
import BoxList from '../components/BoxList'

 export default function AIRecipe(){

    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const [selectedPreferences, setSelectedPreferences] = useState([])
    const [selectedLevel, setSelectedLevel] = useState([])

    const preferences = [
        'Sin gluten',
        'Diabetica',
        'Baja en sodio',
        'Vegetariana',
        'Vegana',
        'Alta en proteina',
        'Baja en grasa',
        'Lacteos',
        'Huevos',
        'Frutos secos',
        'Pescado',
        'Mariscos',
        'Soja',
        'Aditivos artificiales',
    ]

    const level = ['Bajo', 'Medio', 'Alto']
 

    const navigation = useNavigation()

    useEffect(() => {

        async function getIngredients(){
            try{
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
                const ingredientList = response.data.meals.map((meal) => ({
                  id: meal.idIngredient,
                  name: meal.strIngredient,
                }))
                setIngredients(ingredientList)

            } catch(err){
                console.log(err)
            }
        }

        getIngredients()
    }, [])

    useEffect(() => {
        const filtered = ingredients.filter((ingredients) => 
            ingredients.name.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setFilteredIngredients(filtered)
    }, [searchQuery, ingredients])

    function addIngredient(ingredient){
        if (!selectedIngredients.some((item) => item.id === ingredient.id)) {
            setSelectedIngredients((prev) => [...prev, ingredient])
            setSearchQuery('')
        }
    }

    function deleteIngredient(ingredientToRemove){

        const updatedIngredients = selectedIngredients.filter(
            (ingredient) => ingredient.name !== ingredientToRemove.name
        )

        setSelectedIngredients(updatedIngredients)
    }

    function togglePreference(preference){
        setSelectedPreferences((prev) =>
            prev.includes(preference)
                ? prev.filter((item) => item !== preference)
                : [...prev, preference]
        )
    }

    function toggleLevel(level){
        setSelectedLevel((prev) => 
            prev.includes(level)
            ? prev.filter((item) => item !== level)
            : [...prev, level]
        )   
    }


    function generate() {

        const ingredientNames = selectedIngredients.map((ingredient) => ingredient.name);

        navigation.navigate('AIChat', { ingredients: ingredientNames, preferences: selectedPreferences, level: selectedLevel });
        
    }


    return(
        <ScrollView style={styles.container}>

            <Text style={styles.label}>Selecciona los ingredientes que tengas</Text>

            <TextInput
                style={styles.input}
                placeholder="Search ingredients..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Mostramos la lista en caso de que se añada un parametro de busqueda */}
            {searchQuery.length > 0 && (
                <FlatList
                    style={styles.dropdown}
                    data={filteredIngredients}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => 
                        <TouchableOpacity 
                            style={styles.dropdownItem}
                            onPress={() => addIngredient(item)}>
                                <Text>{item.name}</Text>
                        </TouchableOpacity>}
                />
            )}

    
            <BoxList
                data={selectedIngredients}
                selectedItems={selectedIngredients}
                toggleItem={deleteIngredient}
            />

            <Text style={styles.label}>Preferencias y Alergenos para la receta</Text>

            <BoxList
                data={preferences}
                selectedItems={selectedPreferences}
                toggleItem={togglePreference}
            />
            
            <Text style={styles.label}>Nivel de cocina</Text>

            <BoxList
                data={level}
                selectedItems={selectedLevel}
                toggleItem={toggleLevel}
            />
            <MyButton 
                text='Generar receta'
                onPress={generate}/>
            
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        marginVertical: 10
    },
    dropdown: {
        maxHeight: 200, 
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 5,
        backgroundColor: '#fff'
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        textAlign: 'center',
        borderBottomColor: '#eee',
    },
    label: {
        fontFamily: 'Righteous',
        fontSize: 16,
        marginVertical: 10,
        color: '#6CB089'
      }
})