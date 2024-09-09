import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useForm, Controller } from 'react-hook-form'
import {Picker} from '@react-native-picker/picker'


export default function NewRecipe(){

  const [ingredients, setIngredients] = useState([])
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
      defaultValues: {
        name: '',
        instructions: '',
        cook_time: '',
        portions: 1,
        ingredients: [],
      }
    })

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
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

  async function onSubmit(data) {
    try {
        const response = await axios.post('https://localhost:8000/api/recipes', data)
        if (response.status === 201) {
          alert('Receta creada con éxito')
        } else {
          alert('Error al crear la receta')
        }
      } catch (error) {
        console.error('Error al enviar los datos de la receta:', error)
        alert('Error al conectar con el servidor')
    }
  }

  return(   
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
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              {ingredients.map((ingredient) => (
                <Picker.Item key={ingredient.id} label={ingredient.name} value={ingredient.id} />
              ))}
            </Picker>
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

      <Text style={styles.label}>Tiempo de cocción (minutos)</Text>
      <Controller
        control={control}
        name="cook_time"
        rules={{ required: 'El tiempo de cocción es obligatorio' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Ej. 30"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      {errors.cook_time && <Text style={styles.error}>{errors.cook_time.message}</Text>}

      <Text style={styles.label}>Porciones</Text>
      <Controller
        control={control}
        name="portions"
        rules={{ required: 'Las porciones son obligatorias', min: 1 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Ej. 4"
            value={value.toString()}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      {errors.portions && <Text style={styles.error}>{errors.portions.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Crear receta</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
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