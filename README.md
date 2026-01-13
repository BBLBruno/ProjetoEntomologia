# 🦋 Sistema de Entomologia

Um sistema web educacional desenvolvido em Django para catalogação, visualização e aprendizado sobre insetos, suas ordens, espécies, características e taxonomia.

🔗 **Acesse online:** [https://ifmuz.muz.ifsuldeminas.edu.br/entomologia/](https://ifmuz.muz.ifsuldeminas.edu.br/entomologia/)

## 📋 Sobre o Projeto

Este projeto é uma plataforma educacional focada em entomologia (estudo dos insetos), permitindo que usuários explorem diferentes ordens de insetos, suas características morfológicas, espécies associadas e informações taxonômicas. O sistema oferece suporte bilíngue (Português/Inglês) e inclui funcionalidades de filtragem avançada, galeria de imagens e sistema de notícias.

## ✨ Funcionalidades

### Principais Recursos

- 🌍 **Sistema Bilíngue**: Suporte completo para Português e Inglês
- 🔍 **Filtros Avançados**: Busca por características morfológicas específicas
  - Tipo de asas (élitros, halteres, franjadas)
  - Presença de cercos
  - Tipo de aparelho bucal
  - Tipo de antenas
  - Características das pernas
  - E muitas outras características
- 📊 **Catálogo de Ordens**: Visualização detalhada de ordens de insetos
- 🐛 **Espécies**: Listagem de espécies com família e gênero
- 🖼️ **Galeria de Imagens**: Múltiplas imagens por ordem
- 📰 **Sistema de Notícias**: Publicação de conteúdo educacional
- 📈 **Contador de Visitas**: Acompanhamento do acesso ao site
- ♿ **Acessibilidade**: Botões de acessibilidade e suporte a navegação assistiva
- 📱 **Design Responsivo**: Interface adaptável para dispositivos móveis

### Modelos de Dados

- **Ordem**: Ordens taxonômicas de insetos com descrição bilíngue
- **Espécie**: Espécies individuais vinculadas a ordens
- **Característica**: Características morfológicas dos insetos
- **ImagemOrdem**: Galeria de imagens para cada ordem
- **Notícia**: Sistema de notícias/conteúdo educacional
- **Referência**: Referências bibliográficas
- **VisitorCount**: Contador de visitantes

## 🚀 Tecnologias Utilizadas

- **Backend**: Django 5.1.6
- **Database**: SQLite (desenvolvimento) / MySQL (produção)
- **Editor de Texto Rico**: CKEditor
- **Upload de Imagens**: Pillow
- **Cache/Session**: Redis com Channels
- **Servidor de Produção**: Gunicorn + WhiteNoise
- **Frontend**: HTML5, CSS3, JavaScript vanilla

### Dependências Principais

```
Django==5.1.6
django-ckeditor==6.7.2
pillow==11.1.0
channels==4.2.2
channels_redis==4.2.1
redis==6.0.0
gunicorn==23.0.0
whitenoise==6.9.0
mysqlclient==2.2.7
```

## 📦 Instalação

### Pré-requisitos

- Python 3.8+
- pip
- Redis (opcional, para funcionalidades de cache)
- MySQL (opcional, para produção)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd ProjetoEntomologia
```

2. **Crie um ambiente virtual**
```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
```

3. **Instale as dependências**
```bash
pip install -r requirements.txt
```

4. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
SECRET_KEY=sua-chave-secreta-aqui
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3  # ou sua URL MySQL
```

5. **Execute as migrações**
```bash
python manage.py migrate
```

6. **Crie um superusuário**
```bash
python manage.py createsuperuser
```

7. **Colete arquivos estáticos** (produção)
```bash
python manage.py collectstatic
```

8. **Inicie o servidor**
```bash
python manage.py runserver
```

O sistema estará disponível em `http://localhost:8000/entomologia`

## 🎯 Uso

### Acessar a Área Administrativa

1. Acesse: `http://localhost:8000/admin`
2. Faça login com as credenciais do superusuário
3. Cadastre ordens, espécies, características e notícias

### Navegação no Site

- **Página Inicial**: `/entomologia` - Apresentação do projeto
- **Filtrar Ordens**: `/entomologia/filtrar` - Sistema de filtragem
- **Detalhes da Ordem**: `/entomologia/ordem/<id>` - Informações detalhadas
- **Notícias**: Link disponível na navegação principal
- **Alternar Idioma**: Botões PT/EN no cabeçalho

## 📁 Estrutura do Projeto

```
ProjetoEntomologia/
├── config/                 # Configurações do Django
│   ├── settings.py        # Configurações principais
│   ├── urls.py           # URLs principais
│   └── wsgi.py           # Configuração WSGI
├── entomologia/           # Aplicação principal
│   ├── models.py         # Modelos de dados
│   ├── views.py          # Views/Controllers
│   ├── forms.py          # Formulários
│   ├── urls.py           # URLs da aplicação
│   ├── admin.py          # Configuração do admin
│   ├── middleware.py     # Middleware customizado
│   ├── static/           # Arquivos estáticos (CSS, JS)
│   ├── templates/        # Templates HTML
│   └── migrations/       # Migrações do banco
├── helpers/               # Funções auxiliares
├── media/                 # Uploads de imagens
│   ├── ordem/
│   ├── especie/
│   ├── caracteristica/
│   ├── ordem_galeria/
│   └── noticias/
├── manage.py             # Script de gerenciamento Django
├── requirements.txt      # Dependências Python
└── db.sqlite3           # Banco de dados SQLite
```

## 🔧 Características Técnicas

### Sistema de Filtragem

O sistema possui um filtro dinâmico que permite buscar ordens por múltiplas características morfológicas:
- Tipo de asas e estruturas alares
- Características das antenas
- Tipo de aparelho bucal
- Características das pernas
- Presença de estruturas específicas

### Internacionalização

- Sessão persistente de idioma
- Conteúdo bilíngue em modelos (descrição/description)
- Interface completamente traduzida

### Segurança

- Sistema de autenticação Django
- Middleware customizado
- Proteção CSRF habilitada
- Validação de formulários

## 🖼️ Upload de Mídia

O sistema gerencia uploads de imagens para:
- Ordens de insetos
- Espécies
- Características
- Galeria de imagens
- Notícias

## 📝 Documentação Adicional

- `DOCUMENTACAO_HASH_REGISTRO.txt` - Documentação sobre sistema de hash de registros
- `hash_limpo.txt` - Dados de hash processados
- `resumo_hash_sha512.txt` - Resumos criptográficos

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de caráter educacional.

## 👥 Autores e Colaboradores

Desenvolvido como projeto educacional de Entomologia.

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 🔄 Atualizações Recentes

- Sistema de notícias bilíngue
- Interface de acessibilidade
- Sistema de contador de visitas
- Filtros avançados por características morfológicas
- Galeria de imagens por ordem
- Sistema de referências bibliográficas

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
