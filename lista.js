document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function(task, index) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    renderTasks();

    // Add new task
    taskInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter" && taskInput.value.trim() !== "") {
            tasks.push({ text: taskInput.value.trim(), completed: false });
            taskInput.value = "";
            renderTasks();
            updateLocalStorage();
        }
    });

    // Toggle task completion
    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        updateLocalStorage();
    };

    // Delete task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
        updateLocalStorage();
    };

    // Filter tasks
    window.filterTasks = function(filter) {
        const filteredTasks = tasks.filter(function(task) {
            if (filter === "active") {
                return !task.completed;
            } else if (filter === "completed") {
                return task.completed;
            } else {
                return true;
            }
        });
        tasks = filteredTasks;
        renderTasks();
    };

    // Update local storage
    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
