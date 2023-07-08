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
      lists.innerHTML += `<li id="${task[0]}">${task[1]}<button id="${task[0]}" onClick = "getId(this.id)" style="background-color: red;border-radius: 5px;padding: 10px;margin: 10px;font-size: 15px;color: white;" id="delete">Delete</button></li>`
    });
  }

load_task()


document.getElementById("add").addEventListener('click',()=>{
    let task = document.getElementById("task_input").value;
    if(task=='')
        alert('Please add a Task');
    else
    {
        localStorage.setItem(localStorage.length++,task)
        document.getElementById('task_input').value = ''
    }
    window.location.reload()
})

const getId = (id) =>{
    localStorage.removeItem(id);
    window.location.reload();
}