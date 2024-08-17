
import requests
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('AI_KEY')

def generate_recipe(ingredients: str, preferences: str) -> str:
    prompt = (
        f"Crea una receta de cocina usando los siguientes ingredientes: {ingredients}, incluyendo los pasos y el tiempo de preparacion en la respuesta. Ademas ten en cuenta que la receta cumpla {preferences} "
    )

    # API endpoint del modelo que vamos a usar de Hugging Face
    api_url = "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407"

    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_length": 100000,
            "num_return_sequences": 1,
            "temperature": 0.7 
        }
    }

    response = requests.post(api_url, headers=headers, json=payload)

    if response.status_code == 200:
        result = response.json()
        return result[0]['generated_text']
    else:
        return f"Error: {response.status_code}, {response.text}"


if __name__ == "__main__":
    # Ingredientes y preferencias para la prueba
    ingredients = "pollo, cebolla, ajo, limón, arroz"
    preferences = "baja en sodio, sin gluten"
    print(generate_recipe(ingredients, preferences))