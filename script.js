const inputBox = document.getElementById("input")
const addTask = document.getElementById("button")
const list = document.getElementById("ul")

let todo = []


function loadTodo(){
    const savedTodo = localStorage.getItem("todo")
    if(savedTodo){
        todo = JSON.parse(savedTodo)
    }
    renderTodo()
}


function saveTodo(){
    localStorage.setItem("todo", JSON.stringify(todo))
}

function addTodo(){
    const task = inputBox.value.trim()

    if(task === ""){
        alert("Please enter a task")
        return
    }


    todo.push({ text: task, completed: false })

    inputBox.value = ""

    saveTodo()
    renderTodo()
}

function createTodo(item, index){
    const li = document.createElement("li")


    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = item.completed
    checkbox.addEventListener("change", ()=>{
        toggleComplete(index)
    })

    const span = document.createElement("span")
    span.innerText = item.text
    if(item.completed){
        span.style.textDecoration = "line-through"
    }

    const editbtn = document.createElement("button")
    editbtn.innerText = "Edit"
    editbtn.addEventListener("click", ()=>{
        editList(index)
    })

    const deletebtn = document.createElement("button")
    deletebtn.innerText = "Delete"
    deletebtn.addEventListener("click", ()=>{
        deleteList(index)
    })

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(editbtn)
    li.appendChild(deletebtn)

    return li;
}

function deleteList(index){
    todo.splice(index, 1)

    saveTodo()
    renderTodo()
}

function editList(index){
    const updatedText = prompt("Edit your task:", todo[index].text)

    if(updatedText !== null && updatedText.trim() !== ""){
        todo[index].text = updatedText.trim()
        saveTodo()
        renderTodo()
    }
}

function toggleComplete(index){
    todo[index].completed = !todo[index].completed

    saveTodo()
    renderTodo()
}

function renderTodo(){
    list.innerHTML = ""
    todo.forEach((item, index)=>{
        const li = createTodo(item, index)

        list.appendChild(li)
    })
}


addTask.addEventListener("click", addTodo)


loadTodo()
