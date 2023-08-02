import React, { useState } from "react";

function DisplayTodo({todo}) {

  console.log(todo)
  const [searchTerm, setSearchTerm] = useState('');

  todo.map( (task) => {
    // key --> task[0]
    // todo --> JSON.parse(task[1])

    console.log(JSON.parse(task[1]))
  })

  const handleEditTodo = (index, editedText) => {
    // const updatedTodos = [...todos];
    // updatedTodos[index].text = editedText;
    // setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    // const updatedTodos = todos.filter((_, i) => i !== index);
    // setTodos(updatedTodos);
  };

  const handleMarkDone = (index) => {
    // const updatedTodos = [...todos];
    // updatedTodos[index].done = !updatedTodos[index].done;
    // setTodos(updatedTodos);
  };



  // const filteredTodos = todo.filter((todo) =>
  
  // console.log(todo)
  
  // // todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  // );



  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search todo..."
      />
      <ul>
        {todo.map((task) => (
          <li key={task[0]}>
            <input
              type="checkbox"
              checked={JSON.parse(task[1]).done}
              onChange={() => handleMarkDone(task[0])}
            />
            {todo.done ? <del>{JSON.parse(task[1]).task}</del> : JSON.parse(task[1]).task}
            
            <div style={{background:'Black',color:'white',margin:'5px',padding:'5px'}}>
              Category: <span>{JSON.parse(task[1]).category}</span><br/>
              Tag: <span>{JSON.parse(task[1]).tag}</span><br/>
              Due Date: <span>{JSON.parse(task[1]).dueDate}</span><br/>
              Priority: <span>{JSON.parse(task[1]).priority}</span><br/>
            </div>
            
            
            <button
              onClick={() =>
                handleEditTodo(task[0], prompt("Edit todo:", JSON.parse(task[1]).task))
              }
            >
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(task[0])}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayTodo;
