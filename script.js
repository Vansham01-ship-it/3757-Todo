const inputBox = document.getElementById("input")
const addTask = document.getElementById("button")
const list = document.getElementById("ul")

let todo = []


function addTodo(){
    const task = inputBox.value

    todo.push(task)

    renderTodo()
}

function createTodo(item, index){
    const li = document.createElement("li")
    li.innerText = item
    
    const deletebtn = document.createElement("button")
    deletebtn.innerText = "Delete"

    li.appendChild(deletebtn)
    
    deletebtn.addEventListener("click", ()=>{
        deleteList(index)
    })

    return li;
}

function deleteList(index){
    todo.splice(index, 1)

    renderTodo()
}

function renderTodo(){
    list.innerText = ""
    todo.forEach((item, index)=>{
        const li = createTodo(item, index)

        list.appendChild(li)
    })
}


addTask.addEventListener("click", addTodo)