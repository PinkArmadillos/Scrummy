import React, { useState, useEffect } from 'react';
import Scrumboard from './Scrumboard';
import Forms from './Forms';


export default function MainContainer() {
  const [stories, setStories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [fetchCounter, updateFetchCounter] = useState(0);

  // fetch data everytime counter changes
  useEffect(() => {
    fetch('/api/')
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setStories(data.stories);
        setTasks(data.tasks);
      })
  },[fetchCounter]);

  const incrementCounter = () => {
    updateFetchCounter(fetchCounter + 1);
  }

  return (
    <div className="mainContainer">
      <Forms fetchCounter={incrementCounter}/>
      <Scrumboard storyList={stories} taskList={tasks} fetchCounter={incrementCounter}/>
    </div>
  )
}