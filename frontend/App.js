import React, { useState, useEffect, StyleSheet } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AuthStack from './navigation/AuthStack'
import Tabs from './navigation/Tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [fontsLoaded] = useFonts({
    'Righteous': require('./assets/fonts/Righteous.ttf'),
    'Nunito': require('./assets/fonts/Nunito-VariableFont_wght.ttf'),
  });
  // comprobamos que se haya iniciado sesion
  
  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem('userToken')

      if(token){
        setIsAuthenticated(true)
      }
    }

    checkToken
  }, [])

  if(!fontsLoaded){
    return <AppLoading />
  }

  return(
    <NavigationContainer
        screenOptions={{
          cardStyle: { backgroundColor: '#fff' },
      }}
    >

      {isAuthenticated ? (
        <Tabs />  // Si el usuario está autenticado, mostramos las pestañas
      ) : (
        <AuthStack />  // Si no, mostramos el stack de autenticación
      )}
    
    </NavigationContainer>
  )
}
