from django.urls import path
from .views import *

urlpatterns = [
    path('user/', UserListCreate.as_view(), name='userLC'),
    path('user/profile/', UserRetriveUpdate.as_view(), name='userRU'),
    path('login/', LoginView.as_view(), name='Login'),
    path('recipe/', RecipeListCreate.as_view(), name='recipeLC'),
    path('generaterecipe/', GenerateRecipe.as_view(), name='generateRecipe'),
     path('lists/', ListsListCreate.as_view(), name='generateRecipe'),
]