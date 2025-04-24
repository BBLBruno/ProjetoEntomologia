document.addEventListener('DOMContentLoaded', () => {
  // Função que abre o modal com a imagem informada
  const globalModal = document.getElementById('globalInfoModal');
  const globalModalImage = document.getElementById('globalModalImage');
  const closeButton = document.querySelector('.close-button');

  // Seleciona os elementos de texto dos filtros que têm dados de imagem
  const infoLabels = document.querySelectorAll('.label-text[data-info-image]');
  infoLabels.forEach(label => {
    // Indica que o elemento é clicável
    label.style.cursor = 'pointer';
    label.addEventListener('click', () => {
      const imageUrl = label.getAttribute('data-info-image');
      if (imageUrl) {
        globalModalImage.src = imageUrl;
        globalModal.style.display = 'flex';
      }
    });
  });

  // Fecha o modal ao clicar no botão de fechar
  closeButton.addEventListener('click', () => {
    globalModal.style.display = 'none';
  });

  // Fecha o modal se clicar fora do conteúdo
  globalModal.addEventListener('click', (e) => {
    if (e.target === globalModal) {
      globalModal.style.display = 'none';
    }
  });
  
  // Abertura e fechamento do menu de filtros mobile
  document.getElementById('filterButton').addEventListener('click', function () {
    document.getElementById('filterOverlay').classList.add('active');
  });

  document.getElementById('filterOverlay').addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });

  // Gerenciamento dos filtros e função de limpar filtros continua do jeito que estava  
  const desktopFilters = document.querySelectorAll('.sidebar .radio-group');
  const mobileOverlay = document.getElementById('filterOverlay');
  const mobileFilters = mobileOverlay ? mobileOverlay.querySelectorAll('.radio-group') : [];
  function clearFilters() {
    desktopFilters.forEach((filter) => {
      const inputs = filter.querySelectorAll('.radio-input');
      inputs.forEach(input => {
        input.checked = false;
      });
    });
    mobileFilters.forEach((filter) => {
      const inputs = filter.querySelectorAll('.radio-input');
      inputs.forEach(input => {
        input.checked = false;
      });
    });
  }
  const resetButtons = document.querySelectorAll('.reset-button');
  resetButtons.forEach(button => {
    button.addEventListener('click', clearFilters);
  });

  // Herdar filtros da URL
  const params = new URLSearchParams(window.location.search);
  document.querySelectorAll('.radio-input').forEach(input => {
    const name = input.name;
    if (params.has(name) && params.get(name) === input.value) {
      input.checked = true;
    }
  });
});
