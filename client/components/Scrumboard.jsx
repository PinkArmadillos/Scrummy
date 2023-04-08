import React from 'react';

export default function Scrumboard(props) {

  return (
    <div className="scrumboard">
      <div id="backlog" classname="column">
        <h3>Backlog</h3>
      </div>
      <div id="stories" classname="column">
        <h3>Stories</h3>
      </div>
      <div id="todo" classname="column">
        <h3>To Do</h3>
      </div>
      <div id="inProgress" classname="column">
        <h3>In Progress</h3>
      </div>
      <div id="toVerify" classname="column">
        <h3>To Verify</h3>
      </div>
      <div id="done" classname="column">
        <h3>Done</h3>
      </div>
    </div>
  )
}