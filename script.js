document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".like-btn");
    const likesCountSpan = likeBtn ? likeBtn.querySelector(".likes-count") : null;
    const likesTextCount = document.querySelector(".likes-text-count");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");
    
    if (!likeBtn) return;

    let baseLikes = 0;

    // Formatação de números (ex: 1200 -> 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza a interface
    function updateDisplay() {
        if (likesCountSpan) likesCountSpan.textContent = formatLikes(baseLikes);
        if (likesTextCount) likesTextCount.textContent = `${baseLikes} others`;
    }

    // Efeito de animação de zoom nos ícones
    function animateIcon(svgElement) {
        if (!svgElement) return;
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Função que apenas soma e ativa o visual vermelho
    function addLike() {
        baseLikes++;
        likeBtn.classList.add("liked");
        updateDisplay();
        animateIcon(likeBtn.querySelector("svg"));
    }

    // Clique no botão de coração (Soma +1 a cada clique)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addLike();
    });

    // Clique na imagem principal (Soma +1 a cada clique)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Botão de Salvar (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);
            animateIcon(bookmarkBtn.querySelector("svg"));
        });
    }

    // Inicializa o contador zerado
    updateDisplay();
});