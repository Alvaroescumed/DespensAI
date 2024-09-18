import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {useState, useEffect} from "react"
import {Text, View, FlatList, TouchableOpacity, StyleSheet, Modal, Button} from "react-native"


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
                style = {StyleSheet.recipeContainer}
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
        <View>
            <Text>Hola de nuevo, {name}</Text>
            <Text>Estas son tus últimas recetas</Text> 
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderRecipe}
                ListEmptyComponent={<Text>Aún no hay nada que ver</Text>}

            />

            {selectedRecipe && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>{selectedRecipe.name}</Text>
                        <Text>{selectedRecipe.instructions}</Text>
                        <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    recipeContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    recipeTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    recipeInstructions: {
        fontSize: 14,
        color: '#555',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
})