import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useForm, Controller } from 'react-hook-form'



export default function NewRecipe() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [filteredIngredients, setFilteredIngredients] = useState([])
  const [ingredients, setIngredients] = useState([])
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      instructions: '',
      ingredients: [],
    }
  })

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
        const ingredientList = response.data.meals.map((meal) => ({
          id: meal.idIngredient,
          name: meal.strIngredient,
        }))
        setIngredients(ingredientList)
      } catch (error) {
        console.error('Error al obtener los ingredientes:', error)
      }
    }

    fetchIngredients()
  }, [])

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

  function addIngredient(meal) {
    setSelectedIngredients((prev) => {
      const updated = [...prev, meal];
      setValue('ingredients', updated); // Actualiza el valor del campo en react-hook-form
      return updated})
    setSearchQuery('') 
  }

  function deleteIngredient(ingredientToRemove) {
    setSelectedIngredients((prev) => {
      const updated = prev.filter((ingredient) => ingredient.id !== ingredientToRemove.id)
      setValue('ingredients', updated) // Actualiza el valor del campo en react-hook-form
      return updated
    })
  }

  async function onSubmit(data) {

      // formateamos el array de ingredientes a un string separando cada uno por comas
      const formattedIngredients = selectedIngredients.join(', ')
      const token = await AsyncStorage.getItem('userToken')

      try {
          await axios.post('http://127.0.0.1:8000/api/recipe/', {
              name: recipeTitle,
              ingredients: formattedIngredients,
              instructions: recipe,
          }, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`
              }
          })

          closeModal() // Cerrar modal después de guardar la receta
          console.log('Receta guardada con éxito')
      } catch (error) {
          console.error(error.message)
      }
  
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre de la receta</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'El nombre es obligatorio' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Ej. Sopa de Tomate"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Ingredientes</Text>
      <Controller
        control={control}
        name="ingredients"
        rules={{ required: 'Selecciona al menos un ingrediente' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <TextInput
              style={styles.input}
              placeholder="Buscar ingredientes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Mostrar lista filtrada si hay una búsqueda */}
            {searchQuery.length > 0 && (
              <FlatList
                style={styles.dropdown}
                data={filteredIngredients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.dropdownItem}
                    onPress={() => addIngredient(item)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <View style={styles.selectedContainer}>
              {selectedIngredients.map((meal) => (
                <TouchableOpacity
                  key={meal.id}
                  onPress={() => deleteIngredient(meal)}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.selectedItem}>
                    {meal.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
      {errors.ingredients && <Text style={styles.error}>{errors.ingredients.message}</Text>}

      <Text style={styles.label}>Instrucciones</Text>
      <Controller
        control={control}
        name="instructions"
        rules={{ required: 'Las instrucciones son obligatorias' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.textArea}
            placeholder="Escribe las instrucciones de la receta"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      {errors.instructions && <Text style={styles.error}>{errors.instructions.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Crear receta</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: 'green'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  dropdown: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  selectedContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  selectedItem: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
    borderBottomColor: '#eee',
  },
  button: {
    backgroundColor: '#6CB089',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
})