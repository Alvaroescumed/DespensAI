import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Text, View, Button, TextInput, Alert, StyleSheet, TouchableOpacity, Modal } from "react-native"
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export default function Register (){

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showCountryPicker, setShowCountryPicker] = useState(false)
    const [countries, setCountries] = useState([])
    const [error, setError] = useState('')
    const [userData, setUserData ] = useState({
        fname : "",
        lname : "",
        email: "",
        username: "",
        birthDay: new Date(), 
        password: "",
        rpassword: "",
        bio: "",
        pfp: null,
        location: ""
    })

    const navigation = useNavigation()

    useEffect(() => {
        async function fetchCountries(){
            try{
                const res = await axios.get('https://restcountries.com/v3.1/all')
                const countryList = res.data.map(country => ({
                    name: country.name.common,
                    code: country.cca2
                }))
                setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)))
            } catch(err){
                console.error("Error fetching countries")
            }
        }

        fetchCountries()
    })
    async function pickImage(){
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!res.canceled){
            setUserData( prevState => ({
                ...prevState,
                pfp: res.assets[0].uri
            }))
        }
    }


    function handleOnChange(name, value){
        setUserData({
            ...userData,
            [name]: value,
        })
    }

    function handleRegister(){
        if(userData.password !== userData.rpassword){
            setError('Las contraseñas no coinciden')
            return
        }
        Alert.alert('Usuario registrado con exito')
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Nombre*</Text>
            <TextInput
                style={styles.input}
                value={userData.fname}
                placeholder='Nombre'
                onChangeText={(value) => handleOnChange('fname', value)}
            />
            <Text style={styles.label}>Apellido*</Text>
            <TextInput
                style={styles.input}
                value={userData.lname}
                placeholder='Apellidos'
                onChangeText={(value) => handleOnChange('lname', value)}
            />
            <Text style={styles.label}>Nombre de Usuario*</Text>
            <TextInput
                style={styles.input}
                value={userData.username}
                placeholder='Username'
                onChangeText={(value) => handleOnChange('username', value)}
            />
            <Text style={styles.label}>Correo*</Text>
            <TextInput
                style={styles.input}
                value={userData.email}
                placeholder='email'
                onChangeText={(value) => handleOnChange('email', value)}
            />
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                value={userData.password}
                placeholder='contraseña'
                secureTextEntry={true}
                onChangeText={(value) => handleOnChange('password', value)}
            />
            <Text style={styles.label}>Repite la contraseña</Text>
            <TextInput
                style={styles.input}
                value={userData.rpassword}
                placeholder='repite la contraseña'
                secureTextEntry={true}
                onChangeText={(value) => handleOnChange('rpassword', value)}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Text style={styles.label}>Localización</Text>
            <TouchableOpacity onPress={() => setShowCountryPicker(true)}>
                <Text
                    style={styles.input}
                >{userData.location}</Text>
            </TouchableOpacity>

            <Modal visible={showCountryPicker} transparent={true} animationType="slide">
                <View style={styles.pickerContainer}>
                    <Picker 
                        selectedValue={userData.location}
                        onValueChange={(value) => {
                            handleOnChange('location', value)
                            setShowCountryPicker(false)
                        }}>
                        {countries.map((country) => (
                            <Picker.Item key={country.code} label={country.name} value={country.name} />
                        ))}
                    </Picker>
                    <Button title="Cerrar" onPress={() => setShowCountryPicker(false)} />
                </View>
            </Modal>

            <Text style={styles.label}>Fecha de nacimiento</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.input}>{userData.birthDay.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={userData.birthDay}
                    mode='date'
                    display='default'
                    onChange={(e, selectedDate) =>{
                        setShowDatePicker(false)
                        if (selectedDate) {
                            handleOnChange('birthDay', selectedDate)
                        }
                    }}
                />
            )}

            <Text style={styles.label}>Imagen de perfil</Text>
            <Button title='Selecciona tu imagen de perfil' onPress={pickImage} />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
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
    error: {
        color: 'red',
        marginTop: 8,
    },
    terms: {
        textAlign: 'center',
        color: '#888',
        marginVertical: 16,
    },
    button: {
        backgroundColor: '#6CB089',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        marginTop: 'auto',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    datePicker: {
        backgroundColor: '#fff',
        marginTop: 'auto',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
})

