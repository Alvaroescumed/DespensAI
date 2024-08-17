from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('AI_KEY')

def generate_recipe(ingredients: str, preferences: str) -> str:
    # prompt = (
    #     f"Crea una receta de cocina usando los siguientes ingredientes: {ingredients}, incluyendo los pasos y el tiempo de preparacion en la respuesta. Ademas ten en cuenta que la receta cumpla {preferences} "
    # )

    # # API endpoint del modelo que vamos a usar de Hugging Face
    # api_url = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions"

    # headers = {
    #     "Authorization": f"Bearer {api_key}"
    # }

    # payload = {
    #     "inputs": prompt,
    #     "parameters": {
    #         "max_tokens": 500,
    #         "num_return_sequences": 1,
    #         "temperature": 0.7 ,
    #         "model" : 'mistralai/Mixtral-8x7B-Instruct-v0.1'
    #     }
    # }

    # response = requests.post(api_url, headers=headers, json=payload)

    client = InferenceClient(
        "mistralai/Mixtral-8x7B-Instruct-v0.1",
        token= api_key,
    )
    #  
    for message in client.chat_completion(
        messages=[{"role": "user", "content": "Crea una receta de cocina usando los siguientes ingredientes: pollo, cebolla, ajo, limón, arroz, incluyendo los pasos y el tiempo de preparacion en la respuesta. Ademas ten en cuenta que la receta cumpla baja en sodio, sin gluten  y sin lactosa"}],
        max_tokens=1000,
        stream=True,
    ):
        print(message.choices[0].delta.content, end="")

    # if response.status_code == 200:
    #     result = response.json()
    #     return result
    # else:
    #     return f"Error: {response.status_code}, {response.text}"


if __name__ == "__main__":
    # Ingredientes y preferencias para la prueba
    ingredients = "pollo, cebolla, ajo, limón, arroz"
    preferences = "baja en sodio, sin gluten"
    print(generate_recipe(ingredients, preferences))