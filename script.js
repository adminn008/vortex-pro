// 1. Atualizar Nome e Inicial
function atualizarNome() {
    const nome = document.getElementById('userNameInput').value;
    const display = document.getElementById('displayNome');
    const avatar = document.getElementById('userInitial');
    
    display.innerText = nome || "Usuário";
    avatar.innerText = nome ? nome.charAt(0).toUpperCase() : "U";
}

// 2. Data Atual
const data = new Date();
document.getElementById('currentDate').innerText = data.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long'
});

// 3. Lógica do Orçamento
function calcular() {
    const valor = parseFloat(document.getElementById('tipoServico').value);
    const qtd = parseInt(document.getElementById('qtd').value);
    const total = valor * qtd;
    
    document.getElementById('totalValor').innerText = total.toLocaleString('pt-BR', {
        style: 'currency', currency: 'BRL'
    });
}

// 4. Lógica de Tarefas
function addTarefa() {
    const input = document.getElementById('taskInput');
    const lista = document.getElementById('taskList');
    
    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.innerHTML = `${input.value} <span onclick="this.parentElement.remove()" style="cursor:pointer; color:red">✕</span>`;
        lista.appendChild(li);
        input.value = "";
    }
}

function gerarResumo() {
    const total = document.getElementById('totalValor').innerText;
    alert("Orçamento salvo com sucesso no valor de " + total);
}
