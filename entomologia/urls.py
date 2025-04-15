from django.urls import path
from entomologia import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    # Especie
    path('especies/', views.listar_especies, name='listar_especies'),  
    path('especie/<int:especie_id>/', views.especie_detalhes, name='especie_detalhes'),

    # Ordem
    path('ordem/', views.listar_ordens, name='listar_ordens'),
    path('ordem/<int:ordem_id>/', views.ordem_detalhes, name='ordem_detalhes'),
    
    # Pages
    path('', views.entomologia, name="entomologia"),
]