
import requests
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('AI_KEY')

def generate_recipe(ingredients: str, preferences: str) -> str:
    prompt = (
        f"Crea una receta usando los siguientes ingredientes: {ingredients}. "
        f"Incluye los pasos y tiempo de preparación. "
        f"Además, ten en cuenta las siguientes preferencias y alergias: {preferences}."
    )

    # URL de la API de Hugging Face
    api_url = "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B"

    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_length": 500,
            "num_return_sequences": 1
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
    ingredients = "pollo, cebolla, ajo, limón"
    preferences = "baja en sodio, sin gluten"
    print(generate_recipe(ingredients, preferences))