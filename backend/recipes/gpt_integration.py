from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('AI_KEY')

def generate_recipe(ingredients: str, preferences: str, level: str) -> str:
    # Formatea el mensaje con los ingredientes y preferencias proporcionados
    prompt = (
        f"Crea una receta de cocina usando los siguientes ingredientes: {ingredients}. Usa el sitema internacional de medida "
        f"Incluyendo los pasos y el tiempo de preparación en la respuesta. Además, ten en cuenta que la receta cumpla con las siguientes preferencias y alergenos: {preferences}."
        f"Además ten encuenta que el nivel de habilidad para la receta es {level}."
    )

    client = InferenceClient(
        "mistralai/Mixtral-8x7B-Instruct-v0.1",
        token=api_key,
    )
    
    # Llamada al modelo de Hugging Face
    response = client.chat_completion(
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1000,
        temperature=0.7,
    )
    
    # Obtener y devolver el contenido de la respuesta
    if response and 'choices' in response and len(response['choices']) > 0:
        recipe = response['choices'][0]['message']['content']
        return recipe
    else:
        return "No se pudo generar una receta."
