// Atualiza Tempo e Data
function updateDisplay() {
    const now = new Date();

    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hour').textContent = h;
    document.getElementById('minute').textContent = m;
    document.getElementById('second').textContent = s;

    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('pt-BR', options);
}

// Busca Cidade por Geolocalização
async function getCity() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`);
                const data = await response.json();
                const cidade = data.city || data.locality || "Cidade não encontrada";
                const estado = data.principalSubdivision || "";
                document.getElementById('location').textContent = `${cidade}, ${estado}`;
            } catch (error) {
                document.getElementById('location').textContent = "Erro de conexão";
            }
        }, () => {
            document.getElementById('location').textContent = "Localização negada";
        });
    }
}

// Função para ativar Tela Cheia no navegador
function toggleFS() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

setInterval(updateDisplay, 1000);
updateDisplay();
getCity();
