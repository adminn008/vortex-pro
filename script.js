function updateVortex() {
    const agora = new Date();

    // Relógio Digital
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const s = String(agora.getSeconds()).padStart(2, '0');
    document.getElementById('vortex-clock').textContent = `${h}:${m}:${s}`;

    // Data completa mantendo o "-feira"
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    let dataTexto = agora.toLocaleDateString('pt-BR', opcoes);
    
    // Deixa a primeira letra maiúscula
    document.getElementById('vortex-date').textContent = dataTexto.charAt(0).toUpperCase() + dataTexto.slice(1);
}

// Alternar modo Tela Cheia
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Erro: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Inicia o ciclo
setInterval(updateVortex, 1000);
updateVortex();
