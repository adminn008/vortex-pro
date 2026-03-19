// 1. Atualização do Relógio e Data
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('time').innerText = `${hours}:${minutes}:${seconds}`;

    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('date').innerText = now.toLocaleDateString('pt-BR', options).toUpperCase();
}

setInterval(updateClock, 1000);
updateClock();

// 2. Lógica do Cronômetro
let swInterval, swSeconds = 0, running = false;
function startStopwatch() {
    const btn = document.getElementById('sw-btn');
    if (!running) {
        running = true; btn.innerText = "PAUSAR";
        swInterval = setInterval(() => {
            swSeconds++;
            const m = String(Math.floor(swSeconds / 60)).padStart(2, '0');
            const s = String(swSeconds % 60).padStart(2, '0');
            document.getElementById('stopwatch').innerText = `${m}:${s}`;
        }, 1000);
    } else {
        running = false; btn.innerText = "RETOMAR";
        clearInterval(swInterval);
    }
}
function resetStopwatch() {
    clearInterval(swInterval); running = false; swSeconds = 0;
    document.getElementById('stopwatch').innerText = "00:00";
    document.getElementById('sw-btn').innerText = "INICIAR";
}

// 3. Sistema de Temas Dinâmico (Sem direitos autorais)
// URLs do Unsplash (Domínio Público/Uso Livre)
const themeUrls = {
    night: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop',
    gaming: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop',
    space: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1600&auto=format&fit=crop',
    anime: 'https://images.unsplash.com/photo-1613371834198-42266d808ae3?q=80&w=1600&auto=format&fit=crop',
    abstract: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600&auto=format&fit=crop'
};

function setBg(themeKey) {
    const bgDiv = document.getElementById('bg-image');
    // Pre-carregamento para suavizar a troca
    const img = new Image();
    img.src = themeUrls[themeKey];
    img.onload = () => {
        bgDiv.style.backgroundImage = `url('${img.src}')`;
    };
    
    // Atualiza a borda ativa na galeria
    document.querySelectorAll('.theme-thumb').forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
}

// Define o tema inicial
setBg('space');

// 4. Modo Cinema (Tela Cheia Pure)
function toggleFullscreen() {
    const doc = document.documentElement;
    if (!document.fullscreenElement) {
        doc.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
