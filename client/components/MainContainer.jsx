import React, { useState, useEffect } from 'react';
import Scrumboard from './Scrumboard';
import Forms from './Forms';


export default function MainContainer() {
  const [stories, setStories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [fetchCounter, setFetchCounter] = useState(0);

  // FETCH DATA EVERYTIME COUNTER CHANGES
  useEffect(() => {
    fetch('/api/')
      .then(data => data.json())
      .then(data => {
        console.log(data);
        setStories(data.stories);
        setTasks(data.tasks);
      })
  },[fetchCounter]);

  // FUNCTION TO CHANGE STATE OF FETCHCOUNTER
  const incrementCounter = () => {
    setFetchCounter(fetchCounter + 1);
  }

  // RENDER MAINCONTAINER
  return (
    <div className="mainContainer">
      <Forms fetchCounter={incrementCounter}/>
      <Scrumboard storyList={stories} taskList={tasks} fetchCounter={incrementCounter}/>
    </div>
  )
}