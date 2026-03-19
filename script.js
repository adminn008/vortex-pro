function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === "") return; // Evita tarefas vazias

    const li = document.createElement('li');
    li.innerHTML = `
        <span onclick="this.parentElement.classList.toggle('done')">${taskText}</span>
        <button class="delete" onclick="this.parentElement.remove()">X</button>
    `;

    document.getElementById('taskList').appendChild(li);
    input.value = ""; // Limpa o campo
}
