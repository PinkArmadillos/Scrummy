import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Story from './Story';
import Task from './Task';

export default function Scrumboard({ storyList, taskList, getData }) {
	// TASKS BY STATUS
	const backlogTasks = [];
	const todoTasks = [];
	const inProgTasks = [];
	const toVerifyTasks = [];
	const doneTasks = [];

	// DIVIDE TASKS BY STATUS
	for (const el of taskList) {
		if (el.status === 'backlog') {
			backlogTasks.push(<Task key={el.id} task={el} getData={getData} />);
		} else if (el.status === 'todo') {
			todoTasks.push(<Task key={el.id} task={el} getData={getData} />);
		} else if (el.status === 'inProgress') {
			inProgTasks.push(<Task key={el.id} task={el} getData={getData} />);
		} else if (el.status === 'toVerify') {
			toVerifyTasks.push(<Task key={el.id} task={el} getData={getData} />);
		} else if (el.status === 'done') {
			doneTasks.push(<Task key={el.id} task={el} getData={getData} />);
		}
	}

	// POPULATE ARRAY OF STORY COMPONENTS
	const stories = [];
	for (const el of storyList) {
		stories.push(<Story key={el.id} story={el} getData={getData} />);
	}

	// RENDER SCRUMBOARD
	return (
		<Droppable droppableId='scrumboard'>
			{(provided) => (
		<div className='scrumboard' {...provided.droppableProps} ref={provided.innerRef}>
			<div id='backlog' className='column'>
				<h3>Backlog</h3>
				<hr />
				<Draggable>
				{backlogTasks}
				</Draggable>
			</div>
			<div id='stories' className='column'>
				<h3>Stories</h3>
				<hr />
				{stories}
			</div>
			<div id='todo' className='column'>
				<h3>To Do</h3>
				<hr />
				{todoTasks}
			</div>
			<div id='inProgress' className='column'>
				<h3>In Progress</h3>
				<hr />
				{inProgTasks}
			</div>
			<div id='toVerify' className='column'>
				<h3>To Verify</h3>
				<hr />
				{toVerifyTasks}
			</div>
			<div id='done' className='column'>
				<h3>Done</h3>
				<hr />
				{doneTasks}
			</div>
		</div>
		)}
		</Droppable>
	);
}
