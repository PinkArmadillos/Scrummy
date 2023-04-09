import React from 'react';

export default function Task( { task, fetchCounter }) {
  return (
    <div className="task">
      <p>{task.description}</p>
      <p>Person</p>
      <p>{task.difficulty}</p>
      <select>
        <option value="backlog">Backlog</option>
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="toVerify">To Verify</option>
        <option value="done">Done</option>
      </select>
      <button type="button">Delete</button>
    </div>
  )
}