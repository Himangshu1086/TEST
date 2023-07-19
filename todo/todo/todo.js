//Assignment 3
// ToDO list 
/*
    maintain a list of todo items - keep a array in memory - [{task:"abc" , id:1} , {task:"dsf" , id:2}]
    function to add to the array 
    function to remove a particular element in the array

    UI -
    {
        textbox with save button (click event call the add task function , clear the textbox , list the task )
        delete button (on click pass the id that will be delete)

    }
*/
// window.onload(load_task())

const load_task = () => {

    // Get the tasks from localStorage and convert it to an array
    let tasks = {... localStorage};
    let task_array = Object.entries(tasks);

    // Loop through the tasks and add them to the list
    const lists = document.getElementById("list");
    task_array.forEach(task => {
      lists.innerHTML += `<div class="todo_box" id="${task[0]}">
      <div class="todo_box_text_div"><span>${task[1]}</span></div>
      <div class="todo_box_button_div"><button id="${task[0]}" onClick = "getId(this.id)"><img src="delete.png"/></button></div>
  </div>`
    });
  }

load_task()


document.getElementById("add").addEventListener('click',()=>{
    let task = document.getElementById("task_input").value;
    if(task=='')
        alert('Please add a Task');
    else
    {
        let tasks = {... localStorage};
        let task_array = Object.entries(tasks);
        if(task_array.length==0)
        {
            localStorage.setItem(0,task)
            document.getElementById('task_input').value = ''
        }
        else{
            localStorage.setItem(++task_array[task_array.length-1][0],task)
            document.getElementById('task_input').value = ''
        }
    }
    window.location.reload()
})

const getId = (id) =>{
    localStorage.removeItem(id);
    window.location.reload();
}


let todos = []
fetch('https://jsonplaceholder.typicode.com/todos')
    .then(
    (res) =>{
        if(!res.status.ok){

        }
        return res.json();
    }
).then(
    (data) => {
        data.forEach(
            (item) =>{
                const todo_fetch_item = document.getElementById("todos_fetch");
                todo_fetch_item.innerHTML += `<li>${item.title}</li>`
            }
        )
    }
)