import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View, Button, TextInput } from "react-native"
import * as ImagePicker from 'expo-image-picker'

export default function Register (){

    const [userData, setUserData ] = useState({
        fname : "",
        lname : "",
        email: "",
        username: "",
        birthDay: "",
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

    function handleOnChange(e){
        const {name , value} = e.target

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
                onChange={() => handleOnChange()}/>
        </View> 
    )
}
