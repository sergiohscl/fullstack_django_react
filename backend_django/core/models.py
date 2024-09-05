from django.db import models
from django.contrib.auth.models import User


class List(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    class Meta:
        db_table = 'list'
        verbose_name = "Lista"
        verbose_name_plural = "Listas"

    def __str__(self):
        return self.name


class Item(models.Model):
    name = models.CharField(max_length=50)
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    done = models.BooleanField(default=False)

    class Meta:
        db_table = 'item'
        verbose_name = "Item"
        verbose_name_plural = "Itens"

    def __str__(self):
        return self.name
