// 1. LOCALIZAÇÃO (CIDADE)
async function getCityByIP() {
    const elementoLocal = document.getElementById('vortex-location');
    try {
        // Usando a ipwho.is que é mais rápida e estável
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();
        
        if (data && data.city) {
            elementoLocal.textContent = `Horário de ${data.city}`;
        } else {
            elementoLocal.textContent = "Horário Local";
        }
    } catch (e) {
        console.error("Erro na localização:", e);
        elementoLocal.textContent = "Horário Local";
    }
}

// 2. RELÓGIO E DATA
let ultimaData = "";

function updateVortex() {
    const agora = new Date();
    
    // Relógio
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const s = String(agora.getSeconds()).padStart(2, '0');
    
    const clockEl = document.getElementById('vortex-clock');
    if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;

    // Datas
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    const dataFinal = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    if (dataFinal !== ultimaData) {
        const elementoTopo = document.getElementById('vortex-date');
        const elementoRodape = document.getElementById('footer-full-date');

        if (elementoTopo) {
            elementoTopo.textContent = dataFinal;
            elementoTopo.classList.add('fade-effect');
            setTimeout(() => elementoTopo.classList.remove('fade-effect'), 1000);
        }
        
        if (elementoRodape) {
            elementoRodape.textContent = dataFinal;
        }

        ultimaData = dataFinal;
    }
}

// 3. FUNÇÕES DE UTILIDADE (PIX E TELA CHEIA)
function copyPix(chave) {
    const txt = document.getElementById('pix-text');
    navigator.clipboard.writeText(chave).then(() => {
        txt.textContent = "CHAVE COPIADA!";
        setTimeout(() => { txt.textContent = "CONTRIBUIR VIA PIX"; }, 2000);
    });
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erro: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// O navegador já cuida do "ESC" e do "Voltar" do Android sozinho 
// quando usamos a API de Fullscreen, mas vamos garantir que o 
// layout se comporte bem ouvindo o evento de mudança:
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        console.log("Saiu da tela cheia");
        // O CSS acima já vai fazer o botão reaparecer sozinho aqui
    }
});


// 4. ATALHOS DE TECLADO
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'f') toggleFullScreen(event);
    if (key === 'm') window.location.href = 'global.html';
    if (key === 'c') window.location.href = 'cronometro.html';
    if (event.code === 'Space') event.preventDefault();
});

// 5. INICIALIZAÇÃO (Onde a mágica começa)
getCityByIP();
setInterval(updateVortex, 1000);
updateVortex();
