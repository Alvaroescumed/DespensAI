from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  # Ciframos la contraseña
        user.save()
        return user
    
class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'
    

class RecipeIngridientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredients
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):

    ingredients = IngredientsSerializer(many=True)  # Usa el serializador para Ingredients

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'ingredients', 'instructions', 'cook_time', 'portions']
    
    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients', [])
        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            ingredient, created = Ingredients.objects.get_or_create(**ingredient_data)
            recipe.ingredients.add(ingredient)
        return recipe

class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        models: Preferences
        fields = '__all__'

class ListSerializer(serializers.ModelSerializer):
    
    recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = '__all__'

class QueryHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = QueryHistory
        fields = '__all__'

