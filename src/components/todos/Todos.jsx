import React, { useReducer } from 'react'
import './todos.css'

const events = {
  Add: "add",
  Update : "update",
  Delete : "delete"
}

const initialValue = [
  {
    id : 1,
    task : "Learn React"
  }
]

const Todos = () => {
  const [todos,dispatch] = useReducer(reducer, initialValue)

  function reducer(state, action){
    switch(action.type){
      case events.Add:
        return [...state,{id:Date.now(), task:action.payload}]        
      case events.Update:
        return state.map(todo=> todo.id == action.payload.id ? {...todo, task:action.payload.updatedTask} : todo)
      case events.Delete:
        return state.filter(todo=> todo.id !== action.payload)
      return state
    }
  }

  return (
    <div className='container'>
      <h1>Todos</h1>
      <div>
        <label htmlFor='task'>Add Task </label>
        <input id="task" onKeyDown={(e)=>{
          if(e.key ==="Enter"){
            dispatch({type:"add", payload:e.target.value})
            e.target.value = ''; 
          }
        }} />
      </div>
      <div className='task-list'>
        <ul>
          {
            todos.map(todo=>(
              <li key={todo.id}>
                <span>{todo.task}</span>
                <button className='update' onClick={()=>{
                  const updatedTask = prompt("enter task", todo.task)
                  if(updatedTask !== null)
                   dispatch({type:"update", payload:{id: todo.id, updatedTask : updatedTask}})
                }}>Update</button>
                <button className='delete' onClick={()=>{
                  dispatch({type:"delete", payload:todo.id})
                }}>Delete</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default Todos