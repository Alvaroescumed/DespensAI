import { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function MyButton({ onPress, text}){

    const [isClose, setIsClose] = useState(false)

    useEffect(() => {
        if( text === 'Cancelar'){
            setIsClose(true)
        }
    }, [text])

    return(
        <TouchableOpacity
        style={[styles.button, isClose ? styles.cancelButton : {}]} // si el boton es de cancelacion cambiamos el estilo
        onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

styles = StyleSheet.create({
    button: {
        backgroundColor: '#6CB089',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#ff5c5c',
    },
    text: {
        color: '#fff',
        fontSize: 16,
    }
})