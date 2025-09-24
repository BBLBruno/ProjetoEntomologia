// JavaScript para navegação da galeria
document.addEventListener('DOMContentLoaded', function() {
  // --- GERAL ---
  const modal = document.getElementById('globalImageModal');
  const modalImg = document.getElementById('globalModalImage');
  const closeButton = document.querySelector('.close-button');

  // Função para abrir o modal com a imagem fornecida
  function openModal(imgUrl) {
    if (imgUrl) {
      modalImg.src = imgUrl;
      modal.style.display = 'flex';
    }
  }

  // Listener geral para fechar o modal
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // --- GALERIA ---
  const gallery = document.getElementById('gallery');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (gallery && prevBtn && nextBtn) {
    const galleryItem = gallery.querySelector('.gallery-item');
    if (galleryItem) { // Adicionada verificação para evitar erro se a galeria estiver vazia
      const itemWidth = galleryItem.offsetWidth + 16; // 16px é o gap

      nextBtn.addEventListener('click', function() {
        gallery.scrollBy({ left: itemWidth * 2, behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', function() {
        gallery.scrollBy({ left: -itemWidth * 2, behavior: 'smooth' });
      });
    }

    const galleryImages = document.querySelectorAll(".gallery-image");
    galleryImages.forEach(image => {
      image.addEventListener("click", function() {
        openModal(this.dataset.infoImage);
      });
    });
  }

  // --- LINKS DE ESPÉCIE ---
  const especieLinks = document.querySelectorAll('.especie-link');
  especieLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(this.getAttribute('data-info-image'));
    });
  });

  // --- POPUP DE FEEDBACK ---
  const feedbackPopup = document.getElementById("feedback-popup");
  if (feedbackPopup) {
    if (!localStorage.getItem('feedbackPopupShown')) {
      setTimeout(function() {
        feedbackPopup.style.display = "block";
        localStorage.setItem('feedbackPopupShown', 'true');
      }, 20000); // 20 segundos
    }

    const closePopupButton = document.getElementById("close-popup");
    if (closePopupButton) {
      closePopupButton.addEventListener("click", function() {
        feedbackPopup.style.display = "none";
      });
    }
    window.addEventListener("click", function(event) {
      if (event.target === feedbackPopup) {
        feedbackPopup.style.display = "none";
      }
    });
  }

  // --- FILTROS DE ESPÉCIE (FAMÍLIA E GÊNERO) ---
  const filtroFamilia = document.getElementById('filtroFamilia');
  const filtroGenero = document.getElementById('filtroGenero');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const listaEspecies = document.getElementById('listaEspecies');

  function filtrarEspecies() {
    if (!listaEspecies) return;

    const familiaSelecionada = filtroFamilia ? filtroFamilia.value : "";
    const generoSelecionado = filtroGenero ? filtroGenero.value : "";
    const especies = listaEspecies.getElementsByTagName('li');

    for (let i = 0; i < especies.length; i++) {
      const especie = especies[i];
      const familiaDaEspecie = especie.getAttribute('data-familia');
      const generoDaEspecie = especie.getAttribute('data-genero');

      const familiaCorresponde = (familiaSelecionada === "" || familiaDaEspecie === familiaSelecionada);
      const generoCorresponde = (generoSelecionado === "" || generoDaEspecie === generoSelecionado);

      if (familiaCorresponde && generoCorresponde) {
        especie.style.display = "";
      } else {
        especie.style.display = "none";
      }
    }
  }

  if (filtroFamilia) {
    filtroFamilia.addEventListener('change', filtrarEspecies);
  }
  if (filtroGenero) {
    filtroGenero.addEventListener('change', filtrarEspecies);
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (filtroFamilia) filtroFamilia.value = "";
      if (filtroGenero) filtroGenero.value = "";
      filtrarEspecies();
    });
  }
});

