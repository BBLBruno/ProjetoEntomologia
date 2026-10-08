// JavaScript para navegação da galeria
document.addEventListener('DOMContentLoaded', function() {
  // --- GERAL ---
  const modal = document.getElementById('globalImageModal');
  const modalImg = document.getElementById('globalModalImage');
  const modalCaption = document.getElementById('globalModalCaption');
  const galleryThumbs = document.getElementById('galleryThumbs');
  const closeButton = modal ? modal.querySelector('.close-button') : null;
  const prevModalBtn = modal ? modal.querySelector('.modal-prev') : null;
  const nextModalBtn = modal ? modal.querySelector('.modal-next') : null;

  let galleryItems = [];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function renderGalleryThumbs() {
    if (!galleryThumbs || !galleryItems.length) return;

    const visibleCount = 7;
    const start = Math.max(0, Math.min(currentIndex - 3, galleryItems.length - visibleCount));
    const end = Math.min(galleryItems.length, start + visibleCount);
    const visibleItems = galleryItems.slice(start, end);

    galleryThumbs.innerHTML = '';

    visibleItems.forEach((item, relativeIndex) => {
      const absoluteIndex = start + relativeIndex;
      const distance = Math.abs(absoluteIndex - currentIndex);
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'gallery-thumb';

      if (absoluteIndex === currentIndex) {
        thumb.classList.add('is-active');
      } else if (distance === 1) {
        thumb.classList.add('is-adjacent');
      }

      if (absoluteIndex === start || absoluteIndex === end - 1) {
        thumb.classList.add('is-edge');
      }

      thumb.setAttribute('aria-label', `${item.name} (${absoluteIndex + 1} / ${galleryItems.length})`);
      thumb.innerHTML = '<img src="' + item.src + '" alt="' + item.name + '">';
      thumb.addEventListener('click', function() {
        updateModal(absoluteIndex, galleryItems);
      });
      galleryThumbs.appendChild(thumb);
    });

    const activeThumb = galleryThumbs.querySelector('.gallery-thumb.is-active');
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function updateModal(index, items) {
    if (!items || !items.length || !modalImg) return;

    currentIndex = Math.max(0, Math.min(index, items.length - 1));
    galleryItems = items;
    const currentItem = galleryItems[currentIndex];

    if (!currentItem) return;

    modalImg.src = currentItem.src;
    modalImg.alt = currentItem.name;

    if (modalCaption) {
      modalCaption.innerHTML = `${currentItem.name} <span>(${currentIndex + 1} / ${galleryItems.length})</span>`;
    }

    renderGalleryThumbs();

    if (prevModalBtn) {
      prevModalBtn.disabled = galleryItems.length <= 1;
    }

    if (nextModalBtn) {
      nextModalBtn.disabled = galleryItems.length <= 1;
    }
  }

  function openModal(imgUrl, imageName, items) {
    if (!imgUrl || !modal) return;

    const normalizedItems = (items && items.length) ? items : [{ src: imgUrl, name: imageName || 'Imagem' }];
    galleryItems = normalizedItems;

    const itemIndex = normalizedItems.findIndex(item => item.src === imgUrl);
    currentIndex = itemIndex >= 0 ? itemIndex : 0;

    updateModal(currentIndex, normalizedItems);
    modal.style.display = 'flex';
  }

  window.openModal = openModal;

  function navigateModal(step) {
    if (!galleryItems.length) return;
    updateModal(currentIndex + step, galleryItems);
  }

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

  if (prevModalBtn) {
    prevModalBtn.addEventListener('click', function() {
      navigateModal(-1);
    });
  }

  if (nextModalBtn) {
    nextModalBtn.addEventListener('click', function() {
      navigateModal(1);
    });
  }

  document.addEventListener('keydown', function(event) {
    if (!modal || modal.style.display === 'none') return;

    if (event.key === 'Escape') {
      modal.style.display = 'none';
      return;
    }

    if (event.key === 'ArrowRight') {
      navigateModal(1);
    }

    if (event.key === 'ArrowLeft') {
      navigateModal(-1);
    }
  });

  if (modal) {
    modal.addEventListener('touchstart', function(event) {
      const touch = event.changedTouches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }, { passive: true });

    modal.addEventListener('touchend', function(event) {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;

      if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          navigateModal(1);
        } else {
          navigateModal(-1);
        }
      }
    }, { passive: true });
  }

  // --- GALERIA ---
  const gallery = document.getElementById('gallery');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (gallery && prevBtn && nextBtn) {
    const galleryItem = gallery.querySelector('.gallery-item');
    if (galleryItem) {
      const itemWidth = galleryItem.offsetWidth + 16;

      nextBtn.addEventListener('click', function() {
        gallery.scrollBy({ left: itemWidth, behavior: 'smooth' });
      });

      prevBtn.addEventListener('click', function() {
        gallery.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      });
    }

    const galleryImages = Array.from(document.querySelectorAll('.gallery-image'));
    const galleryList = galleryImages.map((image, index) => ({
      src: image.dataset.infoImage || image.src,
      name: image.dataset.imageName || image.getAttribute('alt') || `Imagem ${index + 1}`
    }));

    galleryImages.forEach((image, index) => {
      image.addEventListener('click', function() {
        openModal(this.dataset.infoImage, this.dataset.imageName || this.getAttribute('alt'), galleryList);
      });
    });
  }

  // --- LINKS DE ESPÉCIE ---
  function getVisibleSpeciesGalleryItems() {
    if (!listaEspecies) return [];

    return Array.from(listaEspecies.querySelectorAll('li'))
      .filter(function(item) {
        return item.style.display !== 'none';
      })
      .map(function(item) {
        const link = item.querySelector('.especie-link');
        if (!link) return null;

        const imageUrl = link.getAttribute('data-info-image');
        if (!imageUrl) return null;

        return {
          src: imageUrl,
          name: link.textContent.trim()
        };
      })
      .filter(Boolean);
  }

  const especieLinks = document.querySelectorAll('.especie-link');
  especieLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const imageUrl = this.getAttribute('data-info-image');
      const filteredItems = getVisibleSpeciesGalleryItems();
      const items = filteredItems.length ? filteredItems : [{ src: imageUrl, name: this.textContent.trim() }];
      openModal(imageUrl, this.textContent.trim(), items);
    });
  });

  /* Popup de formulário comentado: não será exibido no site.
  const feedbackPopup = document.getElementById("feedback-popup");
  if (feedbackPopup) {
    if (!localStorage.getItem('feedbackPopupShown')) {
      setTimeout(function() {
        feedbackPopup.style.display = "block";
        localStorage.setItem('feedbackPopupShown', 'true');
      }, 20000);
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
  */

  // --- FILTROS DE ESPÉCIE E GALERIA DE IMAGENS DAS ESPÉCIES ---
  const filtroFamilia = document.getElementById('filtroFamilia');
  const filtroGenero = document.getElementById('filtroGenero');
  const filtroEspecie = document.getElementById('filtroEspecie');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryCards = galleryGrid ? Array.from(galleryGrid.querySelectorAll('.order-gallery-card')) : [];
  const galleryPrevPage = document.getElementById('galleryPrevPage');
  const galleryNextPage = document.getElementById('galleryNextPage');
  const galleryPageInfo = document.getElementById('galleryPageInfo');
  const isEnglish = document.documentElement.lang === 'en';
  const itemsPerPage = 10;
  let galleryCurrentPage = 1;

  function normalizarTexto(valor) {
    return (valor || '').toString().trim().toLowerCase();
  }

  function configureCustomSuggestions(inputElement) {
    if (!inputElement) return;

    const listId = inputElement.dataset.listId;
    const listElement = listId ? document.getElementById(listId) : null;
    if (!listElement) return;

    inputElement.removeAttribute('list');

    const uniqueValues = [];
    const seen = new Set();
    Array.from(listElement.querySelectorAll('option')).forEach(function(option) {
      const value = (option.value || '').trim();
      const key = normalizarTexto(value);

      if (!value || seen.has(key)) return;
      seen.add(key);
      uniqueValues.push(value);
    });

    const wrapper = inputElement.closest('.filtro-item');
    if (!wrapper) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'filter-suggestions';
    wrapper.appendChild(dropdown);

    function closeDropdown() {
      dropdown.classList.remove('is-open');
      dropdown.innerHTML = '';
    }

    function renderDropdown() {
      const term = normalizarTexto(inputElement.value);
      const matches = uniqueValues.filter(function(value) {
        return !term || normalizarTexto(value).includes(term);
      });

      if (!matches.length) {
        closeDropdown();
        return;
      }

      dropdown.innerHTML = '';
      matches.forEach(function(value) {
        const optionButton = document.createElement('button');
        optionButton.type = 'button';
        optionButton.className = 'filter-suggestion-item';
        
        // Renderiza as tags HTML (como <em>) visualmente na lista
        optionButton.innerHTML = value; 
        
        optionButton.addEventListener('click', function() {
          // Cria um elemento temporário para extrair apenas o texto sem as tags HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = value;
          const textoLimpo = tempDiv.textContent || tempDiv.innerText || '';
          
          // Joga apenas o texto limpo para o input de busca
          inputElement.value = textoLimpo;
          
          closeDropdown();
          inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        });
        dropdown.appendChild(optionButton);
      });

      dropdown.classList.add('is-open');
    }

    inputElement.addEventListener('focus', function() {
      renderDropdown();
    });

    inputElement.addEventListener('input', function() {
      renderDropdown();
    });

    document.addEventListener('click', function(event) {
      if (!wrapper.contains(event.target)) {
        closeDropdown();
      }
    });
  }

  function getFilteredCards() {
    if (!galleryCards.length) return [];

    const familiaSelecionada = filtroFamilia ? normalizarTexto(filtroFamilia.value) : '';
    const generoSelecionado = filtroGenero ? normalizarTexto(filtroGenero.value) : '';
    const termoEspecie = filtroEspecie ? normalizarTexto(filtroEspecie.value) : '';

    return galleryCards.filter(function(card) {
      const familiaDaEspecie = normalizarTexto(card.dataset.familia);
      const generoDaEspecie = normalizarTexto(card.dataset.genero);
      const nomeDaEspecie = normalizarTexto(card.dataset.nome);

      const familiaCorresponde = !familiaSelecionada || familiaDaEspecie.includes(familiaSelecionada);
      const generoCorresponde = !generoSelecionado || generoDaEspecie.includes(generoSelecionado);
      const especieCorresponde = !termoEspecie || nomeDaEspecie.includes(termoEspecie);

      return familiaCorresponde && generoCorresponde && especieCorresponde;
    });
  }

  function getGalleryItemsFromCards(cards) {
    return cards
      .map(function(card) {
        const img = card.querySelector('img');
        const name = card.dataset.imageName || card.querySelector('span')?.textContent?.trim() || 'Imagem';
        const src = card.dataset.infoImage || img?.src;

        if (!src) return null;

        return { src: src, name: name };
      })
      .filter(Boolean);
  }

  function attachCardOpenHandlers() {
    galleryCards.forEach(function(card) {
      const cardButton = card.querySelector('.gallery-card-button');

      if (cardButton) {
        cardButton.addEventListener('click', function() {
          const filteredCards = getFilteredCards();
          const items = getGalleryItemsFromCards(filteredCards.length ? filteredCards : galleryCards);
          const clickedSrc = this.dataset.infoImage || card.querySelector('img')?.src;
          const clickedName = this.dataset.imageName || card.querySelector('span')?.textContent?.trim() || 'Imagem';

          if (window.openModal) {
            window.openModal(clickedSrc, clickedName, items);
          }
        });
      }

      const cardLabel = card.querySelector('span');
      if (cardLabel) {
        cardLabel.addEventListener('click', function() {
          const filteredCards = getFilteredCards();
          const items = getGalleryItemsFromCards(filteredCards.length ? filteredCards : galleryCards);
          const clickedSrc = card.dataset.infoImage || card.querySelector('img')?.src;
          const clickedName = card.dataset.imageName || card.querySelector('span')?.textContent?.trim() || 'Imagem';

          if (window.openModal) {
            window.openModal(clickedSrc, clickedName, items);
          }
        });
      }
    });
  }

  function renderGalleryPage() {
    if (!galleryGrid) return;

    const filteredCards = getFilteredCards();

    const totalPages = Math.max(1, Math.ceil(filteredCards.length / itemsPerPage));
    galleryCurrentPage = Math.min(galleryCurrentPage, totalPages);

    galleryCards.forEach(function(card) {
      card.style.display = 'none';
    });

    const start = (galleryCurrentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    filteredCards.slice(start, end).forEach(function(card) {
      card.style.display = '';
    });

    if (galleryPageInfo) {
      galleryPageInfo.textContent = filteredCards.length
        ? (isEnglish ? `Page ${galleryCurrentPage} of ${totalPages}` : `Página ${galleryCurrentPage} de ${totalPages}`)
        : (isEnglish ? 'No species found' : 'Nenhuma espécie encontrada');
    }

    if (galleryPrevPage) {
      galleryPrevPage.disabled = galleryCurrentPage <= 1 || filteredCards.length === 0;
    }

    if (galleryNextPage) {
      galleryNextPage.disabled = galleryCurrentPage >= totalPages || filteredCards.length === 0;
    }

  }

  if (filtroFamilia) {
    configureCustomSuggestions(filtroFamilia);
    filtroFamilia.addEventListener('input', function() {
      galleryCurrentPage = 1;
      renderGalleryPage();
    });
  }

  if (filtroGenero) {
    configureCustomSuggestions(filtroGenero);
    filtroGenero.addEventListener('input', function() {
      galleryCurrentPage = 1;
      renderGalleryPage();
    });
  }

  if (filtroEspecie) {
    configureCustomSuggestions(filtroEspecie);
    filtroEspecie.addEventListener('input', function() {
      galleryCurrentPage = 1;
      renderGalleryPage();
    });
  }

  if (galleryPrevPage) {
    galleryPrevPage.addEventListener('click', function(event) {
      event.preventDefault();
      if (galleryCurrentPage > 1) {
        galleryCurrentPage -= 1;
        renderGalleryPage();
      }
    });
  }

  if (galleryNextPage) {
    galleryNextPage.addEventListener('click', function(event) {
      event.preventDefault();
      const totalPages = Math.max(1, Math.ceil(getFilteredCards().length / itemsPerPage));

      if (galleryCurrentPage < totalPages) {
        galleryCurrentPage += 1;
        renderGalleryPage();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (filtroFamilia) filtroFamilia.value = "";
      if (filtroGenero) filtroGenero.value = "";
      if (filtroEspecie) filtroEspecie.value = "";
      galleryCurrentPage = 1;
      renderGalleryPage();
    });
  }

  attachCardOpenHandlers();
  renderGalleryPage();
});

