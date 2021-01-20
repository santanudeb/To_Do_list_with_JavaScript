//Selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo'); //select element in html

//Event-Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);

//Functions
function addTodo(event){
    //prevent default
    event.preventDefault();
    
    /*
    Format
                <div>
                    <li></li>
                    <button>Delete</button>
                    <button>Checked</button>
                </div>
    */

    //Creating Todo Div
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");

    //Creating Todo li
    const newtodo=document.createElement('li');
    newtodo.innerText=todoInput.value;
    newtodo.classList.add("todo-item");
    todoDiv.appendChild(newtodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //Creating Todo Complete
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="todo-complete"></i>'
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    //Creating Todo Delete
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='<i class="todo-delete"></i>'
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    //Append To List
    todoList.append(todoDiv);

    //Clear Todo Input Value
    todoInput.value="";
}

//delete complete funtion
function deleteCheck(e){
    const item=e.target;

    //delete
    if(item.classList[0]==='delete-button'){
        const todo=item.parentElement;
        todo.classList.add('fall'); //animation
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){  //waits for animation to end
            todo.remove();
        });
    }

    //check
    if(item.classList[0]==='complete-button'){
        const todo=item.parentElement;
        todo.classList.toggle('completed'); //animation style response class css
    }
}

//filter fuction
function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }else{
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
                }else{
                    todo.style.display='none';
                }
                break;        
        }
    });
}

//todo local storage
function saveLocalTodos(todo){
    //check if i have todo alredy
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    //push
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

//get/show todo from local storage
function getTodos(){
    //check if i have todo alredy
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    //copy from above
    todos.forEach(function(todo){
    //Creating Todo Div
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");

    //Creating Todo li
    const newtodo=document.createElement('li');
    newtodo.innerText=todo;
    newtodo.classList.add("todo-item");
    todoDiv.appendChild(newtodo);

    //Creating Todo Complete
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="todo-complete"></i>'
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);

    //Creating Todo Delete
    const deleteButton=document.createElement('button');
    deleteButton.innerHTML='<i class="todo-delete"></i>'
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    //Append To List
    todoList.append(todoDiv);
    });
}

//remove todo from local storage
function removeLocalTodos(todo){
    //check if i have todo alredy
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

    //getting index of todo
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos));
}