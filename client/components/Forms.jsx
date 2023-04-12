import { useContext, useState } from 'react';
import React from 'react';
import { dragContext } from './MainContainer';

export default function Forms({ storyList }) {
	const [taskDesc, setTaskDesc] = useState('');
	const [taskOwner, setTaskOwner] = useState('');
	const [taskDiff, setTaskDiff] = useState('');
	const [taskColor, setTaskColor] = useState('');
	const [storyDesc, setStoryDesc] = useState('');
	const [storyColor, setStoryColor] = useState('');
	const { getData } = useContext(dragContext);

	function addTask(event) {
		event.preventDefault();
		fetch('/api/task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				taskDesc,
				taskOwner,
				taskDiff,
				taskColor,
				status: 'to-do',
			}),
		})
			.then(() => {
				setTaskDesc('');
				setTaskOwner('');
				setTaskDiff('');
				setTaskColor('');
				document.querySelector('#add-task').reset();
				getData();
			})
			.catch((err) => {
				console.log({ err: 'Error adding task' });
			});
	}

	function addStory(event) {
		event.preventDefault();
		fetch('/api/story', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				storyDesc,
				storyColor,
			}),
		})
			.then(() => {
				setStoryColor('');
				setStoryDesc('');
				document.querySelector('#add-story').reset();
				getData();
			})
			.catch((err) => {
				console.log({ err: 'Error adding story' });
			});
	}

	// ARRAY OF STORY DESCRIPTIONS
	const descArr = [];
	// iterate through storyList
	for (const story of storyList) {
		const shortDescription = story.description.slice(0, 20);
		const optionKey = `desc${story.id}`;
		descArr.push(
			<option key={optionKey} value={story.color}>
				{shortDescription}
			</option>
		);
	}

	return (
		<div className='forms'>
			<form id='add-story' onSubmit={addStory}>
				<h3>New Story</h3>
				<label htmlFor='story-desc'>Description</label>
				<textarea
					id='story-desc'
					name='story-desc'
					onChange={(e) => setStoryDesc(e.target.value)}></textarea>
				<select onChange={(e) => setStoryColor(e.target.value)}>
					<option value='' hidden>
						Choose Color
					</option>
					<option value='r215g188b200'>Thistle</option>
					<option value='r98g150b119'>Zomp</option>
					<option value='r163g206b241'>Uranian Blue</option>
					<option value='r242g149b89'>Atomic Tangerine</option>
					<option value='r232g225b155'>Vanilla</option>
				</select>
				<input id='submit-story' type='submit' value='Add Story' />
			</form>

			<form id='add-task' onSubmit={addTask}>
				<h3>New Task</h3>
				<label htmlFor='task-desc'>Description</label>
				<textarea
					id='task-desc'
					name='task-desc'
					onChange={(e) => setTaskDesc(e.target.value)}></textarea>
				<select onChange={(e) => setTaskColor(e.target.value)}>
					<option value='' hidden>
						Choose Story
					</option>
					{descArr}
				</select>
				<label htmlFor='task-owner'>Task Owner</label>
				<input
					id='task-owner'
					name='task-owner'
					type='text'
					onChange={(e) => setTaskOwner(e.target.value)}></input>
				<label htmlFor='task-diff'>Difficulty</label>
				<input
					id='task-diff'
					name='task-diff'
					type='number'
					onChange={(e) => setTaskDiff(e.target.value)}></input>
				<input type='submit' value='Add Task' id='submit-task' />
			</form>
		</div>
	);
}
