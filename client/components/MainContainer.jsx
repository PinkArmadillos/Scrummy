import React, { useState, useEffect } from 'react';
import Scrumboard from './Scrumboard';
import Forms from './Forms';

export default function MainContainer() {
	const [stories, setStories] = useState([]);
	const [tasks, setTasks] = useState([]);

	// FETCH DATA EVERYTIME COUNTER CHANGES
	useEffect(() => {
		getData();
	}, []);

	function getData() {
		fetch('/api/')
			.then((data) => data.json())
			.then((data) => {
				setStories(data.stories);
				setTasks(data.tasks);
			})
			.catch((err) => {
				console.log({ err: 'Error fetching task and story data' });
			});
	}

	// RENDER MAINCONTAINER
	return (
		<div className='mainContainer'>
			<Forms getData={getData} storyList={stories} />
			<Scrumboard storyList={stories} taskList={tasks} getData={getData} />
		</div>
	);
}
