function updateVortex() {
    const agora = new Date();

    // Atualiza Relógio
    const h = String(agora.getHours()).padStart(2, '0');
    const m = String(agora.getMinutes()).padStart(2, '0');
    const s = String(agora.getSeconds()).padStart(2, '0');
    document.getElementById('vortex-clock').textContent = `${h}:${m}:${s}`;

    // Atualiza Data
    const opcoes = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    let dataTexto = agora.toLocaleDateString('pt-BR', opcoes);
    document.getElementById('vortex-date').textContent = dataTexto.replace("-feira", "");
}

// Localização via API
async function fetchCity() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&localityLanguage=pt`);
                const data = await response.json();
                document.getElementById('vortex-location').textContent = `${data.city || data.locality} • ${data.principalSubdivisionCode.split('-')[1] || ''}`;
            } catch (e) {
                document.getElementById('vortex-location').textContent = "CONEXÃO OFFLINE";
            }
        }, () => {
            document.getElementById('vortex-location').textContent = "ACESSO NEGADO";
        });
    }
}

// Função Tela Cheia (Ativa ao clicar em qualquer lugar)
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Erro ao ativar tela cheia: ${err.message}`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Iniciar
setInterval(updateVortex, 1000);
updateVortex();
fetchCity();
