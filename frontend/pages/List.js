import axios from "axios"
import {useEffect, useState} from "react"
import {Text, ScrollView, ActivityIndicator, View, StyleSheet, Modal, TextInput, FlatList} from "react-native"
import MyButton from "../components/MyButton"
import RecipeCard from "../components/RecipeCard"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Lists(){
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedList, setSelectedList] = useState([])

    useEffect(() => {
        async function fetchLists(){
            try{
                const response = await axios.get('http://10.0.2.2:8000/api/lists/')
                setLists(response.data)
            } catch (error) {
                console.error('Error fetching lists:', error)
            } finally{
                setLoading(false)
            }
        }

        fetchLists()
    }, [])

    async function createList(){

        const token = await AsyncStorage.getItem('userToken')

        try {
            await axios.post('http://10.0.2.2:8000/api/lists/', {
            name: name,
            description: description,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setName('')
            setDescription('')
            setModalVisible(false)
        } catch (error) {
            console.error(error)
        }
    }


    return( 
        <ScrollView style={styles.container}>
        <Text style={styles.header}>Mis Listas</Text>
        {loading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#6CB089" />
          </View>
        ) : (
          <>
            <FlatList
              data={lists} // Cambiado 'list' a 'lists'
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <RecipeCard
                item={item}
                setSelectedRecipe={setSelectedList}
                setModalVisible={setModalVisible}
            />
              )}
              ListEmptyComponent={
                <Text style={styles.emptyMessage}>No se encontraron listas</Text>
              }
            />
            <MyButton text="Nueva Lista" onPress={() => setModalVisible(true)} />
          </>
        )}
  
        {/* Modal para añadir una nueva lista */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Añadir Nueva Lista</Text>
              <TextInput
                style={styles.input}
                placeholder="Título de la lista..."
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
              />
              <MyButton text="Guardar" onPress={createList} />
              <MyButton
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                text="Cancelar"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff', 
      paddingTop: 20,
      marginTop: 90
    },
    header: {
      fontFamily: 'Righteous',
      fontSize: 28,
      color: '#6CB089',
      marginBottom: 20, 
      textAlign: 'center',
    },
    listContainer: {
      paddingBottom: 20, 
    },
    emptyMessage: {
      fontFamily: 'Nunito',
      fontSize: 18,
      color: '#999',
      textAlign: 'center',
      marginTop: 50, 
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
  })
  