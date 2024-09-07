import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native"



const apiKey = '975618fd6354e9885e7aa149af5c287'
 export default function Inicio(){

    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const navigation = useNavigation()

    useEffect(() => {

        async function getIngredients(){
            try{
                const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=true`) 
                const ingredientsList = res.data.results.map(recipe => recipe.ingredients).flat()

                setIngredients(ingredientsList)
                setFilteredIngredients(ingredientsList)

                console.log(ingredients)

            } catch(err){
                console.log(err)
            }
        }

        getIngredients()
    }, [])

    useEffect(() => {
        const filtered = ingredients.filter(ingredient =>
            ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredIngredients(filtered);
    }, [searchQuery, ingredients])

    function addRecipe(){
        navigation.navigate('NewRecipe')
    }

    return(
        <View style={styles.container}>
            <TextInput
                
                placeholder="Search ingredients..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredIngredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text>{item}</Text>}
            />

            <TouchableOpacity 
                // style={styles.button}
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