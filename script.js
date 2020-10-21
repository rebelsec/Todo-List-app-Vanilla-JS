// Seleksi Variabel
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Taruh Eventlistener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
// Kasih fungsi

function addTodo(e) {
  // buat fungsi Prevent biar dia ga restart
  e.preventDefault(); //   Buat todo div
  const todoDiv = document.createElement(`div`);
  todoDiv.classList.add("todo");
  //   Buat LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add(`todo-item`);
  todoDiv.appendChild(newTodo);

  //   Masukkan to do ke database
  saveLocalTodos(todoInput.value);

  // Todo yang udah di ceklis
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //   Todo yang mau dibuang
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //   Masukkan ke list
  todoList.appendChild(todoDiv);
  //   Hapus nilai todo input
  todoInput.value = "";
}
// Fungsi Hapus
function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animasi
    todo.classList.add("fall");
    // Masukkan fungsi untuk hapus database nya
    removeLocalTodos(todo);
    todo.addEventListener("trasnsitionend", function () {
      todo.remove();
    });
  }

  //   Ceklist nya
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Buat fungsi untuk filter
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Cek ada gak data di database
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  console.log("hei");
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //   Buat todo div
    const todoDiv = document.createElement(`div`);
    todoDiv.classList.add("todo");
    //   Buat LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add(`todo-item`);
    todoDiv.appendChild(newTodo);

    // Todo yang udah di ceklis
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //   Todo yang mau dibuang
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //   Masukkan ke list
    todoList.appendChild(todoDiv);
  });
}
