document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos principais da tela
    const likeBtn = document.querySelector(".like-btn") || document.querySelector(".left-actions .action-btn");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn");
    
    if (!likeBtn) return;

    // Procura ou cria o elemento de contagem de likes dentro do botão
    let likesCountSpan = likeBtn.querySelector(".likes-count");
    if (!likesCountSpan) {
        // Se não existir, criamos o span dentro do botão sem destruir o SVG existente
        likesCountSpan = document.createElement("span");
        likesCountSpan.className = "likes-count";
        likesCountSpan.textContent = "0";
        likeBtn.appendChild(likesCountSpan);
    }

    const likesTextCount = document.querySelector(".likes-text-count") || document.querySelector(".post-details strong");
    
    // Variável que guarda o total de curtidas (começa em 0)
    let totalLikes = 0;

    // Formata números grandes (ex: 1200 -> 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza os valores na tela
    function updateDisplay() {
        likesCountSpan.textContent = formatLikes(totalLikes);
        if (likesTextCount && likesTextCount !== likesCountSpan) {
            likesTextCount.textContent = `${totalLikes} others`;
        }
    }

    // Animação visual de zoom no ícone
    function animateIcon(svgElement) {
        if (!svgElement) return;
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Garante que o CSS de coração vermelho esteja ativo
    if (!document.getElementById("dynamic-like-style")) {
        const styleTag = document.createElement("style");
        styleTag.id = "dynamic-like-style";
        styleTag.innerHTML = `
            .action-btn.liked svg, 
            .like-btn.liked svg {
                fill: #ef4444 !important;
                stroke: #ef4444 !important;
            }
            .action-btn svg, .like-btn svg {
                transition: transform 0.15s ease;
            }
        `;
        document.head.appendChild(styleTag);
    }

    // Função central que incrementa os likes (usada tanto pelo botão quanto pela foto)
    function handleLikeAction(e) {
        if (e) e.stopPropagation();
        
        totalLikes++;                  // Adiciona +1 a cada clique
        likeBtn.classList.add("liked"); // Deixa o coração vermelho
        updateDisplay();               // Atualiza os números na tela
        
        const svgEl = likeBtn.querySelector("svg");
        animateIcon(svgEl);            // Dá o efeito de pulso
    }

    // Adiciona o evento de clique direto no botão do coração
    likeBtn.addEventListener("click", handleLikeAction);

    // Adiciona o evento de clique na imagem principal do post
    if (postMedia) {
        postMedia.addEventListener("click", handleLikeAction);
    }

    // Funcionalidade opcional do botão de salvar (Bookmark)
    if (bookmarkBtn) {
        let isBookmarked = false;
        bookmarkBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            isBookmarked = !isBookmarked;
            bookmarkBtn.classList.toggle("bookmarked", isBookmarked);
            const bmSvg = bookmarkBtn.querySelector("svg");
            if (bmSvg) {
                bmSvg.style.fill = isBookmarked ? "currentColor" : "none";
                animateIcon(bmSvg);
            }
        });
    }

    // Inicializa o visor zerado
    updateDisplay();
});