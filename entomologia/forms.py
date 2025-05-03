from django import forms
from django.utils.translation import gettext_lazy as _
from django import forms

from .models import *

#Especie                
class EspecieFilterForm(forms.Form):
    locomocao = forms.CharField(required=False, label="Locomoção")
    patas = forms.IntegerField(required=False, label="Patas")

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

    def __init__(self, *args, **kwargs):
        lang = kwargs.pop('lang', 'pt')
        super(OrdemFilterForm, self).__init__(*args, **kwargs)
        if lang == 'en':
            self.fields['asas_elitro'].label = "First pair of wings (elytra or brachypterous)"
            self.fields['asas_elitro'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['cercos_presenca'].label = "Presence of cerci"
            self.fields['cercos_presenca'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['sugador_maxilar'].label = "Maxillary sucking mouthparts"
            self.fields['sugador_maxilar'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['balancim_halter'].label = "Second pair of wings (halteres)"
            self.fields['balancim_halter'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['antenas_geniculadas'].label = "Usually geniculate antennae"
            self.fields['antenas_geniculadas'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['ectoparasitas'].label = "Tiny insects, ectoparasitic on other animals"
            self.fields['ectoparasitas'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['pernas_saltatoria'].label = "Third pair of jumping legs"
            self.fields['pernas_saltatoria'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['bucal_mastigador'].label = "Chewing mouthparts"
            self.fields['bucal_mastigador'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['asas_franjadas'].label = "Fringed wings"
            self.fields['asas_franjadas'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['antenas_moniliformes'].label = "Bead-like antennae"
            self.fields['antenas_moniliformes'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['abdome_filamento'].label = "Abdomen with a midline filament"
            self.fields['abdome_filamento'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['pernas_raptatorial'].label = "First pair of raptorial legs"
            self.fields['pernas_raptatorial'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['prototrax_curto'].label = "Short prothorax (smaller than the head)"
            self.fields['prototrax_curto'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]

            self.fields['antena_filiforme'].label = "Long, thread-like antenna"
            self.fields['antena_filiforme'].choices = [("", "Select..."), ("sim", "Yes"), ("nao", "No")]