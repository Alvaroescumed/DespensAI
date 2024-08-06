import openai
import os
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv('OPEN_AI_KEY')

def generate_recipe(ingredients: str, preferences: str) -> str:
    prompt = (
        f"Crea una receta usando los siguientes ingredientes: {ingredients}"
        f"Incluye los pasos y tiempo de preparacion"
        f"Además ten en cuenta las siguientes preferencias y alergias: {preferences}"
    )

    res = openai.ChatCompletion.create( 
        model="gpt-4",
        messages=[
            {"role": "system", "content" : "Eres un experto asistente culinario"},
            {"role" : "user", "content" : prompt }
        ],
        max_tokens=500,
        temperature=0.7,
    )

    recipe = res.choices[0].message['content'].strip()

    return recipe