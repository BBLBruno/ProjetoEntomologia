from django.contrib import admin
from django.apps import apps
from django.http import HttpResponseRedirect
from django.utils.html import format_html
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import path

# Register your models here.
from .forms import *
from .models import *
# Register your models here.
class CaracteristicaAdmin(admin.ModelAdmin):
    list_display = ['nome']

class OrdemAdmin(admin.ModelAdmin):
    list_display = ['nome']
    filter_horizontal = ['caracteristica']
    
class EspecieAdmin(admin.ModelAdmin):
    list_display = ['nome']

admin.site.register(Caracteristica, CaracteristicaAdmin)
admin.site.register(Ordem, OrdemAdmin)
admin.site.register(Especie, EspecieAdmin)