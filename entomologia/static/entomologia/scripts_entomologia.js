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

// Acessibilidade
document.addEventListener("DOMContentLoaded", () => {
  // Elementos do painel de acessibilidade e botões
  const accessibilityToggle = document.getElementById("accessibility-toggle");
  const accessibilityPanel = document.getElementById("accessibility-panel");
  const toggleContrastBtn = document.getElementById("toggle-contrast");
  const increaseFontBtn = document.getElementById("increase-font");
  const decreaseFontBtn = document.getElementById("decrease-font");

  // Exibe ou oculta o painel ao clicar no ícone
  accessibilityToggle.addEventListener("click", () => {
    if (accessibilityPanel.style.display === "none" || accessibilityPanel.style.display === "") {
      accessibilityPanel.style.display = "block";
    } else {
      accessibilityPanel.style.display = "none";
    }
  });

  // Alterna o modo de alto contraste
  toggleContrastBtn.addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
    localStorage.setItem("highContrast", document.body.classList.contains("high-contrast"));
  });

  // Aplica a preferência armazenada para alto contraste
  if (localStorage.getItem("highContrast") === "true") {
    document.body.classList.add("high-contrast");
  }

  // Ajuste do tamanho da fonte usando uma variável CSS
  let baseFontSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--base-font-size")) || 16;
  const minFontSize = 12;
  const maxFontSize = 24;
  
  increaseFontBtn.addEventListener("click", () => {
    if (baseFontSize < maxFontSize) {
      baseFontSize += 2;
      document.documentElement.style.setProperty("--base-font-size", baseFontSize + "px");
      localStorage.setItem("baseFontSize", baseFontSize);
    }
  });
  
  decreaseFontBtn.addEventListener("click", () => {
    if (baseFontSize > minFontSize) {
      baseFontSize -= 2;
      document.documentElement.style.setProperty("--base-font-size", baseFontSize + "px");
      localStorage.setItem("baseFontSize", baseFontSize);
    }
  });
  
  // Aplica o tamanho de fonte previamente salvo, se houver
  const savedFontSize = localStorage.getItem("baseFontSize");
  if (savedFontSize) {
    baseFontSize = parseInt(savedFontSize);
    document.documentElement.style.setProperty("--base-font-size", baseFontSize + "px");
  }
});
