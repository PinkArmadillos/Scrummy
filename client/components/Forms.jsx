import { useState } from 'react';
import React from 'react';

export default function Forms({ fetchCounter }) {
  const [ taskDesc, setTaskDesc ] = useState('');
  const [ taskOwner, setTaskOwner ] = useState('');
  const [ taskDiff, setTaskDiff ] = useState('');
  const [ storyDesc, setStoryDesc ] = useState('')


  function addTask(event) {
    event.preventDefault();
    fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/Json'
      },
      body: JSON.stringify({
        taskDesc,
        taskOwner,
        taskDiff
      }),
    })
    .then(res => res.json())
    .then(response => {
      console.log("task added: ", response)
    })
    .catch(err => {
      console.log({err: 'addTask error'})
    })
  }

  function addStory(event) {
    event.preventDefault();
    fetch('/api/addStory', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/Json'
      },
      body: JSON.stringify({
        storyDesc
      }),
    })
    .then(res => res.json())
    .then(response => {
      console.log("story added: ", response)
    })
    .catch(err => {
      console.log({err: 'addStory error'})
    })
  }

  return (
    <div className="forms">
      <form id="add-task" onSubmit={addTask}>
        <h3>New Task</h3>
        <label htmlFor="task-desc">Description:</label>
        <textarea id="task-desc" name="task-desc" onChange={(e)=>setTaskDesc(e.target.value)}></textarea>
        <label htmlFor="task-owner">Task Owner:</label>
        <input id="task-owner" name="task-owner" type="text" onChange={(e)=>setTaskOwner(e.target.value)}></input>
        <label htmlFor="task-diff">Difficulty:</label>
        <input id="task-diff" name="task-diff" type="number" onChange={(e)=>setTaskDiff(e.target.value)}></input>
        <input type="submit" value="Add Task" id="submit-task" onSubmit={addTask}/>
      </form>

      <form id="add-story" onSubmit={addStory}>
        <h3>New Story</h3>
        <label htmlFor="story-desc">Description:</label>
        <textarea id="story-desc" name="story-desc" onChange={(e)=>setStoryDesc(e.target.value)}></textarea>
        <input id="submit-story" type="submit" value="Add Story" onSubmit={addStory}/>
      </form>
      
    </div>
  )
}