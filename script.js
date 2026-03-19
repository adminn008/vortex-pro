// Atualização de Tempo e Data
function updateVortex() {
    const agora = new Date();
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const s = String(agora.getSeconds()).padStart(2, '0');
    document.getElementById('vortex-clock').textContent = `${h}:${m}:${s}`;

    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    const dataFinal = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

    document.getElementById('vortex-date').textContent = dataFinal;
    document.getElementById('footer-full-date').textContent = dataFinal;
}

// Função para copiar o PIX
function copyPix(chave) {
    const botaoTexto = document.getElementById('pix-text');
    
    // Cria um elemento temporário para copiar
    const input = document.createElement("input");
    input.value = chave;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    // Feedback visual no botão
    botaoTexto.textContent = "CHAVE COPIADA!";
    setTimeout(() => {
        botaoTexto.textContent = "CONTRIBUIR VIA PIX";
    }, 2000);
}

// Fullscreen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

setInterval(updateVortex, 1000);
updateVortex();
