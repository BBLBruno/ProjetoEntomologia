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
    descricao = models.TextField(null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    caracteristica = models.ManyToManyField(Caracteristica, related_name="caracteristica", blank=True)

    class Meta:
        verbose_name = "Ordem"
        verbose_name_plural = "Ordens"
    
    def __str__(self):
        return self.nome

class ImagemOrdem(models.Model):
    nome = models.TextField()
    ordem = models.ForeignKey(Ordem, on_delete=models.CASCADE, related_name="galeria")
    imagem = models.ImageField(upload_to="ordem_galeria", null=False, blank=False)

    class Meta:
        verbose_name = "Galeria da Ordem"
        verbose_name_plural = "Galeria das Ordens"
    
class Especie(models.Model):
    nome = models.TextField()
    ordem = models.ForeignKey(Ordem, on_delete=models.CASCADE, related_name="especies")
    imagem = models.ImageField(upload_to="especie", null=False, blank=False)

    class Meta:
        verbose_name = "Especie"
        verbose_name_plural = "Especies"
    
    def __str__(self):
        return self.nome

class VisitorCount(models.Model):
    total_visits = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Total de visitas: {self.total_visits}"

