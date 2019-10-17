// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

loadEventListeners();


function loadEventListeners(){

    //add task event
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click',removetask);

    clearBtn.addEventListener('click',clearTasks);

    filter.addEventListener('keyup',filterTasks);

    //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);

}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
       //Create li element

    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create text node and append to the li

    li.appendChild(document.createTextNode(task));
    
    //Create new link element

    const taskLink = document.createElement('a');

    //Add class

    taskLink.className = 'delete-item secondary-content';

    //Add icon html
    taskLink.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(taskLink);

    // Append li to ul
    taskList.appendChild(li);  
    })
}


function removetask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();

        //remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks() {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
  }

  function clearTasksFromLocalStorage()
  {
      localStorage.clear();
  }

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.removeChild = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}


//Add Task

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //Create li element

    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create text node and append to the li

    li.appendChild(document.createTextNode(taskInput.value));
    
    //Create new link element

    const taskLink = document.createElement('a');

    //Add class

    taskLink.className = 'delete-item secondary-content';

    //Add icon html
    taskLink.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(taskLink);

    // Append li to ul
    taskList.appendChild(li);    
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}