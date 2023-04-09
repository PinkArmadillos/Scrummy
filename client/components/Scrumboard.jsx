import React from 'react';

import Story from './Story';
import Task from './Task';

export default function Scrumboard({ storyList, taskList, fetchCounter }) {

  // TASKS BY STATUS
  const backlogTasks = [];
  const todoTasks = [];
  const inProgTasks = [];
  const toVerifyTasks = [];
  const doneTasks = [];

  // DIVIDE TASKS BY STATUS
  for (const el of taskList) {
    if (el.status === 'backlog') {
      backlogTasks.push(<Task key={el.id} task={el} fetchCounter={fetchCounter} />)
    } else if (el.status === 'todo') {
      todoTasks.push(<Task key={el.id} task={el} fetchCounter={fetchCounter} />)
    } else if (el.status === 'inProgress') {
      inProgTasks.push(<Task key={el.id} task={el} fetchCounter={fetchCounter} />)
    } else if (el.status === 'toVerify') {
      toVerifyTasks.push(<Task key={el.id} task={el} fetchCounter={fetchCounter} />)
    } else if (el.status === 'done') {
      doneTasks.push(<Task key={el.id} task={el} fetchCounter={fetchCounter} />)
    }
  }

  // POPULATE ARRAY OF STORY COMPONENTS
  const stories = [];
  for (const el of storyList) {
    stories.push(<Story key={el.id} story={el} fetchCounter={fetchCounter} />);
  }

  // RENDER SCRUMBOARD
  return (
    <div className="scrumboard">
      <div id="backlog" className="column">
        <h3>Backlog</h3>
        {backlogTasks}
      </div>
      <div id="stories" className="column">
        <h3>Stories</h3>
        {stories}
      </div>
      <div id="todo" className="column">
        <h3>To Do</h3>
        {todoTasks}
      </div>
      <div id="inProgress" className="column">
        <h3>In Progress</h3>
        {inProgTasks}
      </div>
      <div id="toVerify" className="column">
        <h3>To Verify</h3>
        {toVerifyTasks}
      </div>
      <div id="done" className="column">
        <h3>Done</h3>
        {doneTasks}
      </div>
    </div>
  )
}