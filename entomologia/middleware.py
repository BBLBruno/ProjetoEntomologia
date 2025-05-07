class LanguageMiddleware:
    """
    Middleware para garantir que a sessão contenha a informação de idioma.
    Define o idioma padrão como português ('pt') caso ainda não esteja definido.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'lang' not in request.session:
            request.session['lang'] = 'pt'  # Idioma padrão: português
        response = self.get_response(request)
        return response

from django.db.models import F
from .models import VisitorCount

class VisitorCountMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Processa apenas requisições GET fora da área de administração
        if request.method == "GET" and not request.path.startswith('/admin/'):
            # Se ainda não contamos essa visita na sessão
            if not request.session.get('visited', False):
                request.session['visited'] = True
                from django.apps import apps
                VisitorCount = apps.get_model('entomologia', 'VisitorCount')
                visitor, created = VisitorCount.objects.get_or_create(pk=1)
                VisitorCount.objects.filter(pk=visitor.pk).update(total_visits=F('total_visits') + 1)
        return response
