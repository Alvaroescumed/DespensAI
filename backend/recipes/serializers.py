from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'bio', 'birth_date', 'pfp', 'location']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            bio=validated_data.get('bio', ''),
            birth_date=validated_data.get('birth_date', None),
            location=validated_data.get('location', ''),
        )
        user.set_password(validated_data['password'])  # Cifra la contraseña
        user.save()
        return user
    

class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        exclude = ['user'] #Excluimos el campo user del serializador para gestionarlo desde la view

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

class PreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preferences
        fields = '__all__'

class ListSerializer(serializers.ModelSerializer):
    
    recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = '__all__'


class AIRecipeSerializer(serializers.Serializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(max_length=100)
    )
    preferences = serializers.CharField(max_length=500)