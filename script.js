// Função para buscar a cidade via IP (Sem pedir permissão)
async function getCityByIP() {
    try {
        const response = await fetch('http://ip-api.com/json/?fields=city');
        const data = await response.json();
        
        if (data && data.city) {
            document.getElementById('vortex-location').textContent = `Horário de ${data.city}`;
        } else {
            document.getElementById('vortex-location').textContent = "Horário Local";
        }
    } catch (error) {
        // Se a API falhar ou houver bloqueio de AdBlock, mantém o padrão
        document.getElementById('vortex-location').textContent = "Horário Local";
        console.log("Erro ao buscar cidade:", error);
    }
}

// Chame a função uma vez quando o site carregar
getCityByIP();

// ... (Mantenha o resto do seu script.js igual)


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
