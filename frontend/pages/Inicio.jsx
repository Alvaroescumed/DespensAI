import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native"

 export default function Inicio(){

    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedIngredients, setSelectedIngredients] = useState([])

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

    function addRecipe(){
        navigation.navigate('NewRecipe')
    }

    function generate() {

        const ingredientNames = selectedIngredients.map((ingredient) => ingredient.name);

        navigation.navigate('AIRecipe', { ingredients: ingredientNames });
        
    }

    return(
        <View style={styles.container}>
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

            <View style={styles.selectedContainer}>
                <Text>Ingredientes Seleccionados:</Text>
                {selectedIngredients.map((ingredient) => (
                    <TouchableOpacity
                        key={ingredient.id} 
                        onPress={() => deleteIngredient(ingredient)}
                    >
                        <Text style={styles.selectedItem}>
                            {ingredient.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity 
                style={styles.button}
                onPress={generate}>
                <Text>Generar Receta</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.button}
                onPress={addRecipe}>
                <Text>Nueva Receta</Text>
            </TouchableOpacity>
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
        borderBottomColor: '#eee',
    },
    inputsContainer: {
        paddingTop: '40%',
        paddingHorizontal: 20
    },
    selectedContainer: {
        marginVertical: 10,
    },
    selectedItem: {
        fontSize: 16,
        color: '#333',
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