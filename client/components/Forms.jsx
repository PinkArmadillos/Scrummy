import { useState } from 'react';
import React from 'react';

export default function Forms({ fetchCounter, storyList }) {
  const [ taskDesc, setTaskDesc ] = useState('');
  const [ taskOwner, setTaskOwner ] = useState('');
  const [ taskDiff, setTaskDiff ] = useState('');
  const [ taskColor, setTaskColor ] = useState('');
  const [ storyDesc, setStoryDesc ] = useState('');
  const [ storyColor, setStoryColor ] = useState('');


  function addTask(event) {
    event.preventDefault();
    fetch('/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskDesc,
        taskOwner,
        taskDiff,
        taskColor
      }),
    })
    .then(() => {
      fetchCounter();
    })
    .catch(err => {
      console.log({ err: 'Error adding task' });
    });
  }

  function addStory(event) {
    event.preventDefault();
    fetch('/api/story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        storyDesc,
        storyColor
      }),
    })
    .then(()=> {
      setStoryColor('');
      fetchCounter();
    })
    .catch(err => {
      console.log({ err: 'Error adding story' });
    });
  }

  // ARRAY OF STORY DESCRIPTIONS
  const descArr = [];
  // iterate through storyList
  for (const story of storyList) {
    const shortDescription = story.description.slice(0, 20);
    const optionKey = `desc${story.id}`;
    descArr.push(<option key={optionKey} value={story.color}>{shortDescription}</option>);
  }

  return (
    <div className="forms">
      <form id="add-story" onSubmit={addStory}>
        <h3>New Story</h3>
        <label htmlFor="story-desc">Description</label>
        <textarea id="story-desc" name="story-desc" onChange={(e)=>setStoryDesc(e.target.value)}></textarea>
        <select onChange={(e)=>setStoryColor(e.target.value)}>
          <option value="" hidden>Choose Color</option>
          <option value="r213g0b0">Red</option>
          <option value="r6g167b0">Green</option>
          <option value="r163g206b241">Uranian Blue</option>
        </select>
        <input id="submit-story" type="submit" value="Add Story"/>
      </form>

      <form id="add-task" onSubmit={addTask}>
        <h3>New Task</h3>
        <label htmlFor="task-desc">Description</label>
        <textarea id="task-desc" name="task-desc" onChange={(e)=>setTaskDesc(e.target.value)}></textarea>
        <label htmlFor="related-story">Related Story</label>
        <select onChange={(e) => setTaskColor(e.target.value)}>
          {descArr}
        </select>
        <label htmlFor="task-owner">Task Owner</label>
        <input id="task-owner" name="task-owner" type="text" onChange={(e)=>setTaskOwner(e.target.value)}></input>
        <label htmlFor="task-diff">Difficulty</label>
        <input id="task-diff" name="task-diff" type="number" onChange={(e)=>setTaskDiff(e.target.value)}></input>
        <input type="submit" value="Add Task" id="submit-task"/>
      </form>

      
    </div>
  )
}