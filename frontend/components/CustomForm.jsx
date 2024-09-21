import { Controller } from "react-hook-form"
import { TextInput, Text, View, StyleSheet } from "react-native"


export default function CustomForm({control, name, label, rules, placeholder}){
    return(
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <Controller 
                control={control}
                name={name}
                rules={rules}
                render={({field: {onChange, value}}) => (
                    <TextInput 
                        style={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        marginVertical: 8,
    },
    label: {
        marginBottom: 4,
        color: '#555',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
})