import { useNavigation } from '@react-navigation/native'
import { Text, View, Button } from "react-native"

export default function Register (){

    const navigation = useNavigation()

    return(
        <View>
            <Text>Completa el registro</Text>
        </View> 
    )
}