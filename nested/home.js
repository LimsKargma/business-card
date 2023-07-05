import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://tomsdb-fb622-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const usersInDB = ref(database, "users")

const token = localStorage.getItem("token")

const userTodos = ref(database, `users/${token}/todos`)

const todoInput = document.getElementById("todo-input")
const addTodoBtn = document.getElementById("add-todo-btn")
const todoList = document.getElementById("todo-list")
const logoutBtn = document.getElementById("logout-btn")

addTodoBtn.addEventListener("click", function () {
    let newTodo = todoInput.value

    push(userTodos, newTodo)
    
    todoInput.value = ""
})

logoutBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    window.location.href = "index.html"
})
    
onValue(userTodos, function (snapshot) {
    let todos = Object.entries(snapshot.val())
    
    clearTodoList()
    
    for (let i = 0; i < todos.length; i++) {
        let currentTodo = todos[i]
        addTodo(currentTodo)
    }
})

function addTodo(todo) {
    let todoID = todo[0]
    let todoValue = todo[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = todoValue
    
    newEl.addEventListener("click", function () {
        let exactLocation = ref(database, `users/${token}/todos/${todoID}`)
        remove(exactLocation)
    })
    
    todoList.append(newEl)
}

function clearTodoList() {
    todoList.innerHTML = ""
}