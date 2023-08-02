import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid'
import DisplayTodo from './displayTodo';

const TodoList = () => {
  const [todos, setTodos] = useState({});
  const [newTodo, setNewTodo] = useState('');
  const [priority , setPriority] = useState('')
  const [category , setCategory] = useState('')
  const [dueDate , setDueDate] = useState('')
  const [tag , setTag] = useState('')
  const [loading , setLoading] = useState('true');
  const [stateStatus , setStateStatus] = useState('Incomplete')


  useEffect(() =>{
    // const data = JSON.parse(JSON.stringify({...localStorage}))
    setTodos(Object.entries({...localStorage}))
    // setTodos(data)
    setLoading(false)
    },[]);


  const Todo = {
    task: newTodo,
    done: false,
    priority: priority,
    category: category,
    dueDate: dueDate,
    tag:tag,
    status:stateStatus,
  };


  const handleAddTodo = () => {
    
    const id = uuid().slice(0,8)
    if (newTodo.trim() !== '') {
      localStorage.setItem(id , JSON.stringify(Todo))
      setNewTodo('');
      setCategory('');
      setDueDate('');
      setTag('');
      setPriority('');
    }
  };


  if(loading)
  return <>loading..</>


  return (
    <div>
      
      <input  type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}  placeholder="Enter task..."/>
      <input  type="date" min="2023/07/31" value={dueDate} onChange={(e) => setDueDate(e.target.value)}  placeholder="Enter Due Date..."/>
      <input  type="text" value={category} onChange={(e) => setCategory(e.target.value)}  placeholder="Enter category..."/>
      <input  type="text" value={tag} onChange={(e) => setTag(e.target.value)}  placeholder="Enter tag..."/>
      <select value={priority} onChange={(e)=>{setPriority(e.target.value)}}>
              <option value="none" defaultChecked >priority...</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
      </select>
      <button onClick={handleAddTodo}>Add</button>

      <div style={{display:'flex',margin:'10px'}}>
            <p>Filters</p>
            <input type="date" />
            <p>to</p><input type="date"/>
            <button >submit</button>
            <input
              type="text"
              placeholder="Category Filter"
            />





            <input
              type="text"
              placeholder="Tag Filter"
            />





            <select >
              <option disabled selected value="none">priority filter</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select >
              <option disabled selected value="none">Sort by...</option>
              <option value="dueDateDec">Due Date Dec</option>
              <option value="dueDateAsc">Due Date Asc</option>
              <option value="priority">priority</option>
            </select>






            <select >
              <option disabled selected value="none">Task Status...</option>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Pending">Pending</option>
            </select>

      </div>
      <DisplayTodo todo = {todos} />



      
    </div>
  );
};

export default TodoList;
