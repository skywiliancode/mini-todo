// Seleção de elementos
const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Carregar tarefas do localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Função para salvar tarefas
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para renderizar tarefas
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span style="text-decoration:${task.done ? "line-through" : "none"}">
                ${task.title} - ${task.description}
            </span>
            <div>
                <button onclick="toggleDone(${index})">✔</button>
                <button onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Adicionar tarefa
addTaskBtn.addEventListener("click", () => {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();
    if (title) {
        tasks.push({ title, description: desc, done: false });
        saveTasks();
        renderTasks();
        taskTitle.value = "";
        taskDesc.value = "";
    }
});

// Marcar como concluída
function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

// Deletar tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Inicializar
renderTasks();
