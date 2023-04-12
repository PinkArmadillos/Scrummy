import React, { useState, useEffect, createContext, useContext } from 'react';
import Scrumboard from './Scrumboard';
import Forms from './Forms';

export const onDrag = createContext(null);
export const handleonDragOver= createContext(null);
export const handleonDrop = createContext(null);




export default function MainContainer() {
	const [stories, setStories] = useState([]);
	const [tasks, setTasks] = useState([]);
  const [dragid,setDragId] = useState(0);



	function newDragStatus(newStatus) {
		fetch('/api/task', {
			method: 'PATCH',
			body: JSON.stringify({
				status: newStatus,
				task_id: dragid,
			}),
      headers:{
        'Content-type': 'application/json',
      }
    })
    .then(() => {
      getData();
    })
    .catch((err) => {
      console.log({err: 'Error updating task status'});
    })
  }




  


	// FETCH DATA EVERYTIME COUNTER CHANGES
	useEffect(() => {
		getData();
	}, []);



  async function handleOnDrag(e) {
    console.log("target", e)
    await setDragId(e.target.id)
  }

  function handleDragOver(e){
    e.preventDefault();
  }



  function handleDrop(e) {
    
    const id = !e.target.id ? e.currentTarget.id : e.target.id

    newDragStatus(id);
  }


	function getData() {
		fetch('/api/')
			.then((data) => data.json())
			.then((data) => {
				console.log(data, 'this is the response from server');
				setStories(data.stories);
				setTasks(data.tasks);
			})
			.catch((err) => {
				console.log({ err: 'Error fetching task and story data' });
			});
	}

	// RENDER MAINCONTAINER
	return (
    <handleonDrop.Provider value={handleDrop}>
    <handleonDragOver.Provider value={handleDragOver} >
    <onDrag.Provider value = {handleOnDrag}>
      <div className='mainContainer'>
        <Forms getData={getData} storyList={stories} />
        <Scrumboard storyList={stories} taskList={tasks} getData={getData} />
      </div>
    </onDrag.Provider>
    </handleonDragOver.Provider>
    </handleonDrop.Provider>

	);
}
