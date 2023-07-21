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
  let tasks = { ...localStorage };
  let task_array = Object.entries(tasks);
  // Loop through the tasks and add them to the list
  const lists = document.getElementById("list");
  task_array.forEach((task) => {
    const todo = JSON.parse(task[1]);
    console.log(todo);
      if(todo['done'])
      {
        lists.innerHTML += `<div class="todo_box" id="${task[0]}">
        <div style="text-decoration:line-through; color:grey;" class="todo_box_text_div">
        <input type="checkbox" checked onClick ="cross_text(this.id)" id ="${task[0]}">
        <span>task : <span style="background-color:grey;color:black;padding:5px;border-radius:3px;">${todo["task"]}</span></span>
        </div>
        <div class="todo_box_button_div"><button id="${task[0]}" onClick = "getId(this.id)"><img src="delete.png"/></button></div>
    </div>`;
      }
      else{
        lists.innerHTML += `<div class="todo_box" id="${task[0]}">
      <div class="todo_box_text_div">
      <input type="checkbox" onClick ="cross_text(this.id)" id="${task[0]}">
      <span>task : <span style="background-color:white;color:black;padding:5px;border-radius:3px;">${todo["task"]}</span></span>
      <span>priority : <span style="background-color:${todo['priority_color']};color:black;padding:5px;border-radius:3px;">${todo["priority"]}</span></span>
      <span>category : <span style="background-color:rgb(204, 108, 233);color:black;padding:5px;border-radius:3px;">${todo["category"]}</span></span>
      <span>due date : <span style="background-color:pink;color:black;padding:5px;border-radius:3px;">${todo["dueDate"]}</span></span>
      </div>
      <div class="todo_box_button_div"><button id="${task[0]}" onClick = "edit_task(this.id)"><img src="edit.png"/></button></div>
      <div class="todo_box_button_div"><button id="${task[0]}" onClick = "getId(this.id)"><img src="delete.png"/></button></div>

      </div>`;
      }
  });
};

load_task();

document.getElementById("add").addEventListener("click", () => {
  const task = document.getElementById("task_input").value;
  const prioritySelect = document.getElementById("prioritySelect");
  const categorySelect = document.getElementById("categorySelect");
  const dueDateInput = document.getElementById("dueDateInput");

  var bg_color = ''
if(prioritySelect.value=='low') bg_color = 'rgb(216, 203, 87)'
        else if(prioritySelect.value =='medium') bg_color = 'rgb(90, 171, 224)'
        else bg_color = 'rgb(206, 36, 36)';


  const Todo = {
    task: task,
    done: false,
    priority: prioritySelect.value,
    category: categorySelect.value,
    dueDate: dueDateInput.value,
    priority_color :bg_color,
  };
  if (!Todo.task) alert("Please add a Task");
  else {
      const newTodo = JSON.stringify(Todo);
    let tasks = { ...localStorage };
    let task_array = Object.entries(tasks);
    if (task_array.length == 0) {
      localStorage.setItem(0, newTodo);
      document.getElementById("task_input").value = "";
    } else {
      localStorage.setItem(++task_array[task_array.length - 1][0], newTodo);
      document.getElementById("task_input").value = "";
    }
  }
  window.location.reload();
});

const getId = (id) => {
  localStorage.removeItem(id);
  window.location.reload();
};


const cross_text =(id) =>{
    const todo = JSON.parse(localStorage.getItem(id))
    todo['done'] = !todo['done']
    localStorage.setItem(id, JSON.stringify(todo))
    location.reload()
}









let todos = [];
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => {
    if (!res.status.ok) {
    }
    return res.json();
  })
  .then((data) => {
    data.forEach((item) => {
      const todo_fetch_item = document.getElementById("todos_fetch");
      todo_fetch_item.innerHTML += `<li>${item.title}</li>`;
    });
  });
