// selectors
const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".todoButton");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filterTodo");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
// functions

function addTodo(event){
    event.preventDefault();
    // create todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);
    // add to local storage
    saveLocalTodo(todoInput.value);
    // checkmark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add("completedBtn");
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trashBtn");
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear input
    todoInput.value = "";

}

function deleteCheck(e){
    const item = e.target;
    // delete todo
    if(item.classList[0] === "trashBtn"){
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
            })
    }
    // checkmark
    if(item.classList[0] === "completedBtn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
        })
}
function saveLocalTodo(todo){
    // Checks if there is something in local storage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(todo){
    // 
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todoItem');
        todoDiv.appendChild(newTodo);
        // checkmark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
        completedButton.classList.add("completedBtn");
        todoDiv.appendChild(completedButton);
        // trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trashBtn");
        todoDiv.appendChild(trashButton);
        // append to list
        todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}