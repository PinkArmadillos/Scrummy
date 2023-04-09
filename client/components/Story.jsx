import React from 'react';

export default function Story({ story, fetchCounter }) {

  // MAKE DELTE REQUEST TO DELETE STORY
  function deleteStory(id) {
    fetch(`/api/story/${id}`, {
      method: 'DELETE',
    })
      .then(fetchCounter());
  }

  return (
    <div className="story">
      <p>{story.description}</p>
      <button type="button" onClick={()=>deleteStory(story.id)}>Delete</button>
    </div>
  )
}