import axios from "axios";
import { useState, useEffect } from "react"


export default function getIngredients(){

    const [ingredients, setIngredients] = useState([])
    useEffect(() => {
        async function fetchIngredients() {
          try {
            const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
            const ingredientList = response.data.meals.map((meal) => ({
              id: meal.idIngredient,
              name: meal.strIngredient,
            }))
      
            setIngredients(ingredientList)
          } catch (error) {
            console.error('Error al obtener los ingredientes:', error)
          }
        }
    
        fetchIngredients()
      }, [])

      return ingredients
}