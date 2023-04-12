import React, { useState, useEffect, createContext, useContext } from 'react';
import Story from './Story';
import Task from './Task';
import {handleonDrop} from './MainContainer';
import {handleonDragOver} from './MainContainer';



export default function Scrumboard({ storyList, taskList, getData }) {
	// TASKS BY STATUS
const handleDrop = useContext(handleonDrop);
const handleDragOver = useContext(handleonDragOver); 

	const backlogTasks = [];
	const todoTasks = [];
	const inProgTasks = [];
	const toVerifyTasks = [];
	const doneTasks = [];

  
	// const hello = taskList[1]
	// console.log("id?", hello.id)
	// DIVIDE TASKS BY STATUS
	for (const el of taskList) {
    // console.log(el)
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
		stories.push(<Story  key={el.id} story={el} getData={getData} />);
	}

  // const Arr = [backlogTasks,todoTasks,inProgTasks,toVerifyTasks,doneTasks,stories]
  // for(let i = 0; i<Arr.length; i++){
  //   Arr[i].push(<div className='drag' key= 'hello' onDrop= {handleDrop} onDragOver={handleDragOver} ></div>)
  // }


	// RENDER SCRUMBOARD
	return (

		<div className='scrumboard'>
			<div id='backlog' className='column' onDrop= {handleDrop} onDragOver={handleDragOver} >
				<h3>Backlog</h3>
				<hr />
				{backlogTasks}
			</div>
			<div id='stories' className='column' onDrop= {handleDrop} onDragOver={handleDragOver} >
				<h3>Stories</h3>
				<hr />
				{stories}
			</div>
			<div id='todo' className='column' onDrop= {handleDrop} onDragOver={handleDragOver} >
				<h3>To Do</h3>
				<hr />
				{todoTasks}
			</div>
			<div id='inProgress' className='column' onDrop= {handleDrop} onDragOver={handleDragOver} >
				<h3>In Progress</h3>
				<hr />
				{inProgTasks}
			</div>
			<div id='toVerify' className='column' onDrop= {handleDrop} onDragOver={handleDragOver} >
				<h3>To Verify</h3>
				<hr />
				{toVerifyTasks}
			</div>
			<div id='done' className='column' onDrop= {handleDrop} onDragOver={handleDragOver} >
				<h3>Done</h3>
				<hr />
				{doneTasks}
			</div>
		</div>

	);
}
