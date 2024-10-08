import { useRoute } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, ActivityIndicator, Modal, View, TextInput } from "react-native"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyButton from '../components/MyButton'


export default function AIChat(){
    // Usamos useRoute para obtener los datos pasados por navegación
    const route = useRoute() 
    const { ingredients } = route.params
    const [recipe, setRecipe] = useState(null)
    const { preferences } = route.params
    const {level} = route.params
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [recipeTitle, setRecipeTitle] = useState('') 

    

    async function generarReceta(){
        try {
            const res = await axios.post('http://10.0.2.2:8000/api/generaterecipe/', {
                ingredients,
                preferences,
                level,
            }, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })

            setRecipe(res.data.recipe)
        } catch(error) {
            console.error(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        generarReceta()
    }, [])

    // Función para abrir el modal
    function openModal(){
        setModalVisible(true)
    }

    // Función para cerrar el modal
    function closeModal(){
        setModalVisible(false)
    }

    // Función para guardar la receta
    async function saveRecipe() {

        // formateamos el array de ingredientes a un string separando cada uno por comas
        const formattedIngredients = ingredients.join(', ')
        const token = await AsyncStorage.getItem('userToken')

        try {
            await axios.post('http://10.0.2.2:8000/api/recipe/', {
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

    return(
        <ScrollView style={styles.container}>
            {/* Mostrar el spinner mientras se está cargando la receta */}
            {loading ? (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#6CB089" />
                    <Text>Cargando receta...</Text>
                </View>
            ) : (
                recipe ? (
                    <>
                        <Text style={styles.title}>Receta Generada </Text>
                        <Text style={styles.receta}>{recipe}</Text>

                        {/* Botón para abrir el modal */}
                        <MyButton 
                            onPress={openModal}
                            text='Guardar Receta'/>

                        {/* Modal para ingresar el título de la receta */}
                        <Modal
                            visible={modalVisible}
                            animationType="slide"
                            transparent={true}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Indica el título de la receta</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Título de la receta..."
                                        value={recipeTitle}
                                        onChangeText={setRecipeTitle}
                                    />
                                    <MyButton
                                        text='Guardar'
                                        onPress={saveRecipe}/>
                                    <MyButton
                                        style={[styles.modalButton, styles.cancelButton]}
                                        onPress={closeModal}
                                        text='Cancelar'/>
                                       
                                </View>
                            </View>
                        </Modal>
                    </>
                ) : (
                    <Text>Error al generar la receta</Text>
                )
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
        fontFamily: 'Righteous',
        fontSize: 24,
        color: '#6CB089',
        marginBottom: 20,
    },
    receta: {
        fontFamily: 'Nunito',
        fontSize: 18,
        marginTop: 10,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        marginVertical: 10,
        width: '100%',
    },
    
})
