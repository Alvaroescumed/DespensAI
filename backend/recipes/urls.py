from django.urls import path
from .views import *

urlpatterns = [
    path('user/', UserListCreate.as_view(), name='userLC'),
    path('login/', LoginView.as_view(), name='Login')
]