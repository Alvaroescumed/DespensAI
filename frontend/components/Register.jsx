import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View, Button, TextInput } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'

export default function Register (){

    const [showDatePicker, setShowDatePicker] = useState(false)
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

        </View> 
    )
}
