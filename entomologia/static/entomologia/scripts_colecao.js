/**
 * Scripts para a página de Coleção (colecao.html)
 * Gerenciamento de abas, persistência de estado e acessibilidade.
 */

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".collection-tab-btn");
  const tabPanels = document.querySelectorAll(".collection-tab-panel");

  function switchTab(targetTabId) {
    if (!targetTabId) return;

    // Atualiza classes dos botões
    tabButtons.forEach(button => {
      const buttonTabId = button.getAttribute("data-tab");
      const isTarget = buttonTabId === targetTabId;
      button.classList.toggle("active", isTarget);
      button.setAttribute("aria-selected", isTarget ? "true" : "false");
    });

    // Atualiza visibilidade dos painéis
    tabPanels.forEach(panel => {
      const panelId = panel.getAttribute("id");
      const isTarget = panelId === targetTabId;
      panel.classList.toggle("active", isTarget);
      panel.setAttribute("aria-hidden", isTarget ? "false" : "true");
    });

    // Atualiza hash da URL sem disparar scroll brusco
    if (history.replaceState) {
      history.replaceState(null, null, "#" + targetTabId);
    }
  }

  // Adiciona evento de clique em cada botão de aba
  tabButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetTabId = this.getAttribute("data-tab");
      switchTab(targetTabId);
    });
  });

  // Ativa a aba indicada no hash da URL (se existir), ou usa a primeira por padrão
  const hash = window.location.hash.replace("#", "");
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  } else if (tabButtons.length > 0) {
    const firstTab = tabButtons[0].getAttribute("data-tab");
    switchTab(firstTab);
  }

  // Suporte ao menu mobile (compartilhado com o header padrão)
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mainNav.classList.toggle("is-open");
    });

    document.addEventListener("click", function (e) {
      if (mainNav.classList.contains("is-open")) {
        const isClickInside = mainNav.contains(e.target);
        const isClickToggle = mobileNavToggle.contains(e.target);
        if (!isClickInside && !isClickToggle) {
          mainNav.classList.remove("is-open");
        }
      }
    });
  }
});

