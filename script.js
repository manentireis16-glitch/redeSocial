document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o botão de curtir (primeiro botão da barra de ações) e a imagem principal
    const likeBtn = document.querySelector(".left-actions .action-btn, .action-btn");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".bookmark-btn") || document.querySelector(".post-actions > .action-btn:last-child");
    
    if (!likeBtn) return;

    // Garante que o botão tenha um span interno para exibir o número de curtidas
    let likesCountSpan = likeBtn.querySelector(".likes-count");
    if (!likesCountSpan) {
        const svgElement = likeBtn.querySelector("svg");
        if (svgElement) {
            const svgHTML = svgElement.outerHTML;
            likeBtn.innerHTML = svgHTML + ' <span class="likes-count">0</span>';
            likesCountSpan = likeBtn.querySelector(".likes-count");
        }
    }

    const likesTextCount = document.querySelector(".post-details .likes, .post-details");
    
    let baseLikes = 0;

    // Formatação de números (ex: 1200 -> 1.2K)
    function formatLikes(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    }

    // Atualiza os contadores na tela
    function updateDisplay() {
        if (likesCountSpan) {
            likesCountSpan.textContent = formatLikes(baseLikes);
        }
        if (likesTextCount) {
            likesTextCount.innerHTML = `Liked by <strong>liam_beanz99</strong> and <strong>${baseLikes} others</strong>`;
        }
    }

    // Animação de zoom no ícone ao clicar
    function animateIcon(svgElement) {
        if (!svgElement) return;
        svgElement.style.transform = "scale(1.3)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Adiciona estilos essenciais via JS para garantir que o coração fique vermelho e animado
    const dynamicStyle = document.createElement("style");
    dynamicStyle.innerHTML = `
        .action-btn.liked svg, 
        .left-actions .action-btn:first-child.liked svg {
            fill: #ef4444 !important;
            stroke: #ef4444 !important;
        }
        .action-btn svg {
            transition: transform 0.15s ease;
        }
    `;
    document.head.appendChild(dynamicStyle);

    // Função principal de incremento
    function addLike() {
        baseLikes++;
        likeBtn.classList.add("liked");
        updateDisplay();
        animateIcon(likeBtn.querySelector("svg"));
    }

    // Evento de clique no botão do coração (Soma +1 a cada clique)
    likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addLike();
    });

    // Evento de clique na imagem principal (Soma +1 a cada clique)
    if (postMedia) {
        postMedia.addEventListener("click", (e) => {
            e.stopPropagation();
            addLike();
        });
    }

    // Funcionalidade opcional para o botão de salvar (Bookmark)
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

    // Inicializa o contador zerado na tela
    updateDisplay();
});