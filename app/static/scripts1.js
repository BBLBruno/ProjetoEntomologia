  // Script para abrir/fechar o menu de filtros mobile
  document.getElementById('filterButton').addEventListener('click', function() {
    document.getElementById('filterOverlay').classList.add('active');
  });

  document.getElementById('filterOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
    }
  });

  // Script para exibir/ocultar a popup das infos
  const infoButtons = document.querySelectorAll('.info-btn');
  infoButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const infoId = button.getAttribute('data-info');
      const popup = document.getElementById(infoId);
      popup.style.display = 'block';
    });
    
    button.addEventListener('mouseleave', () => {
      const infoId = button.getAttribute('data-info');
      const popup = document.getElementById(infoId);
      popup.style.display = 'none';
    });
  });

  // Gerenciamento dos filtros (desktop e mobile)
  document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os filtros do desktop e mobile separadamente
    const desktopFilters = document.querySelectorAll('.sidebar .radio-group');
    const mobileOverlay = document.getElementById('filterOverlay');
    const mobileFilters = mobileOverlay ? mobileOverlay.querySelectorAll('.radio-group') : [];
    // Função para limpar todos os filtros de cada conjunto
    function clearFilters() {
      // Limpa filtros no desktop
      desktopFilters.forEach((filter, index) => {
        const inputs = filter.querySelectorAll('.radio-input');
        inputs.forEach(input => {
          input.checked = false;
        });
      });
      
      // Limpa filtros no mobile
      mobileFilters.forEach((filter, index) => {
        const inputs = filter.querySelectorAll('.radio-input');
        inputs.forEach(input => {
          input.checked = false;
        });
      });
    }

    // Associa o evento "Limpar" aos botões de reset tanto no desktop quanto no mobile
    const resetButtons = document.querySelectorAll('.reset-button');
    resetButtons.forEach(button => {
      button.addEventListener('click', clearFilters);
    });
  });

// Popup mobile
  document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    // Cria o modal para exibir a imagem
    const mobileModal = document.createElement('div');
    mobileModal.id = 'mobileInfoModal';
    mobileModal.style.position = 'fixed';
    mobileModal.style.top = '0';
    mobileModal.style.left = '0';
    mobileModal.style.width = '100%';
    mobileModal.style.height = '100%';
    mobileModal.style.background = 'rgba(0, 0, 0, 0.8)';
    mobileModal.style.display = 'none';
    mobileModal.style.alignItems = 'center';
    mobileModal.style.justifyContent = 'center';
    mobileModal.style.zIndex = '10000';

    // Cria o elemento de imagem e o adiciona ao modal
    const modalImage = document.createElement('img');
    modalImage.style.maxWidth = '90%';
    modalImage.style.maxHeight = '90%';
    modalImage.style.borderRadius = '8px';
    mobileModal.appendChild(modalImage);

    // Cria um botão de fechar no modal
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.fontSize = '2rem';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    mobileModal.appendChild(closeButton);

    // Adiciona o modal ao body
    document.body.appendChild(mobileModal);

    // Evento para fechar o modal
    closeButton.addEventListener('click', () => {
      mobileModal.style.display = 'none';
    });
    mobileModal.addEventListener('click', (e) => {
      if (e.target === mobileModal) {
        mobileModal.style.display = 'none';
      }
    });

    // Seleciona os botões de informação dentro do overlay mobile
    const mobileInfoButtons = document.querySelectorAll('#filterOverlay .info-btn');
    mobileInfoButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        // Remove o sufixo "-mobile" do data-info para encontrar o popup correto
        const dataAttr = button.getAttribute('data-info');
        const infoId = dataAttr.replace('-mobile', '');
        const popup = document.getElementById(infoId);
        if (popup) {
          const imgElem = popup.querySelector('img');
          if (imgElem && imgElem.src) {
            modalImage.src = imgElem.src;
            mobileModal.style.display = 'flex';
          }
        }
      });
    });
  }
});


// Funcao para herdar filtros
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // Itera pelos filtros e aplica os valores vindos da URL
  document.querySelectorAll('.radio-input').forEach(input => {
    const name = input.name;
    if (params.has(name) && params.get(name) === input.value) {
      input.checked = true;
    }
  });
});





  
  