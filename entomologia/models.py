from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

class Caracteristica(models.Model):
    nome = models.TextField()
    imagem = models.ImageField(upload_to="caracteristica", null=False, blank=False)

    class Meta:
        verbose_name = "Característica"
        verbose_name_plural = "Características"
    
    def __str__(self):
        return self.nome

class Ordem(models.Model):
    nome = models.TextField()
    imagem = models.ImageField(upload_to="ordem", null=False, blank=False)
    caracteristica = models.ManyToManyField(Caracteristica, related_name="caracteristica", blank=True)

    class Meta:
        verbose_name = "Ordem"
        verbose_name_plural = "Ordens"
    
    def __str__(self):
        return self.nome
    
class Especie(models.Model):
    nome = models.TextField()
    ordem = models.ForeignKey(Ordem, on_delete=models.CASCADE, related_name="especies")
    imagem = models.ImageField(upload_to="especie", null=False, blank=False)

    class Meta:
        verbose_name = "Especie"
        verbose_name_plural = "Especies"
    
    def __str__(self):
        return self.nome