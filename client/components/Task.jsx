import React from 'react';

export default function Task( { task, fetchCounter }) {

  // MAKE PATCH REQUEST TO UPDATE TASK STATUS
  function changeStatus(newStatus) {
    console.log('sending PATCH changeStatus from Task.jsx');
    fetch('/api/task', {
      method: 'PATCH',
      body: JSON.stringify({
        status: newStatus,
        task_id: task.id
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(() => {
        console.log('back in changeStatus in Task.jsx');
        fetchCounter();
      })
      .catch(err => {
        console.log({ err: 'Error updating task status' });
      });
  }

  // MAKE DELTE REQUEST TO DELETE TASK
  function deleteTask(id) {
    console.log('sending DELETE deleteTask from Task.jsx');
    fetch(`/api/task/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('back in deleteTask of Task.jsx');
        fetchCounter();
      })
      .catch(err => {
        console.log({ err: 'Error deleting task' });
      });
  }

  const classes = `task ${task.color}`;

  // RENDER TASK COMPONENT
  return (
    <div className={classes}>
      <p><span class="task-label">Task</span>{task.description}</p>
      <p><span class="task-label">Name</span>{task.name}</p>
      <p><span class="task-label">Difficulty</span>{task.difficulty}</p>
      <select onChange={(e)=>changeStatus(e.target.value)}>
        <option value="" hidden>Change status</option>
        <option value="backlog">Backlog</option>
        <option value="todo">To Do</option>
        <option value="inProgress">In Progress</option>
        <option value="toVerify">To Verify</option>
        <option value="done">Done</option>
      </select>
      <button type="button" onClick={()=>deleteTask(task.id)}>Delete</button>
    </div>
  )
}