import { useNavigation } from '@react-navigation/native'
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native"
import MyButton from '../components/MyButton'

export default function WelcomePage (){

    const navigation = useNavigation()

    return(
        <View styles={styles.container}>
          <Text style={styles.title}>Bienvenido a DespensAI</Text>
           <MyButton 
            text={'Login'}
            onPress={() => navigation.navigate('Login')}/>
            <MyButton 
            text={'Register'}
            onPress={() => navigation.navigate('Register')}/>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,  
      justifyContent: 'center',  
      alignItems: 'center',  
      backgroundColor: '#fff',  
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
  })