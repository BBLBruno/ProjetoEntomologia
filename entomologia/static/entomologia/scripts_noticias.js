document.addEventListener("DOMContentLoaded", function () {
    const newsCards = document.querySelectorAll(".news-card");
    const popupOverlay = document.getElementById("newsPopup");
    const popupClose = popupOverlay.querySelector(".popup-close");
    const popupTitle = document.getElementById("popupTitle");
    const popupBody = document.getElementById("popupBody");

    newsCards.forEach(card => {
        card.addEventListener("click", function () {
            const title = this.dataset.titulo;
            const body = this.dataset.corpo;

            popupTitle.textContent = title;
            popupBody.innerHTML = body;
            
            popupOverlay.style.display = "flex";
        });
    });

    function closePopup() {
        popupOverlay.style.display = "none";
    }

    popupClose.addEventListener("click", closePopup);

    popupOverlay.addEventListener("click", function (e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
});