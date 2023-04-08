import React from 'react';

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
      <div id="backlog" classname="column">
        <h3>Backlog</h3>
        {backlogTasks}
      </div>
      <div id="stories" classname="column">
        <h3>Stories</h3>
        {stories}
      </div>
      <div id="todo" classname="column">
        <h3>To Do</h3>
        {todoTasks}
      </div>
      <div id="inProgress" classname="column">
        <h3>In Progress</h3>
        {inProgTasks}
      </div>
      <div id="toVerify" classname="column">
        <h3>To Verify</h3>
        {toVerifyTasks}
      </div>
      <div id="done" classname="column">
        <h3>Done</h3>
        {doneTasks}
      </div>
    </div>
  )
}