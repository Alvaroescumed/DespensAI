import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Text, View, Button, TextInput, Alert } from "react-native"
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'

export default function Register (){

    const [showDatePicker, setShowDatePicker] = useState(false)
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
        <View>
            <Text>Completa el registro</Text>
            <TextInput
                value={userData.fname}
                placeholder='Nombre'
                onChange={(value) => handleOnChange('fname', value)}/>
            <TextInput
                value={userData.lname}
                placeholder='Apellidos'
                onChange={(value) => handleOnChange('lname', value)}/>
            <TextInput
                value={userData.username}
                placeholder='Username'
                onChange={(value) => handleOnChange('username', value)}/>
            <TextInput
                value={userData.email}
                placeholder='email'
                onChange={(value) => handleOnChange('email', value)}/>
            <TextInput
                value={userData.password}
                placeholder='contraseña'
                secureTextEntry={true}
                onChange={(value) => handleOnChange('password', value)}/>
            <TextInput
                value={userData.rpassword}
                placeholder='repite la contraseña'
                secureTextEntry={true}
                onChange={(value) => handleOnChange('rpassword', value)}/>
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            <TextInput
                value={userData.bio}
                placeholder='biografia'
                onChange={(value) => handleOnChange('bio', value)}
                numberOfLines={4}/>
            <Picker 
                    selectedValue={userData.location}
                    onValueChange={(value) => handleOnChange('location', value)}>
                    {countries.map((country) => (
                        <Picker.Item key={country.code} label={country.name} value={country.name} />
                    ))}
            </Picker>
            <Button title='Fecha de Nacimiento' onPress={() => setShowDatePicker(true)} />
                {showDatePicker && (
                    <DateTimePicker
                        value={userData.birthDay}
                        mode='date'
                        display='default'
                        onChange={(e, selectedDate) =>{
                            setShowDatePicker(false)
                            handleOnChange('birthDay', selectedDate)
                        }}
                    />
                )}
            < Button title='Selecciona tu imagen de perfil' onPress={pickImage} />
            <Button  title='Registrarse'/>
        </View> 
    )
}
