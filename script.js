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
    if (event.target.closest('.pix-button')) return;

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

setInterval(updateVortex, 1000);
updateVortex();
