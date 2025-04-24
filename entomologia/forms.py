from django import forms
from django.utils.translation import gettext_lazy as _
from django import forms

from .models import *

#Especie                
class EspecieFilterForm(forms.Form):
    locomocao = forms.CharField(required=False, label="Locomoção")
    patas = forms.IntegerField(required=False, label="Patas")

#Ordem
class OrdemFilterForm(forms.Form):
    asas_elitro = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Primeiro par de asas tipo élitro ou braquiélitro"
    )
    cercos_presenca = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Presença de cercos"
    )
    sugador_maxilar = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Aparelho bucal sugador maxilar"
    )
    balancim_halter = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Segundo par de asas tipo balancim ou halter"
    )
    antenas_geniculadas = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Antenas geralmente geniculadas"
    )
    ectoparasitas = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Insetos minúsculos, ectoparasitas de outros animais"
    )
    pernas_saltatoria = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Terceiro par de pernas saltatória"
    )
    bucal_mastigador = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Aparelho bucal mastigador"
    )
    asas_franjadas = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Asas franjadas"
    )
    antenas_moniliformes = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Antenas moniliformes"
    )
    abdome_filamento = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Abdome com filamento mediano"
    )
    pernas_raptatorial = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Primeiro par de pernas raptatorial"
    )
    prototrax_curto = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Protórax curto, menor que a cabeça"
    )
    antena_filiforme = forms.ChoiceField(
        choices=[("", "Selecione..."), ("sim", "Sim"), ("nao", "Não")],
        required=False,
        label="Antena filiforme longa"
    )