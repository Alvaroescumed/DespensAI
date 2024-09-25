from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
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


class ListSerializer(serializers.ModelSerializer):
    
    recipes = RecipeSerializer(many=True, read_only=True)


    class Meta:
        model = List
        exclude = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)


class AIRecipeSerializer(serializers.Serializer):
    ingredients = serializers.ListField(
        child=serializers.CharField(max_length=100)
    )
    preferences = serializers.ListField(
        child = serializers.CharField(max_length=100)
    )
    level = serializers.ListField(
        child = serializers.CharField(max_length=100)
    )