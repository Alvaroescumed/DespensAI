from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredients
        fields = '__all__'
    

class RecipeIngridientSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredients
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):

    ingredients = RecipeIngridientSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'

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