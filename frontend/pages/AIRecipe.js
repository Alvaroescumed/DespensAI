import { TabRouter, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native"

 export default function AIRecipe(){

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


    function generate() {

        const ingredientNames = selectedIngredients.map((ingredient) => ingredient.name);

        navigation.navigate('AIChat', { ingredients: ingredientNames });
        
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
                        style={styles.dropdownItem}
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
    recipeContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    recipeTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    recipeInstructions: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        lineHeight: 22,
    },
    modalButton: {
        backgroundColor: '#6CB089',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 15,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ff5c5c',
        marginTop: 10,
    },
})