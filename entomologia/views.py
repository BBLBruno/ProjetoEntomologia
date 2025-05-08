from django.shortcuts import render, get_object_or_404, redirect
from .models import *
from django.views.generic import ListView, DetailView
from .forms import *

#Listar Ordens
def listar_ordens(request):
    # Obtém a linguagem atual da sessão; 'pt' se não estiver definida
    lang = request.session.get('lang', 'pt')
    # Passe a linguagem para o form (ver seção Forms abaixo)
    form = OrdemFilterForm(request.GET or None, lang=lang)
    ordens = Ordem.objects.all()  # Começamos com todas as ordens
    caracteristicas = Caracteristica.objects.all()
    
    # Define a lista de filtros dinamicamente, de acordo com o idioma
    if lang == 'en':
        filtros = [
            ('asas_elitro', "First pair of wings (elytra or brachypterous)"),
            ('cercos_presenca', "Presence of cerci"),
            ('sugador_maxilar', "Maxillary sucking mouthparts"),
            ('balancim_halter', "Second pair of wings (halteres)"),
            ('antenas_geniculadas', "Usually geniculate antennae"),
            ('ectoparasitas', "Tiny insects, ectoparasitic on other animals"),
            ('pernas_saltatoria', "Third pair of jumping legs"),
            ('bucal_mastigador', "Chewing mouthparts"),
            ('asas_franjadas', "Fringed wings"),
            ('antenas_moniliformes', "Bead-like antennae"),
            ('abdome_filamento', "Abdomen with a midline filament"),
            ('pernas_raptatorial', "First pair of raptorial legs"),
            ('prototrax_curto', "Short prothorax (smaller than the head)"),
            ('antena_filiforme', "Long, thread-like antenna"),
        ]
    else:
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

        # Se o queryset estiver vazio após os filtros, define uma lista vazia
        if not ordens.exists():
            ordens = []

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
    visitor, created = VisitorCount.objects.get_or_create(pk=1)
    referencia = Referencia.objects.first()
    
    context = {
        "total_visits": visitor.total_visits,
        "referencia": referencia, 
    }
    return render(request, "home/index.html", context)

# Idioma
from django.shortcuts import redirect

def change_language(request, lang_code):
    """
    Altera o idioma na sessão. Apenas 'pt' ou 'en' são aceitos.
    Depois redireciona para a página de origem.
    """
    if lang_code in ['pt', 'en']:
        request.session['lang'] = lang_code
    # Redireciona para a página anterior ou para a raiz se não houver informação
    return redirect(request.META.get('HTTP_REFERER', '/'))
