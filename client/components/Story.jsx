import React from 'react';

export default function Story({ story, fetchCounter }) {

  // MAKE DELTE REQUEST TO DELETE STORY
  function deleteStory(id) {
    console.log('sending deleteStory from Story.jsx');
    fetch(`/api/story/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('back in deleteStory in Story.jsx');
        fetchCounter();
      })
      .catch(err => {
        console.log({ err: 'Error deleting story' });
      });
  }

  const classes = `story ${story.color}`

  return (
    <div className={classes}>
      <p>{story.description}</p>
      <button type="button" onClick={()=>deleteStory(story.id)}>Delete</button>
    </div>
  )
}