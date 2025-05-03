// JavaScript para navegação da galeria
document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('gallery');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Calcula a largura de um item da galeria mais o gap
  const itemWidth = gallery.querySelector('.gallery-item').offsetWidth + 16; // 16px é o gap
  
  // Função para rolar para o próximo conjunto de imagens
  nextBtn.addEventListener('click', function() {
    gallery.scrollBy({ left: itemWidth * 2, behavior: 'smooth' });
  });
  
  // Função para rolar para o conjunto anterior de imagens
  prevBtn.addEventListener('click', function() {
    gallery.scrollBy({ left: -itemWidth * 2, behavior: 'smooth' });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-image");
  const modal = document.getElementById("globalImageModal");
  const modalImage = document.getElementById("globalModalImage");
  const closeButton = document.querySelector(".close-button");

  galleryImages.forEach(image => {
    image.addEventListener("click", function () {
      modalImage.src = this.dataset.infoImage;
      modal.style.display = "flex"; // exibe o modal centralizado
    });
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
    
// Modal para imagens ampliadas: habilita tanto as imagens da galeria quanto os links de espécie
document.addEventListener('DOMContentLoaded', function() {
var modal = document.getElementById('globalImageModal');
var modalImg = document.getElementById('globalModalImage');
var closeButton = document.querySelector('.close-button');

// Função para abrir o modal com a imagem fornecida
function openModal(imgUrl) {
  if (imgUrl) {
    modalImg.src = imgUrl;
    modal.style.display = 'flex'; // ALTERAÇÃO: utiliza 'flex' para centralizar o modal
  }
}

// Adiciona listener para os links de espécie
var especieLinks = document.querySelectorAll('.especie-link');
especieLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var imgUrl = this.getAttribute('data-info-image');
    openModal(imgUrl);
  });
});

// Listener geral para fechar o modal
closeButton.addEventListener('click', function() {
  modal.style.display = 'none';
});
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
});
