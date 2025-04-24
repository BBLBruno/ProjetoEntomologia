from django.shortcuts import render, get_object_or_404, redirect
from .models import *
from django.views.generic import ListView, DetailView
from .forms import *

# Create your views here.
#Listar Ordens
def listar_ordens(request):
    form = OrdemFilterForm(request.GET or None)
    ordens = Ordem.objects.all()  # Começamos com todas as ordens
    caracteristicas = Caracteristica.objects.all()
    filtros = [
        ('asas_elitro', "Primeiro par de asas tipo élitro ou braquiélitro"),
        ('cercos_presenca', "Presença de cercos"),
        ('sugador_maxilar', "Aparelho bucal sugador maxilar"),
        ('balancim_halter', "Segundo par de asas tipo balancim ou halter"),
        ('antenas_geniculadas', "Antenas geralmente geniculadas"),
        ('ectoparasitas', "Insetos minúsculos, ectoparasitas de outros animais"),
        ('pernas_saltatoria', "Terceiro par de pernas saltatória"),
        ('bucal_mastigador', "Aparelho bucal mastigador"),
        ('asas_franjadas', "Asas franjadas"),
        ('antenas_moniliformes', "Antenas moniliformes"),
        ('abdome_filamento', "Abdome com filamento mediano"),
        ('pernas_raptatorial', "Primeiro par de pernas raptatorial"),
        ('prototrax_curto', "Protórax curto, menor que a cabeça"),
        ('antena_filiforme', "Antena filiforme longa"),
    ]

    if form.is_valid():
        for campo, caracteristica in filtros:
            valor = form.cleaned_data.get(campo)
            if valor:
                # Aplica o filtro cumulativamente
                if valor == "sim":
                    ordens = ordens.filter(caracteristica__nome__icontains=caracteristica)
                elif valor == "nao":
                    ordens = ordens.exclude(caracteristica__nome__icontains=caracteristica)

        # Verifica se o queryset está vazio após aplicar todos os filtros
        if not ordens.exists():
            ordens = []  # Define como uma lista vazia para o template entender que não há resultados

    context = {
        'form': form,
        'ordens': ordens,
        'filtros': filtros,
        'caracteristicas': caracteristicas,
    }
    return render(request, 'ordem/filtrar.html', context)

def ordem_detalhes(request, pk):
    ordem = get_object_or_404(Ordem, pk=pk)
    imagens_galeria = ordem.galeria.all()  # Recupera imagens associadas à ordem
    return render(request, "ordem/detalhes.html", {"ordem": ordem, "gallery_images": imagens_galeria})

# Página inicial
def entomologia(request):
    return render(request, "home/index.html")