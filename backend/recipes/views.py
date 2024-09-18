from rest_framework import generics, status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .gpt_integration import generate_recipe
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


# --------- Recipes -------------

class RecipeListCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    #asignamos que el usuario que realice la peticion es el que se registra en la receta
    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 

class RecipeRetriveUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

# --------  USER ----------------

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetriveUpdate(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    # devolvemos solo el user autenticado
    def get_object(self):
        return self.request.user

class LoginView(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:

            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'success': True,
                'token': token.key,
                'message': 'Inicio de sesion correcto'
            }, status=status.HTTP_200_OK)
        
        else:
            return Response({
                'success':False,
                'message': ' Usuario o contraseña incorrectos'
            }, status=status.HTTP_400_BAD_REQUEST)
        


# ------------ AI --------------------------


class GenerateRecipe(APIView):
   

    def post(self, request):

        serializer = AIRecipeSerializer(data=request.data)

        if serializer.is_valid():
            ingredients = serializer.validated_data['ingredients']
            preferences = serializer.validated_data['preferences']

            # Llamada a la función que genera la receta
            recipe = generate_recipe(ingredients, preferences)

            return Response({'recipe': recipe}, status=status.HTTP_200_OK)
        
        print(serializer.errors)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)