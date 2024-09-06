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
    const [error, setError] = useState({})
    const [isFormValid, setIsFormValid] = useState(true)
    const [userData, setUserData ] = useState({
        first_name : "",
        last_name : "",
        email: "",
        username: "",
        birth_day: new Date(), 
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
                console.error("Error fetching countries", err)
            }
        }

        fetchCountries()
    }, [])

    function validateForm (){
        let errors = {}

        if(!userData.first_name){
            errors.first_name = 'El nombre es obligatorio'
        }
        if(!userData.last_name){
            errors.last_name = 'El apellido es obligatorio'
        }
        if(!userData.username){
            errors.username = 'El nombre de usuario es obligatorio'
        }
        if(!userData.email){
            errors.email = 'El mail es obligatorio'
        } else if(!/\S+@\S+\.\S+/.test(userData.email)){
            errors.email = 'El mail no es valido'
        }
        if (!userData.password) {
            errors.password = 'La contraseña es obligatoria';
        } else if (userData.password.length < 6) {
            errors.password = 'La contraseña debe contener más de 6 caracteres';
        }
        if(!userData.rpassword){
              errors.rpassword = 'Por favor repita la contraseña'
        }else if(userData.rpassword !== userData.password){
            errors.rpassword = 'Las contraseñas deben coincidir'
        }

        setError(errors)
        setIsFormValid(Object.keys(errors).length === 0)

    }

    

    
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

    function handleSubmit(){
        
        validateForm()

        if(isFormValid){
            console.log('Usuario registrado con exito', userData)

            // quitamos rpassword de userData ya que no la necesitamos para el post
            const {rpassword, ...dataToSubmit} = userData

            axios.post('http://127.0.0.1:8000/api/user/', dataToSubmit)
                .then(res => {
                    if(res.data.succes){
                        console.log('Usuario registrado con exito', res.data.data)
                        Alert.alert('Usuario Registrado')
                    } else{
                        console.log('Response data:', error.response.data);
                        console.log('Status:', error.response.status);
                        console.log('Headers:', error.response.headers);
                        Alert.alert('Error', error.response.data.message || 'Solicitud incorrecta');
                    }
                })
                .catch(err => {
                    console.log('Error en la solicitud', err)
                    Alert.alert('Error', 'No se puede conectar con el servidor')
                })
        } else {
            console.log('Hay errores en el formulario')
        }
    }   

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Nombre*</Text>
            <TextInput
                style={styles.input}
                value={userData.first_name}
                placeholder='Nombre'
                onChangeText={(value) => handleOnChange('first_name', value)}
            />
            <Text style={styles.label}>Apellido*</Text>
            <TextInput
                style={styles.input}
                value={userData.last_name}
                placeholder='Apellidos'
                onChangeText={(value) => handleOnChange('last_name', value)}
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
            <Text style={styles.label}>Contraseña*</Text>
            <TextInput
                style={styles.input}
                value={userData.password}
                placeholder='contraseña'
                secureTextEntry={true}
                onChangeText={(value) => handleOnChange('password', value)}
            />
            <Text style={styles.label}>Repite la contraseña*</Text>
            <TextInput
                style={styles.input}
                value={userData.rpassword}
                placeholder='repite la contraseña'
                secureTextEntry={true}
                onChangeText={(value) => handleOnChange('rpassword', value)}
            />
            <Text style={styles.label}>Localización</Text>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowCountryPicker(true)}>
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
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.buttonText}>{userData.birth_day.toLocaleDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={userData.birth_day}
                    mode='date'
                    display='default'
                    onChange={(e, selectedDate) =>{
                        setShowDatePicker(false)
                        if (selectedDate) {
                            handleOnChange('birth_day', selectedDate)
                        }
                    }}
                />
            )}

            <Text style={styles.label}>Imagen de perfil</Text>
            <Button title='Selecciona tu imagen de perfil' onPress={pickImage} />

            
            <TouchableOpacity 
                style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            {Object.keys(error).length > 0 && (
            <View style={styles.errorContainer}>
                {Object.keys(error).map((key) => (
                    <Text key={key} style={styles.error}>
                        {error[key]}
                    </Text>
                ))}
            </View>
        )}
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        paddingTop: 90
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

