import React from 'react';
import {useContext} from 'react';
import {onDrag} from './MainContainer';


export default function Task({ task, getData }) {
	// MAKE PATCH REQUEST TO UPDATE TASK STATUS

	const handleOnDrag = useContext(onDrag);


	// MAKE DELTE REQUEST TO DELETE TASK
	function deleteTask(id) {
		fetch(`/api/task/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				getData();
			})
			.catch((err) => {
				console.log({ err: 'Error deleting task' });
			});
	}

	const classes = `task ${task.color}`;

	// RENDER TASK COMPONENT
	//
	return (
		<div draggable onDragStart= {(e) => handleOnDrag(e)} id={task.id} className={classes}>
			<p>
				<span class='task-label'>Task</span>
				{task.description}
			</p>
			<p>
				<span class='task-label'>Name</span>
				{task.name}
			</p>
			<p>
				<span class='task-label'>Difficulty</span>
				{task.difficulty}
			</p>
			<button type='button' onClick={() => deleteTask(task.id)}>
				Delete
			</button>
		</div>
	);
}
