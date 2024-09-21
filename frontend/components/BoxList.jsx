import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function BoxList({ data, selectedItems, toggleItem }){
    return(
        <View style={styles.preferenceList}>
            {data.map((item) => (
                <TouchableOpacity
                    key={item.id || item} // Usa item.id si es un objeto, o item directamente si es un string
                    style={[
                        styles.preferenceBox,
                        selectedItems.includes(item) && styles.selectedBox,
                    ]}
                    onPress={() => toggleItem(item)}
                >
                    <Text style={[
                        styles.preferenceText,
                        selectedItems.includes(item) && styles.selectedBox,    
                    ]}>
                        {item.name || item} {/* Usa item.name si es un objeto */}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    preferenceList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'

    }     
    ,
    preferenceBox: {
        padding: 10,
        margin: 5,
        borderRadius: 15,
        backgroundColor: '#e0e0e0',
        color: '#333'
    },
    selectedBox: {
        backgroundColor: '#6CB089', 
        color: '#fff'
    },
    preferenceText: {
        color: '#333',
    },
})