import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {useState, useEffect, useCallback} from "react"
import {Text, View, FlatList, StyleSheet, Modal, ScrollView, ActivityIndicator} from "react-native"
import MyButton from "../components/MyButton"
import { useFocusEffect } from "@react-navigation/native" // Hook para cuando se navega a la pagina
import RecipeCard from "../components/RecipeCard"


export default function Home(){

    const [name, setName] = useState('')
    const [recipes, setRecipes] = useState ([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)
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
               
                
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message)
            } finally{
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    useFocusEffect(
        useCallback(() => {
          let isMounted = true // Controla el montaje del componente
    
          async function bringRecipes() {
            try {
              const response = await axios.get('http://10.0.2.2:8000/api/recipe/');
              const sortedRecipes = response.data.sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date))
              if (isMounted) {
                setRecipes(sortedRecipes.slice(0, 5))
              }
            } catch (error) {
              console.error(error)
            }
          }
    
          bringRecipes()
    
          // Cleanup function
          return () => {
            isMounted = false // Evita la actualización del estado si el componente se desmonta
          }
        }, []) 
      )

    return(
    <View style={styles.container}>
        { loading ? (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size="large" color="#6CB089" />
            </View>
        ) : (
            <>
            <View  style={styles.welcomeMessage}>
                <Text style={styles.message}>Hola de nuevo, </Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <Text style={styles.message}>Estas han sido tus últimas recetas:</Text> 

            <FlatList
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <RecipeCard
                    item={item}
                    setSelectedRecipe={setSelectedRecipe}
                    setModalVisible={setModalVisible}
                />
            )}
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
                        <Text style={styles.modalInstructions}>{selectedRecipe.instructions}</Text>
                        <MyButton text='cerrrar' onPress={() => setModalVisible(false)}/>

                    </ScrollView>
                </View>
            </Modal>
            )}
            </>
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
    welcomeMessage : {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    name: {
        fontFamily: 'Righteous',
        fontSize: 26,
        color: '#6CB089'
    },
    message: {
        fontFamily: 'Nunito',
        fontSize: 24,
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
        fontFamily: 'Righteous',
        color: '#6CB089',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalInstructions: {
        fontFamily: 'Nunito',
        fontSize: 18
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})