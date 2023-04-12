import React from 'react';
import { useContext } from 'react';
import { dragContext } from './MainContainer';

export default function Story({ story }) {
	const { getData } = useContext(dragContext);
	// MAKE DELTE REQUEST TO DELETE STORY
	function deleteStory(id) {
		console.log('sending deleteStory from Story.jsx');
		fetch(`/api/story/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				getData();
			})
			.catch((err) => {
				console.log({ err: 'Error deleting story' });
			});
	}

	const classes = `story ${story.color}`;

	return (
		<div className={classes}>
			<p>{story.description}</p>
			<button type='button' onClick={() => deleteStory(story.id)}>
				Delete
			</button>
		</div>
	);
}
