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

class RecipeSerializer(serializers.Serializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(max_length=100)  # Ajusta el tamaño según sea necesario
    )
    preferences = serializers.CharField(max_length=500)