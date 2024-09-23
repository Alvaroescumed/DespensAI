import axios from 'axios'
import { useEffect, useState } from 'react'
import { Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, View, TextInput } from "react-native"
import MyButton from '../components/MyButton'
import BoxList from '../components/BoxList' 

import getIngredients from '../hooks/getIngredients'


export default function NewRecipe() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [filteredIngredients, setFilteredIngredients] = useState([])
  const [name, setName] = useState('')
  const [instructions, setInstructions] = useState('')

  const ingredients = getIngredients()



  useEffect(() => {
    // Filtrar ingredientes según el texto de búsqueda
    if (searchQuery.length > 0) {
      const filtered = ingredients.filter((meal) =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredIngredients(filtered)
    } else {
      setFilteredIngredients([])
    }
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

  async function onSubmit() {

      // formateamos el array de ingredientes a un string separando cada uno por comas
      const formattedIngredients = selectedIngredients.map(item => item.name).join(', ')
      const token = await AsyncStorage.getItem('userToken')

      try {
          await axios.post('http://127.0.0.1:8000/api/recipe/', {
              name,
              ingredients: formattedIngredients,
              instructions,
          }, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`
              }
          })
          console.log('Receta guardada con éxito')
      } catch (error) {
          console.error(error.message)
      }
  
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre de la receta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Lasaña vegetal..."
          value={name}
          onChangeText={setName}
        />
      </View>

      <Text style={styles.label}>Ingredientes</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar ingredientes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Instrucciones</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Escribe las instrucciones de la receta"
          value={instructions}
          onChangeText={setInstructions}
          multiline
        />
      </View>

      <MyButton text='Crear Receta' onPress={onSubmit} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Righteous',
    fontSize: 16,
    marginBottom: 10,
    color: '#6CB089'
  },
  textArea: {
    fontFamily: 'Nunito',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: 90
  },
  input: {
    fontFamily: 'Nunito',
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
})
