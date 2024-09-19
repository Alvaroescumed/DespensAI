import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {useState, useEffect} from "react"
import {Text, View, FlatList, TouchableOpacity, StyleSheet, Modal, ScrollView} from "react-native"


export default function Home(){

    const [name, setName] = useState('')
    const [recipes, setRecipes] = useState ([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    useEffect(() => {
        async function fetchUser() {
            try {
                const token = await AsyncStorage.getItem('userToken')
                if (!token) {
                    console.error('No token found')
                    return
                }
                console.log('Token:', token)

                const response = await axios.get('http://10.0.2.2:8000/api/user/profile', {
                    headers: { Authorization: `Token ${token}` }
                })

                setName(response.data.username)

                console.log(name)
                
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message)
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        async function bringRecipes(){
            await axios.get('http://10.0.2.2:8000/api/recipe/')
                .then ( response => {
                    const sortedRecipes = response.data.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
                    setRecipes(sortedRecipes.slice(0, 5))
                })
                .catch(error => 
                    console.error(error)
                )
        }

        bringRecipes()
    }, [])
    
    function renderRecipe({item}){
        return(
            <TouchableOpacity 
                style = {styles.recipeContainer}
                onPress={() => {
                    setSelectedRecipe(item)
                    setModalVisible(true)}
                }>
                <Text  style={styles.recipeTitle}>{item.name}</Text>
                <Text
                    style={styles.recipeInstructions}
                    numberOfLines={2} //limitamos el numero de lineas
                    ellipsizeMode="..." //añadimos puntos suspensivos al texto cortado
                >{item.instructions}</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Hola de nuevo, {name}</Text>
        <Text style={{ marginVertical: 10 }}>Estas han sido tus últimas recetas:</Text> 

        <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRecipe}
            ListEmptyComponent={<Text>No se encontraron recetas</Text>}
        />

        {selectedRecipe && (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
                        <Text>{selectedRecipe.instructions}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Modal>
        )}
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 90,
    },
    recipeContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // Sombra para Android
    },
    recipeTitle: {
        fontWeight: 'bold',
        color: '#6CB089',
        fontSize: 16,
        marginBottom: 5,
    },
    recipeInstructions: {
        fontSize: 14,
        color: '#555',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        marginVertical: 20,
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6CB089',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#6CB089',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})