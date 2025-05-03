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
