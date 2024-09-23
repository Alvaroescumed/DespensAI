import { useNavigation } from '@react-navigation/native'
import { Text, View, Image, StyleSheet } from "react-native"
import MyButton from '../components/MyButton'

export default function WelcomePage (){

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
          <Text style={styles.title}>DespensAI</Text>
          <Text style={styles.subtitle}>la nueva forma de cocinar</Text>
          <Image 
            style={styles.image}
            source={require('../assets/background.jpg')}/>
        
          <MyButton 
          text={'Iniciar Sesión'}
          onPress={() => navigation.navigate('Login')}/>
          <MyButton 
          text={'Registrarse'}
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
      padding: 10
    },
    title: {
      fontSize: 42,
      marginBottom: 20,
      fontFamily: 'Righteous',
      color: '#6CB089'
    },
    subtitle:{
      fontFamily: 'Nunito',
      fontSize: 18
    },
    image: {
      height: 500,
      width: 500
    }
  })