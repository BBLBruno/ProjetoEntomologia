from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField


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
    descricao =  RichTextField("Conteúdo da descrição", null=True, blank=True)
    description =  RichTextField("Conteúdo da descrição em inglês", null=True, blank=True)
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
    genero = models.CharField(max_length=100, null=True, blank=True)
    familia = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name = "Especie"
        verbose_name_plural = "Especies"
    
    def __str__(self):
        return self.nome

class VisitorCount(models.Model):
    total_visits = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Total de visitas: {self.total_visits}"

class Referencia(models.Model):
    conteudo = RichTextField("Conteúdo da Referência", null=True, blank=True)

    class Meta:
        verbose_name = "Referência"
        verbose_name_plural = "Referências"

class Noticia(models.Model):
    titulo = models.CharField("Título em Português", max_length=200)
    title = models.CharField("Title in English", max_length=200, null=True, blank=True)
    corpo = RichTextField("Corpo da notícia em Português")
    body = RichTextField("Body of the news in English", null=True, blank=True)
    imagem = models.ImageField("Imagem (Opcional)", upload_to="noticias", null=True, blank=True)
    data_publicacao = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Notícia"
        verbose_name_plural = "Notícias"
        ordering = ['-data_publicacao']

    def __str__(self):
        return self.titulo
