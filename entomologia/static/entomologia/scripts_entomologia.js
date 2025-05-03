// Script para rolagem suave ao clicar em links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Ajuste para o header fixo
        behavior: 'smooth'
      });
    }
  });
});


// Visitas
document.addEventListener('DOMContentLoaded', function() {
    var visitCounter = document.getElementById('visitCounter');
    var visitCountDisplay = document.getElementById('visitCountDisplay');

    // Função para buscar o número de visitas via AJAX
    function updateVisitCount() {
        fetch("{% url 'get_visit_count' %}")
        .then(response => response.json())
        .then(data => {
            visitCountDisplay.textContent = "{% if request.session.lang == 'en' %}Visits: {% else %}Visitas: {% endif %}" + data.count;
        })
        .catch(error => console.error('Erro ao atualizar contador:', error));
    }

    // Atualiza a cada 5 segundos (5000 ms)
    setInterval(updateVisitCount, 5000);
    updateVisitCount();

    // Ao clicar no ícone, alterna a exibição do texto com o número de visitas
    visitCounter.addEventListener('click', function() {
        if (visitCountDisplay.style.display === 'none' || visitCountDisplay.style.display === '') {
            visitCountDisplay.style.display = 'inline';
        } else {
            visitCountDisplay.style.display = 'none';
        }
    });
});
