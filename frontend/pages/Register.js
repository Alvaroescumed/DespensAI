import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Text, View, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal } from "react-native"
import {Picker} from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import MyButton from '../components/MyButton'
import CustomForm from '../components/CustomForm'
import getCountries from '../hooks/getCountries'

export default function Register (){

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showCountryPicker, setShowCountryPicker] = useState(false)
    const countries = getCountries()
    const [pfp, setPfp] = useState(null)
    
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          birth_day: new Date(),
          password: '',
          rpassword: '',
          bio: '',
          location: ''
        }
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
            setPfp(res.assets[0].uri)
        }
    }


    async function onSubmit(data) {
      if (data.password !== data.rpassword) {
          console.log('Error', 'Las contraseñas no coinciden');
          return;
      }
  
      const formData = new FormData()
      formData.append('first_name', data.first_name)
      formData.append('last_name', data.last_name)
      formData.append('username', data.username)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('bio', data.bio || '')
      formData.append('birth_date', data.birth_date || '')
      formData.append('location', data.location || '')
      
      if (pfp) {
          formData.append('pfp', {
              uri: pfp,
              type: 'image/jpeg', // Ajusta el tipo de archivo según el archivo
              name: 'profile.jpg' // Nombre del archivo
          });
      }
  
      axios.post('http://10.0.2.2:8000/api/user/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        console.log('Usuario registrado con éxito')
      })
      .catch((error) => {
          console.error('Error en la solicitud', error);
      })
    }


    return(
        <ScrollView style={styles.container}>
    
        <CustomForm
          control={control}
          name="first_name"
          label="Nombre*"
          placeholder="Nombre"
          rules={{ required: 'El nombre es obligatorio' }}
        />
        {errors.first_name && <Text style={styles.error}>{errors.first_name.message}</Text>}
  
        <CustomForm
          control={control}
          name="last_name"
          label="Apellido*"
          placeholder="Apellidos"
          rules={{ required: 'El apellido es obligatorio' }}
        />
        {errors.last_name && <Text style={styles.error}>{errors.last_name.message}</Text>}
  
        <CustomForm
          control={control}
          name="username"
          label="Nombre de Usuario*"
          placeholder="Username"
          rules={{ required: 'El nombre de usuario es obligatorio' }}
        />
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
  
        <CustomForm
          control={control}
          name="email"
          label="Correo*"
          placeholder="email"
          rules={{
            required: 'El mail es obligatorio',
            pattern: { value: /\S+@\S+\.\S+/, message: 'El mail no es válido' }
          }}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
  
        <CustomForm
          control={control}
          name="password"
          label="Contraseña*"
          placeholder="Contraseña"
          secureTextEntry={true}
          rules={{ required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' } }}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
  
        <CustomForm
          control={control}
          name="rpassword"
          label="Repite la contraseña*"
          placeholder="Repite la contraseña"
          secureTextEntry={true}
          rules={{ required: 'Repite la contraseña' }}
        />
        {errors.rpassword && <Text style={styles.error}>{errors.rpassword.message}</Text>}
  
        <Text style={styles.label}>Localización</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowCountryPicker(true)}>
          <Text>{watch('location')}</Text>
        </TouchableOpacity>
  
        <Modal visible={showCountryPicker} transparent={true} animationType="slide">
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={watch('location')}
              onValueChange={(value) => {
                setValue('location', value);
                setShowCountryPicker(false);
              }}
            >
              {countries.map((country) => (
                <Picker.Item key={country.code} label={country.name} value={country.name} />
              ))}
            </Picker>
            <MyButton text="Cerrar" onPress={() => setShowCountryPicker(false)} />
          </View>
        </Modal>
  
        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text>{watch('birth_day').toLocaleDateString()}</Text>
        </TouchableOpacity>
  
        {showDatePicker && (
          <DateTimePicker
            value={watch('birth_day')}
            mode="date"
            display="default"
            onChange={(e, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setValue('birth_day', selectedDate);
              }
            }}
          />
        )}
  
        <Text style={styles.label}>Imagen de perfil</Text>
        <MyButton text="Selecciona tu imagen de perfil" onPress={pickImage} />
        <MyButton text="Registro" onPress={handleSubmit(onSubmit)}/>
      </ScrollView>
  
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

