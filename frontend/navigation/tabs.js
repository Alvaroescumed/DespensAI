import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"
import NewRecipe from '../pages/NewRecipe'
import Lists from "../pages/List"
import Profile from "../pages/Profile"
import Home from "../pages/Home"
import AIStackNavigation from "./AIStack"
import { StyleSheet, TouchableOpacity } from 'react-native'

const Tab = createBottomTabNavigator()

export default function Tabs (){
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            
            // hacemos un switch para cada opcion del navegador
            switch (route.name) {
              case 'Home':
                iconName = 'home'
                break
              case 'AIRecipe':
                iconName = 'restaurant'
                break
              case 'New':
                iconName = 'add-circle'
                break
              case 'List':
                iconName = 'reader'
                break
              case 'Profile':
                iconName = 'person'
                break
            }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6CB089', // Color del ícono cuando está activo
          tabBarInactiveTintColor: 'gray', // Color del ícono cuando está inactivo
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        })}
      > 
            <Tab.Screen
                name="Home" 
                component={Home} 
                options={{
                    headerShown: false
                }} 
            />
            <Tab.Screen
                name="AIRecipe" 
                component={AIStackNavigation} 
                options={{
                    headerShown: false
                }} 
            />
            <Tab.Screen
                name="New"
                component={NewRecipe}
                options={{
                headerShown: false,
                tabBarButton: (props) => (
                    <TouchableOpacity style={styles.newTabButton} {...props} />
                ),
                }}
            />
            
            <Tab.Screen
                name="List" 
                component={Lists} 
                options={{
                    headerShown: false
                }} 
            />
            <Tab.Screen
                name="Profile" 
                component={Profile} 
                options={{
                    headerShown: false
                }} 
            />
            
            

        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    
  tabBar: {
    height: 70,
    paddingBottom: 5,
    margin:10,
    borderRadius: 20,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: 'white',
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  newTabButton: {
    position: 'absolute',
    bottom: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Sombra para el botón
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  })