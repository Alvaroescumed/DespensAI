import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {useState, useEffect} from "react"
import {Text, StyleSheet, Image, View} from "react-native"

export default function Profile(){
    
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        bio:'',
        birth_date: '',
        location: ''
    })
    const [pfp, setPfp] = useState('')


    //traemos los datos del usuario
    useEffect(() => {
        async function fetchUser() {
            try {
                const token = await AsyncStorage.getItem('userToken')
                if (!token) {
                    console.error('No token found')
                    return
                }
                console.log('Token:', token)

                const response = await axios.get('http://10.0.2.2:8000/api/user/profile', {
                    headers: { Authorization: `Token ${token}` }
                })

                setUserData(response.data)

                // Si recibes la URI del archivo directamente, ajusta esta línea:
                if (response.data.pfp) {
                    setPfp(response.data.pfp)
                }
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message)
            }
        }

        fetchUser()
    }, [])

    function handleInputChange (name, value){
        setUserData({ ...userData, [name]: value });
    }

    async function handleSave() {
        const formData = new FormData()
        formData.append('bio', userData.bio)
        formData.append('birth_date', userData.bio)
        formData.append('location', userData.bio)
        formData.append('bio', userData.bio)
        if (pfp && typeof pfp !== 'string') {
            formData.append('pfp', {
              uri: pfp.uri,
              name: 'profile.jpg',
              type: 'image/jpeg'
            })
            try {
                const response = await axios.patch('http://127.0.0.1:8000/api/user/update', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Token ${token}`
                    }
                });
                console.log('Update response:', response.data);
            } catch (error) {
                console.error('Error updating user data:', error.response ? error.response.data : error.message);
            }
    }}

    return(
        <View style={styles.container}>
        {pfp ? (
            <Image source={{ uri: pfp }} style={styles.profilePicture} />
        ) : (
            <Image source={require('../assets/pfp.png')} style={styles.profilePicture} />
        )}
        <Text style={styles.name}>{userData.first_name} {userData.last_name}</Text>
        <Text style={styles.info}>{userData.email}</Text>
        <Text style={styles.info}>@{userData.username}</Text>
        <Text style={styles.info}>{userData.bio}</Text>
        <Text style={styles.info}>Born: {userData.birth_date}</Text>
        <Text style={styles.info}>Location: {userData.location}</Text>
    </View>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    info: {
        fontSize: 16,
        color: '#333',
        marginVertical: 4,
    },
    })