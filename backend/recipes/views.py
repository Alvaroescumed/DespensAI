from rest_framework import generics, status
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response


# --------- Recipes -------------

class RecipeListCreate(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class RecipeRetriveUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

# --------  USER ----------------

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetriveUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
                'message': 'Correo o contraseña incorrectos'
            }, status=status.HTTP_400_BAD_REQUEST)
        


# --------  INGREDIENTS ----------------

class IngredientsListCreate(generics.ListCreateAPIView):
    queryset = Ingredients.objects.all()
    serializer_class = IngredientsSerializer

class IngredientsRetriveUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredients.objects.all()
    serializer_class = IngredientsSerializer