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
    const [pfp, setPfp] = useState(null)

    //traemos los datos del usuario

    useEffect(() => {
        async function fetchUser(){
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                console.log('Token:', token);

                const response = await axios.get('http://127.0.0.1:8000/api/user/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUserData(response.data);
                if (response.data.profile_picture) {
                    setPfp(response.data.profile_picture);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            }
        }

        fetchUser()
           
        
    }, [])

    return(
        <View style={styles.container}>
            <Image source={{ uri: pfp }} style={styles.profilePicture} />
            <Text style={styles.name}>{userData.first_name} {userData.last_name}</Text>
            <Text style={styles.info}>{userData.email}</Text>
            <Text style={styles.info}>@{userData.username}</Text>
            <Text style={styles.info}>{userData.bio}</Text>
            <Text style={styles.info}>Born: {userData.birth_date}</Text>
            <Text style={styles.info}>Location: {userData.location}</Text>
        </View>
    )
}

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