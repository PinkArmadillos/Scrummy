import React from 'react';

export default function Task( { task, fetchCounter }) {

  // MAKE PATCH REQUEST TO UPDATE TASK STATUS
  function changeStatus(newStatus) {
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
        fetchCounter();
      })
      .catch(err => {
        console.log({ err: 'Error updating task status' });
      });
  }

  // MAKE DELTE REQUEST TO DELETE TASK
  function deleteTask(id) {
    fetch(`/api/task/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchCounter();
      })
      .catch(err => {
        console.log({ err: 'Error deleting task' });
      });
  }

  // RENDER TASK COMPONENT
  return (
    <div className="task" style={{backgroundColor: task.color}}>
      <p>{task.description}</p>
      <p>{task.name}</p>
      <p>{task.difficulty}</p>
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