import { useNavigation } from '@react-navigation/native'
import { Text, View, Button } from "react-native"
export default function Login (){

    const navigation = useNavigation()

    return(
        <View>
            <Text>Introduce tus datos</Text>
        </View> 
    )
}