import { useState } from 'react';
import React from 'react';

export default function Forms() {
  const [ taskDesc, setTaskDesc ] = useState('');
  const [ taskOwner, setTaskOwner ] = useState('');
  const [ taskDiff, setTaskDiff ] = useState('');
  const [ storyDesc, setStoryDesc ] = useState('')

  function addTask(event) {
    event.preventDefault();
    fetch('/api/addTask', {
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
    <div class="forms">
      <form id="add-task" onSubmit={addTask}>
        <textarea id="task-description" onChange={(e)=>setTaskDesc(e.target.value)}></textarea>
        <input type="text" id='task-owner' onChange={(e)=>setTaskOwner(e.target.value)}></input>
        <input type="number" id="task-diff" onChange={(e) => setTaskDiff(e.target.value)}></input>
        <input type="submit" value="Add Task" id="submit-task"/>
      </form>

      <form id="add-story" onSubmit={addStory}>
        <textarea id="story-description" onChange={(e) => setStoryDesc(e.target.value)}></textarea>
        <input id="submit-story" type="submit" value="Add Story"/>
      </form>
      
    </div>
  )
}