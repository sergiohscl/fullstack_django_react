from django.contrib import admin
from core.models import List, Item


@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    list_display = ('owner', 'name')
    list_per_page = 10


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'list', 'done')
    list_per_page = 10
