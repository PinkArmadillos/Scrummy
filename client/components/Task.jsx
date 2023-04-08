import React from 'react';

export default function Task(props) {
  return (
    <div className="task">
      <p>Create file</p>
      <p>5</p>
      <p>Pink Armadillo</p>
      <select onChange={props.changeStatus}>
        <option value="backlog">Backlog</option>
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="toVerify">To Verify</option>
        <option value="done">Done</option>
      </select>
    </div>
  )
}