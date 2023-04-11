import React, { useState, useEffect } from 'react';
import Scrumboard from './Scrumboard';
import Forms from './Forms';


export default function MainContainer() {
  const [stories, setStories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [fetchCounter, setFetchCounter] = useState(0);

  // FETCH DATA EVERYTIME COUNTER CHANGES
  useEffect(() => {
    fetch('/')
      .then(data => data.json())
      .then(data => {
        setStories(data.stories);
        setTasks(data.tasks);
      })
      .catch(err => {
        console.log({ err: 'Error fetching task and story data' });
      })
  }, [fetchCounter]);

  // FUNCTION TO CHANGE STATE OF FETCHCOUNTER
  const incrementCounter = () => {
    setFetchCounter(fetchCounter + 1);
  }

  // RENDER MAINCONTAINER
  return (
    <div className="mainContainer">
      <Forms fetchCounter={incrementCounter} storyList={stories} />
      <Scrumboard storyList={stories} taskList={tasks} fetchCounter={incrementCounter} />
    </div>
  )
}