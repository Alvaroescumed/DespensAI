from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    bio = models.TextField(blank=True, null=True)
    birth_date = models.DateField()
    pfp = models.ImageField(upload_to='pfp/', blank=True, null=True)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Ingredients(models.Model): 
    name = models.CharField(max_length=255, unique=True)
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=255)
    ingridients = models.ManyToManyField(Ingredients, through='RecipeIngredients', related_name='recipes')
    instructions = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes')
    cook_time = models.PositiveBigIntegerField()
    portions = models.PositiveBigIntegerField(default=1)             

    def __str__(self):
        return self.name

class RecipeIngredients(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredients = models.ForeignKey(Ingredients, on_delete=models.CASCADE)
    quantity = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.quantity} {self.ingredients}"
    
class Preferences(models.Model):
    user =  models.ForeignKey(User, on_delete=models.CASCADE, related_name='preferences')
    diet = models.TextField()
    alergies = models.TextField()

    def __str__(self):
        return f"{self.user.username} - preferences"

class List(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='list') 
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    recipes = models.ManyToManyField(Recipe, related_name='list')
    
    def __str__(self):
        return f"{self.name} - {self.user.username}"
    
class QueryHistory(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="query")
    ingredients = models.TextField()
    preferences = models.TextField()
    query_result = models.TextField()
    date = models.DateTimeField(auto_now_add=True)