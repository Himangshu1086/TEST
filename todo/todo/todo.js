//Assignment 3
// ToDO list



// window.onload(load_task())
const tasks = { ...localStorage };
const task_array = Object.entries(tasks);
// console.log(task_array)

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
                <div>
                  <input type="checkbox"
                  onClick="cross_text(this.id)"
                  id="${task[0]}"/>
                </div>
                <div>
                  <div>
                    <span class="todo_text">${todo["task"]}</span>
                  </div>
                  <div id="${'subtask_container'+task[0]}" class="subtask_container">
                   

                  </div>
                </div>
              </div>
              
              <div class="todo_btn_del_edit">
                
                <div class="todo_box_button_div">
                  <button id="${task[0]}" onClick="edit_task(this.id)">
                    <img src="edit.png" alt="Edit the task"/>
                  </button>
                </div>

                <div class="todo_box_button_div">
                  <button id="${task[0]}" onClick="getId(this.id)">
                    <img src="delete.png" alt="Delete the task"/>
                  </button>
                </div>

                <div class="todo_box_button_div">
                  <button id="${task[0]}" onClick="create_alert(this.id)">
                   <img src="bell.png" / >
                  </button>
                </div>

                <div class="todo_box_button_div">
                  <button id="${task[0]}" onClick="add_subtask(this.id)">
                   <img src="add.png" / >
                  </button>
                </div>
              </div>
            </div>


  
            <div class="todo_box_tags">
              <span>Priority: </span>
              <span style="background-color:${todo.priority_color};"
                >${todo["priority"]}</span
              >
              <span>Category: </span>
              <span style="background-color: rgb(204, 108, 233)"
                >${todo["category"]}</span
              >
              <span>Tag: </span>
              <span style="background-color: rgb(204, 108, 233)"
                >${todo["tag"]}</span
              >
              <span>Due Date:</span><span style="background-color: pink">${todo["dueDate"]}</span>
              <span>Alert: </span><span style="background-color: rgb(112, 216, 109)"><span style="font-weight: bold;">Date :--- </span> ${todo.alert_date}  Time :--- ${todo.alert_time}</span>
            </div>

          </div>
        </div>
      </div>
        `;
      }
  });
};


const load_subtask = (task_array)=>{
  task_array.forEach((task) => {
    const todo = JSON.parse(task[1]);
    todo.subTask.forEach(sub => {
      document.getElementById("subtask_container"+task[0]).innerHTML += 
      `<span>${sub}<span>`
    })
  })
}


load_task(task_array);
load_subtask(task_array);

// Add a task
document.getElementById("add").addEventListener("click", () => {
  const task = document.getElementById("task_input").value;
  const prioritySelect = document.getElementById("prioritySelect");
  const categorySelect = document.getElementById("categorySelect");
  const dueDateInput = document.getElementById("dueDateInput");
  const tagSelect = document.getElementById('tagSelect');

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
    tag:tagSelect.value,
    status:'Incomplete',
    subTask:[],
    alert_date:'',
    alert_time:''
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
  <input id="new_edited_task" class="adding_task_menu" value="${JSON.parse(task_array[id][1]).task}" type="text" placeholder="edit task"/> 
  <button id=${id} class="adding_task_menu" onClick="edit_task_on_database(this.id)">Edit</button>
  <button id=${id} class="adding_task_menu" onClick="cancel()">Cancel</button>
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
    if(!todo['done'])
      todo['status'] = 'Incomplete';
      else
      todo['status'] = 'Completed';
     
    localStorage.setItem(id, JSON.stringify(todo))
    location.reload()
}





// Function to display filtered tasks of priority
function displayFilteredTasks(value , id) {

  let tasks = { ...localStorage };
  let task_array = Object.entries(tasks);
  let filter_list = ''

  if(value =='All') 
    {
      return window.location.reload()
    }

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
    
    // code for priority and category and tag
    filter_list = task_array.filter(task => 
      JSON.parse(task[1])[id] == value
      )
  }

  console.log(filter_list)

  if(filter_list.length == 0 ) 
    {
      alert('No Search Found.Click ok to see the Task')
      window.location.reload()
    }
const lists = document.getElementById("list");
lists.innerHTML = `<h4>TODOS</h4>`

load_task(filter_list)
load_subtask(filter_list)
}


// Pending task 
task_array.forEach((task) => {
  const todo = JSON.parse(task[1]);
  const today = new Date().toISOString().split('T')[0]
  const seconds = dateTimeToSeconds(todo.dueDate ,'00:00')
  const created_alerts = dateTimeToSeconds(today,'00:00')
    if(seconds && created_alerts)
      {
      makeItPending(seconds,created_alerts , task[0] ,todo);
      }
  })
  
  
  function makeItPending(time,create_date ,id , todo) {
    setTimeout(function () {
      todo["status"] = 'Pending'
      localStorage.setItem(id, JSON.stringify(todo))
      window.location.reload()
    }, (time - create_date)*1000);
  } 



// cancel button
const cancel = () =>{
  window.location.reload();
}





// Add subtasks
const add_subtask = (id) =>{
  document.getElementById(id).innerHTML = `
  <input id="new_edited_task" class="adding_task_menu" type="text" placeholder="sub task"/> 
  <button id=${id} class="adding_task_menu" onClick="add_task_sub(this.id)">Add Subtask</button>
  <button id=${id} class="adding_task_menu" onClick="cancel()">Cancel</button>
  `
}

const add_task_sub = (id)=>{
  const subtask_nw = document.getElementById('new_edited_task').value
  if(!subtask_nw)
    return alert("No sub task")

    const todo = JSON.parse(localStorage.getItem(id))
    todo["subTask"].push(subtask_nw)
    localStorage.setItem(id, JSON.stringify(todo))
    location.reload()
    load_subtask(task_array);
}



//Sorting by due dates
const sortingDueDates = (tagSort)=>{
  let tasks = { ...localStorage };
  let task_array = Object.entries(tasks);
  let list_srt =''

  //DECENDING ORDER
    if(tagSort == 'dueDateDec')
    {
      list_srt = task_array.sort(
        ( a,b ) => {
          return  new Date(JSON.parse(a[1]).dueDate) - new Date(JSON.parse(b[1]).dueDate)
        }
      )
    }
    //ASCENDING ORDER
    else if(tagSort =='dueDateAsc')
    {
      list_srt = task_array.sort(
        ( a,b ) => {
          return  new Date(JSON.parse(a[1]).dueDate) - new Date(JSON.parse(b[1]).dueDate)
        }
      )
      list_srt = list_srt.reverse()
    }
    //PRIORITY SORTING
    else
    {
      const priorityOrder = { "low": 1, "medium": 2, "high": 3 };
      list_srt = task_array.sort(
        (a, b) =>  priorityOrder[JSON.parse(b[1]).priority] - priorityOrder[JSON.parse(a[1]).priority]);
    }

    const lists = document.getElementById("list");
    lists.innerHTML = `<h4>TODOS</h4>`
    load_task(list_srt)
    load_subtask(list_srt)
}

//convert date and time to second
function dateTimeToSeconds(dateString, timeString) {
  const dateTimeString = dateString + " " + timeString;
  const dateObject = new Date(dateTimeString);
  const seconds = Math.floor(dateObject.getTime() / 1000);
  return seconds;
}



// Create Alert 
const create_alert = (id) =>{

  document.getElementById(id).innerHTML = `
  <input id="new_edited_date" class="adding_task_menu" type="date" placeholder="Create Alert"/> 
  <input id="new_edited_time" class="adding_task_menu" type="time" placeholder="Create Alert"/> 
  <button id=${id} class="adding_task_menu" onClick="add_alert(this.id)">Alert</button>
  <button id=${id} class="adding_task_menu" onClick="cancel()">Cancel</button>
  `
}
const add_alert = (id)=>{
  const date_alert = document.getElementById('new_edited_date').value
  const time_alert = document.getElementById("new_edited_time").value


  if(!date_alert && !time_alert)
    return alert("add alert")

    const todo = JSON.parse(localStorage.getItem(id))
    todo["alert_date"] = date_alert
    todo["alert_time"] = time_alert
    localStorage.setItem(id, JSON.stringify(todo))
    window.location.reload()
    load_task(task_array)
    load_subtask(task_array)
}


task_array.forEach((task) => {
const todo = JSON.parse(task[1]);
const alert_created_at = new Date().toISOString().split('T')[0]
const seconds = dateTimeToSeconds(todo.alert_date , todo.alert_time)
const created_alerts = dateTimeToSeconds(alert_created_at,'00:00')
  if(seconds && created_alerts)
    {
    showAlert(seconds,created_alerts , task[0] ,todo);
    }
})


function showAlert(time,create_date ,id , todo) {
  setTimeout(function () {
    alert("Complete this task!");
    todo["alert_date"] = ''
    todo["alert_time"] = ''
    localStorage.setItem(id, JSON.stringify(todo))
    window.location.reload()
  }, (time - create_date)*1000);
} 



// Search Functionality

document.getElementById('search').addEventListener('input' , e =>{
  if(e.target.value.trim().length > 0) {
    const foundTasks = task_array.filter(task => JSON.parse(task[1]).task.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1);
    document.getElementById('list').innerHTML = `<h4>TODOS</h4>`

    load_task(foundTasks)
    load_subtask(foundTasks)

}
})