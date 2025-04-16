from django.urls import path
from entomologia import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    # Ordem
    path('ordem/', views.listar_ordens, name='listar_ordens'),
    path('ordem/<int:pk>/', views.ordem_detalhes, name='ordem_detalhes'),
    
    # Pages
    path('', views.entomologia, name="entomologia"),
]