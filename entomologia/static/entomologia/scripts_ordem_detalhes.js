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
            modalImage.src = this.dataset.infoImage; // Usa o mesmo comportamento do filtro
            modal.style.display = "flex";
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
      