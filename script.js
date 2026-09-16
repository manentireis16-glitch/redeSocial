document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.querySelector(".like-btn");
    const likesCountSpan = likeBtn ? likeBtn.querySelector(".likes-count") : null;
    const likesTextCount = document.querySelector(".likes-text-count");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");
    
    if (!likeBtn) return;

    let baseLikes = 0;
    let isLiked = false;

    // Função para formatar números (ex: 1200 -> 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza a tela com o valor atual dos likes
    function updateDisplay() {
        if (likesCountSpan) likesCountSpan.textContent = formatLikes(baseLikes);
        if (likesTextCount) likesTextCount.textContent = `${baseLikes} others`;
    }

    // Animação de zoom no ícone
    function animateIcon(svgElement) {
        if (!svgElement) return;
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Ação de Curtir
    function likePost() {
        baseLikes++;
        isLiked = true;
        likeBtn.classList.add("liked");
        updateDisplay();
        animateIcon(likeBtn.querySelector("svg"));
    }

    // Ação de Descurtir
    function unlikePost() {
        baseLikes = Math.max(0, baseLikes - 1);
        isLiked = false;
        likeBtn.classList.remove("liked");
        updateDisplay();
        animateIcon(likeBtn.querySelector("svg"));
    }

    // Clique no Botão de Curtida (Alterna entre curtir e descurtir)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isLiked) {
            unlikePost();
        } else {
            likePost();
        }
    });

    // Clique na Imagem Principal (Sempre adiciona uma curtida se não estiver curtido, ou pode curtir livremente)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!isLiked) {
                likePost();
            } else {
                unlikePost(); // Ou remova o else se quiser que clique na foto apenas adicione likes
            }
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

    // Inicializa zerado
    updateDisplay();
});