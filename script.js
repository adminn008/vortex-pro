// Atualiza o relógio e a data
function updateClock() {
    const now = new Date();

    // Formata Hora, Minuto e Segundo com zero à esquerda
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    document.getElementById('hour').textContent = h;
    document.getElementById('minute').textContent = m;
    document.getElementById('second').textContent = s;

    // Formata Data por extenso
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = now.toLocaleDateString('pt-BR', options);
}

// Busca a cidade do usuário
function fetchLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                // API gratuita de geocodificação reversa
                const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`;
                const response = await fetch(url);
                const data = await response.json();
                
                // Exibe Cidade e Estado
                const city = data.city || data.locality || "Cidade desconhecida";
                const region = data.principalSubdivision || "";
                document.getElementById('location').textContent = `${city} - ${region}`;
            } catch (error) {
                document.getElementById('location').textContent = "Erro ao obter cidade";
            }
        }, () => {
            document.getElementById('location').textContent = "Permissão de localização negada";
        });
    } else {
        document.getElementById('location').textContent = "Navegador sem suporte a GPS";
    }
}

// Inicia as funções
setInterval(updateClock, 1000);
updateClock();
fetchLocation();
