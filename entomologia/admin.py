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
    search_fields = ['nome']

class OrdemAdmin(admin.ModelAdmin):
    list_display = ['nome']
    filter_horizontal = ['caracteristica']
    search_fields = ['nome', 'descricao', 'caracteristica__nome']
    
class ImagemOrdemAdmin(admin.ModelAdmin):
    list_display = ['nome', 'ordem']
    search_fields = ['ordem__nome']
    
class EspecieAdmin(admin.ModelAdmin):
    # 1. Substitua 'nome' por 'nome_formatado' na lista de exibição
    list_display = ['nome_formatado', 'familia', 'genero', 'ordem']
    search_fields = ['nome', 'genero', 'familia']
    list_filter = ['ordem', 'familia', 'genero']

    # 2. Adicione este método para renderizar as tags HTML corretamente
    def nome_formatado(self, obj):
        if obj.nome:
            return format_html(obj.nome)
        return "-"
    
    # 3. Define o título da coluna no painel admin
    nome_formatado.short_description = 'Nome da Espécie'
    
class ReferenciaAdmin(admin.ModelAdmin):
    list_display = ['titulo_fixo']

    def titulo_fixo(self, obj):
        return "Referências gerais"

class NoticiaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'data_publicacao')
    search_fields = ('titulo', 'corpo')

admin.site.register(Caracteristica, CaracteristicaAdmin)
admin.site.register(Ordem, OrdemAdmin)
admin.site.register(ImagemOrdem, ImagemOrdemAdmin)
admin.site.register(Especie, EspecieAdmin)
admin.site.register(Referencia, ReferenciaAdmin)
admin.site.register(Noticia, NoticiaAdmin)