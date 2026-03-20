async function getCityByIP() {
    try {
        // Usando a ipapi.co que aceita HTTPS e é gratuita
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const elementoLocal = document.getElementById('vortex-location');
        
        if (data && data.city) {
            // Se achar a cidade, coloca o nome dela
            elementoLocal.textContent = `Horário de ${data.city}`;
        } else {
            // Se não achar, coloca um padrão amigável
            elementoLocal.textContent = "Horário Local";
        }
    } catch (error) {
        // Se der erro (Adblock ou rede), define o padrão
        document.getElementById('vortex-location').textContent = "Horário Local";
        console.warn("Não foi possível obter a cidade:", error);
    }
}

// Inicializa a busca
getCityByIP();



let ultimaData = "";

function updateVortex() {
    const agora = new Date();
    
    // Relógio
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const s = String(agora.getSeconds()).padStart(2, '0');
    document.getElementById('vortex-clock').textContent = `${h}:${m}:${s}`;

    // Datas
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    const dataFinal = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    // Se a data mudou (ou é a primeira vez que carrega)
    if (dataFinal !== ultimaData) {
        const elementoTopo = document.getElementById('vortex-date');
        const elementoRodape = document.getElementById('footer-full-date');

        // Aplica a animação de fade
        elementoTopo.classList.add('fade-effect');
        elementoRodape.classList.add('fade-effect');

        // Atualiza o texto
        elementoTopo.textContent = dataFinal;
        elementoRodape.textContent = dataFinal;

        // Remove a classe após a animação terminar para poder usar de novo amanhã
        setTimeout(() => {
            elementoTopo.classList.remove('fade-effect');
            elementoRodape.classList.remove('fade-effect');
        }, 1000);

        ultimaData = dataFinal;
    }
}

function copyPix(chave) {
    const txt = document.getElementById('pix-text');
    navigator.clipboard.writeText(chave).then(() => {
        txt.textContent = "CHAVE COPIADA!";
        setTimeout(() => { txt.textContent = "CONTRIBUIR VIA PIX"; }, 2000);
    });
}

function toggleFullScreen(event) {
    // 1. Se clicar no botão de PIX, não faz nada (deixa o copyPix trabalhar)
    if (event.target.closest('.pix-button')) return;

    // 2. Se clicar em qualquer lugar do rodapé (links incluídos), NÃO ativa tela cheia
    if (event.target.closest('.footer-area')) return;

    // 3. Lógica da tela cheia
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erro ao tentar ativar tela cheia: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// As outras funções (updateVortex e copyPix) continuam iguais ao código anterior.


setInterval(updateVortex, 1000);
updateVortex();

document.addEventListener('keydown', (event) => {
    // Tecla 'F' ou 'f' para Tela Cheia
    if (event.key.toLowerCase() === 'f') {
        toggleFullScreen(event);
    }

    // Tecla 'Espaço' para Pausar/Retomar (Útil se você tiver cronômetro ou foco)
    if (event.code === 'Space') {
        event.preventDefault(); // Evita que a página role para baixo
        // Aqui você chamaria sua função de pause/start do cronômetro
        console.log("Espaço pressionado - Comando de pausa/play");
    }

    // Tecla 'M' para ir para o Mundo, 'C' para Cronômetro
    if (event.key.toLowerCase() === 'm') window.location.href = 'global.html';
    if (event.key.toLowerCase() === 'c') window.location.href = 'cronometro.html';
});
