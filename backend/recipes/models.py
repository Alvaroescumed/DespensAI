from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    bio = models.TextField(blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    pfp = models.ImageField(upload_to='pfp/', blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.username


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    ingredients = models.TextField(default='')
    instructions = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')      

    def __str__(self):
        return self.name


class List(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='list') 
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    recipes = models.ManyToManyField(Recipe, related_name='list')
    
    def __str__(self):
        return f"{self.name} - {self.user.username}"
    