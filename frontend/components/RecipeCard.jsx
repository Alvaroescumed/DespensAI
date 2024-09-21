import { TouchableOpacity, Text, StyleSheet } from "react-native";


export default function ({item , setSelectedRecipe, setModalVisible}){
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

const styles = StyleSheet.create({
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
})