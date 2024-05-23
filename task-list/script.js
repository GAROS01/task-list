document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  // Array para almacenar las tareas
  let tasks = [];

  // Escuchar el evento submit del formulario
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  // Escuchar el evento submit del formulario de búsqueda
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText) {
      const filteredTasks = tasks.filter((task) =>
        task.text.toLowerCase().includes(searchText)
      );
      renderTasks(filteredTasks);
      searchInput.value = "";
    }
  });

  // Escuchar eventos de clic en la lista de tareas
  taskList.addEventListener("click", (e) => {
    const taskId = e.target.dataset.id;
    if (e.target.classList.contains("delete-btn")) {
      removeTask(taskId);
    } else if (e.target.classList.contains("edit-btn")) {
      editTask(taskId);
    } else if (e.target.tagName === "LI") {
      toggleComplete(taskId);
    }
  });

  // Función para agregar una tarea
  function addTask(taskText) {
    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    renderTasks();
  }

  // Función para editar una tarea
  function editTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      const newTaskText = prompt("Editar tarea", taskToEdit.text);
      if (newTaskText) {
        taskToEdit.text = newTaskText;
        renderTasks();
      }
    }
  }

  // Función para eliminar una tarea
  function removeTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
  }

  // Función para alternar el estado completado de una tarea
  function toggleComplete(id) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }

  // Función para renderizar la lista de tareas
  function renderTasks(tasksToRender = tasks) {
    taskList.innerHTML = "";
    tasksToRender.sort((a, b) => a.text.localeCompare(b.text));
    tasksToRender.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      li.dataset.id = task.id;
      if (task.completed) {
        li.classList.add("completed");
      }

      const btnContainer = document.createElement("div"); // Contenedor para los botones

      const editBtn = document.createElement("button");
      editBtn.textContent = "Editar";
      editBtn.classList.add("edit-btn");
      editBtn.dataset.id = task.id;
      btnContainer.appendChild(editBtn); // Agrega el botón de editar al contenedor

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Eliminar";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.dataset.id = task.id;
      btnContainer.appendChild(deleteBtn); // Agrega el botón de eliminar al contenedor

      li.appendChild(btnContainer); // Agrega el contenedor de botones al elemento li
      taskList.appendChild(li);
    });

    // Crear el botón para eliminar todas las tareas
    if (tasks.length > 1) {
      const deleteAllBtn = document.createElement("button");
      deleteAllBtn.textContent = "Eliminar todas las tareas";
      deleteAllBtn.classList.add("delete-all-btn");

      // Agregar un evento de clic al botón
      deleteAllBtn.addEventListener("click", () => {
        tasks = []; // Vaciar el array de tareas
        renderTasks(); // Volver a renderizar la lista de tareas
      });

      // Agregar el botón al final
      taskList.appendChild(deleteAllBtn);
    }
  }
});
