document.addEventListener("DOMContentLoaded", () => {
    // Pega o primeiro botão de ação (o do coração) e a imagem principal
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".post-actions > .action-btn:last-child");
    
    if (!likeBtn) return;

    // Remove qualquer texto antigo e cria um span interno limpo para os números se não existir
    let likesCountSpan = likeBtn.querySelector(".likes-count");
    if (!likesCountSpan) {
        // Salva o SVG atual e limpa o botão para inserir o número corretamente
        const svgHTML = likeBtn.querySelector("svg").outerHTML;
        likeBtn.innerHTML = svgHTML + ' <span class="likes-count">0</span>';
        likesCountSpan = likeBtn.querySelector(".likes-count");
    }

    const likesTextCount = document.querySelector(".post-details .likes");
    
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
        if (likesTextCount) {
            likesTextCount.innerHTML = `Liked by <strong>liam_beanz99</strong> and <strong>${baseLikes} others</strong>`;
        }
    }

    // Efeito de animação de zoom no ícone
    function animateIcon(svgElement) {
        if (!svgElement) return;
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Função que soma e ativa o visual vermelho
    function addLike() {
        baseLikes++;
        likeBtn.classList.add("liked");
        updateDisplay();
        animateIcon(likeBtn.querySelector("svg"));
    }

    // Estilo visual do coração vermelho via JS (caso não tenha colocado no CSS)
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
        .left-actions .action-btn:first-child.liked svg {
            fill: #ef4444 !important;
            stroke: #ef4444 !important;
        }
        .action-btn svg {
            transition: transform 0.15s ease;
        }
    `;
    document.head.appendChild(styleTag);

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
            bookmarkBtn.style.color = isBookmarked ? "#ffffff" : "";
            animateIcon(bookmarkBtn.querySelector("svg"));
        });
    }

    // Inicializa o contador zerado
    updateDisplay();
});document.addEventListener("DOMContentLoaded", () => {
    // Pega o primeiro botão de ação (o do coração) e a imagem principal
    const likeBtn = document.querySelector(".left-actions .action-btn:first-child");
    const postMedia = document.querySelector(".post-media");
    const bookmarkBtn = document.querySelector(".post-actions > .action-btn:last-child");
    
    if (!likeBtn) return;

    // Remove qualquer texto antigo e cria um span interno limpo para os números se não existir
    let likesCountSpan = likeBtn.querySelector(".likes-count");
    if (!likesCountSpan) {
        // Salva o SVG atual e limpa o botão para inserir o número corretamente
        const svgHTML = likeBtn.querySelector("svg").outerHTML;
        likeBtn.innerHTML = svgHTML + ' <span class="likes-count">0</span>';
        likesCountSpan = likeBtn.querySelector(".likes-count");
    }

    const likesTextCount = document.querySelector(".post-details .likes");
    
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
        if (likesTextCount) {
            likesTextCount.innerHTML = `Liked by <strong>liam_beanz99</strong> and <strong>${baseLikes} others</strong>`;
        }
    }

    // Efeito de animação de zoom no ícone
    function animateIcon(svgElement) {
        if (!svgElement) return;
        svgElement.style.transform = "scale(1.4)";
        setTimeout(() => {
            svgElement.style.transform = "scale(1)";
        }, 150);
    }

    // Função que soma e ativa o visual vermelho
    function addLike() {
        baseLikes++;
        likeBtn.classList.add("liked");
        updateDisplay();
        animateIcon(likeBtn.querySelector("svg"));
    }

    // Estilo visual do coração vermelho via JS (caso não tenha colocado no CSS)
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
        .left-actions .action-btn:first-child.liked svg {
            fill: #ef4444 !important;
            stroke: #ef4444 !important;
        }
        .action-btn svg {
            transition: transform 0.15s ease;
        }
    `;
    document.head.appendChild(styleTag);

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
            bookmarkBtn.style.color = isBookmarked ? "#ffffff" : "";
            animateIcon(bookmarkBtn.querySelector("svg"));
        });
    }

    // Inicializa o contador zerado
    updateDisplay();
});