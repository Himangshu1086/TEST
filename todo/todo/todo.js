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
let tasks = { ...localStorage };
let task_array = Object.entries(tasks);


// Load on Windows Start
const load_task = (task_array) => {
  // Loop through the tasks and add them to the list
  const lists = document.getElementById("list");

  task_array.forEach((task) => {
    const todo = JSON.parse(task[1]);
      if(todo['done'])
      {
        lists.innerHTML += `
    <div style="text-decoration:line-through; color:grey;" class="todo_box" id="${task[0]}">
        <div class="todo_box_text_div">
          <div class="todo_box_text">
            <div class="todo_text_box_btn">
              <input
                type="checkbox"
                checked
                onClick="cross_text(this.id)"
                id="${task[0]}"
              />
              <span id=${task[0]} class="todo_text">${todo["task"]}</span>
            </div>
            <div class="todo_btn_del_edit">
              <div class="todo_box_button_div">
                <button id="${task[0]}" onClick="edit_task(this.id)">
                  <img src="edit.png" />
                </button>
              </div>
              <div class="todo_box_button_div">
                <button id="${task[0]}" onClick="getId(this.id)">
                  <img src="delete.png" />
                </button>
              </div>
            </div>
          </div>`;
      }
      else{
        lists.innerHTML += `
        <div class="todo_box" id="${task[0]}">
        <div class="todo_box_text_div">
          <div class="todo_box_text">
            <div class="todo_text_box_btn">
              <input
                type="checkbox"
                onClick="cross_text(this.id)"
                id="${task[0]}"
              />
              <span class="todo_text">${todo["task"]}</span>
            </div>
            
            <div class="todo_btn_del_edit">
              <div class="todo_box_button_div">
                <button id="${task[0]}" onClick="edit_task(this.id)">
                  <img src="edit.png" />
                </button>
              </div>
              <div class="todo_box_button_div">
                <button id="${task[0]}" onClick="getId(this.id)">
                  <img src="delete.png" />
                </button>
              </div>
            </div>
          </div>

          <div class="todo_box_tags">
            <span style="background-color:${todo['priority_color']};"
              >${todo["priority"]}</span
            >
            <span style="background-color: rgb(204, 108, 233)"
              >${todo["category"]}</span
            >
            <span style="background-color: pink">${todo["dueDate"]}</span>
          </div>
        </div>
      </div>
    </div>
        `;
      }
  });
};


load_task(task_array);


// Add a task
document.getElementById("add").addEventListener("click", () => {
  const task = document.getElementById("task_input").value;
  const prioritySelect = document.getElementById("prioritySelect");
  const categorySelect = document.getElementById("categorySelect");
  const dueDateInput = document.getElementById("dueDateInput");

    // Priority color set
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




// Delete the task
const getId = (id) => {
  localStorage.removeItem(id);
  window.location.reload();
};


// Edit the task
const edit_task = (id) =>{
  document.getElementById(id).innerHTML = `
  <input id="new_edited_task" class="adding_task_menu" type="text" placeholder="edit task"/> 
  <button id=${id} class="adding_task_menu" onClick="edit_task_on_database(this.id)">Edit</button>
  `
}

const edit_task_on_database = (id) =>{
  const new_task = document.getElementById('new_edited_task').value
  if(!new_task)
  alert("Chutiya Banata Hai. Task Dal !")
  const item = JSON.parse(localStorage.getItem(id))
  item.task = new_task
  // console.log(item)

  localStorage.setItem(id , JSON.stringify(item))
  window.location.reload()
}

// Line through the Done Task
const cross_text =(id) =>{
    const todo = JSON.parse(localStorage.getItem(id))
    todo['done'] = !todo['done']
    localStorage.setItem(id, JSON.stringify(todo))
    location.reload()
}



// Function to display filtered tasks of priority
function displayFilteredTasks(value , id) {

  let tasks = { ...localStorage };
  let task_array = Object.entries(tasks);
  let filter_list = ''


  // Code for range of date
  if(!value && !id)
  {
    const dueDateFrom = document.getElementById("dueDateFrom").value;
    const dueDateTo = document.getElementById("dueDateTo").value;
    filter_list = task_array.filter(task => 
      JSON.parse(task[1])['dueDate'] >= dueDateFrom &&  JSON.parse(task[1])['dueDate'] <= dueDateTo
      )
  }
  else
  {
    // code for priority and category
    filter_list = task_array.filter(task => 
      JSON.parse(task[1])[id] == value
      )
  }


  if(filter_list.length == 0 ) 
    {
      alert('No Search Found.Click ok to see the Task')
      window.location.reload()
    }
const lists = document.getElementById("list");
lists.innerHTML = `<h4>TODOS</h4>`
load_task(filter_list)
}


