import { useState } from 'react';
import React from 'react';

import Story from './Story';
import Task from './Task';

export default function Scrumboard(props) {
  const [items, setItems] = useState([]);
  // state
    // tasks array
    // stories array
    

  // fetch request to server to populate task and stories array
  

  function displayTasks(array) {
    const backlogTasks = [];
    const stories = [];
    const todoTasks = [];
    const inProgTasks = [];
    const toVerifyTasks = [];
    const doneTasks = [];

    for (const el of array) {
      if (el.status === 'backlog') {
        backlogTasks.push(<Task task={el}/>)
      } else if (el.status === 'stories') {
        stories.push(<Story story={el}/>)
      } else if (el.status === 'todo') {
        todoTasks.push(<Story story={el}/>)
      } else if (el.status === 'inProgress') {
        inProgTasks.push(<Story story={el}/>)
      } else if (el.status === 'toVerify') {
        toVerifyTasks.push(<Story story={el}/>)
      } else if (el.status === 'done') {
        doneTasks.push(<Story story={el}/>)
      }
    }
  }

  return (
    <div className="scrumboard">
      <div id="backlog" className="column">
        <h3>Backlog</h3>
        
      </div>
      <div id="stories" className="column">
        <h3>Stories</h3>
        <Story/>
      </div>
      <div id="todo" className="column">
        <h3>To Do</h3>
        <Task/>
      </div>
      <div id="inProgress" className="column">
        <h3>In Progress</h3>
        
      </div>
      <div id="toVerify" className="column">
        <h3>To Verify</h3>
        
      </div>
      <div id="done" className="column">
        <h3>Done</h3>
        
      </div>
    </div>
  )
}