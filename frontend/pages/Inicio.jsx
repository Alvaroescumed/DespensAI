import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native"


const apiKey = '975618fd6354e9885e7aa149af5c287'
 export default function Inicio(){

    const [ingredients, setIngredients] = useState([])
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


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
    }, [searchQuery, ingredients]);

    return(
        <View >
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
        </View>
    )
}