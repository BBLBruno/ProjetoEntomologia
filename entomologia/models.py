from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from ckeditor.fields import RichTextField
from django.utils.html import strip_tags
import html
import re


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
    nome = RichTextField("Nome da Espécie", null=True, blank=True)
    ordem = models.ForeignKey(Ordem, on_delete=models.CASCADE, related_name="especies")
    imagem = models.ImageField(upload_to="especie", null=False, blank=False)
    genero = models.CharField(max_length=100, null=True, blank=True)
    familia = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        verbose_name = "Especie"
        verbose_name_plural = "Especies"
    
    def __str__(self):
            texto_sem_tags = strip_tags(self.nome)
            # 2. Converte entidades como &nbsp; ou &amp; em texto real
            texto_limpo = html.unescape(texto_sem_tags)
            return texto_limpo

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


class ColecaoIntro(models.Model):
    titulo_guia_pt = models.CharField("Título da Aba Guia (PT)", max_length=200, default="Monte sua Coleção")
    titulo_guia_en = models.CharField("Guide Tab Title (EN)", max_length=200, default="Build Your Collection")
    introducao_guia_pt = RichTextField("Texto Introdutório do Guia (PT)", blank=True, null=True)
    introducao_guia_en = RichTextField("Guide Introductory Text (EN)", blank=True, null=True)

    titulo_video_pt = models.CharField("Título da Aba Vídeos (PT)", max_length=200, default="Guias práticos")
    titulo_video_en = models.CharField("Videos Tab Title (EN)", max_length=200, default="Practical Guides")
    introducao_video_pt = RichTextField("Texto Introdutório dos Vídeos (PT)", blank=True, null=True)
    introducao_video_en = RichTextField("Videos Introductory Text (EN)", blank=True, null=True)

    class Meta:
        verbose_name = "Informações Gerais da Coleção"
        verbose_name_plural = "Informações Gerais da Coleção"

    def __str__(self):
        return "Configurações e Textos da Coleção"


class ColecaoPasso(models.Model):
    titulo = models.CharField("Título em Português", max_length=200)
    title = models.CharField("Title in English", max_length=200, null=True, blank=True)
    descricao = RichTextField("Descrição em Português")
    description = RichTextField("Description in English", null=True, blank=True)
    imagem = models.ImageField("Imagem (Opcional)", upload_to="colecao_passos", null=True, blank=True)
    ordem = models.PositiveIntegerField("Ordem de exibição", default=0)

    class Meta:
        verbose_name = "Passo do Guia da Coleção"
        verbose_name_plural = "Passos do Guia da Coleção"
        ordering = ['ordem', 'id']

    def __str__(self):
        return f"{self.ordem} - {self.titulo}"


class ColecaoVideo(models.Model):
    titulo = models.CharField("Título do Vídeo em Português", max_length=200)
    title = models.CharField("Video Title in English", max_length=200, null=True, blank=True)
    video_url = models.CharField("Link do Vídeo (YouTube)", max_length=300, help_text="Cole o link do YouTube (ex: https://www.youtube.com/watch?v=... ou https://youtu.be/...)")
    ordem = models.PositiveIntegerField("Ordem de exibição", default=0)

    class Meta:
        verbose_name = "Vídeo Prático da Coleção"
        verbose_name_plural = "Vídeos Práticos da Coleção"
        ordering = ['ordem', 'id']

    def __str__(self):
        return f"{self.ordem} - {self.titulo}"

    @property
    def embed_url(self):
        if not self.video_url:
            return ""
        url = self.video_url.strip()
        if "<iframe" in url:
            match_src = re.search(r'src=["\']([^"\']+)["\']', url)
            if match_src:
                url = match_src.group(1)
        if "youtube.com/embed/" in url:
            return url
        match = re.search(r'(?:v=|\/embed\/|youtu\.be\/|\/v\/|\/e\/|watch\?v=|\&v=)([^#\&\?\/]+)', url)
        if match:
            video_id = match.group(1)
            return f"https://www.youtube.com/embed/{video_id}"
        return url
