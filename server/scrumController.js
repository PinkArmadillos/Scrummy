const db = require('./scrumBoardModel');
const express = require('express');

const scrumController = {};


// GET STORIES
scrumController.getStories = (req, res, next) => {
  const stories = 'SELECT * FROM story';
  console.log('inside getStories')

  db
    .query(stories)
    .then(data => {
      res.locals.stories = data.rows;
      // const parsed = JSON.parse(data.rows)
      console.log(data.rows)
      return next();
    })
    .catch(e => console.error(e.stack));
};


// GET TASKS
scrumController.getTasks = (req, res, next) => {
  const tasks = 'SELECT * FROM task';

  db
    .query(tasks)
    .then(data => {
      res.locals.tasks = data.rows;
      console.log(data.rows)
      return next();
    })
    .catch(e => console.error(e.stack));
};


// ADD TASK
scrumController.postTask = (req, res, next) => {
  const { 
    description, 
    difficulty, 
    status, 
    story_id
  } = req.body; 

  const newTask = `INSERT INTO task (description, difficulty, status, story_id) VALUES ($1, $2, $3, $4)`; 
  const task = [description, difficulty, status, story_id];

  db 
    .query(newTask, task)
    .then(data => {
      console.log(`inside of postTask: ${data}`)
      // JSON.stringify(data.rows); 
      return next(); 
    })
    .catch(e => console.error(e.stack));
}


// ADD STORY
scrumController.postStory = (req, res, next) => {
  const { description, color } = req.body; 
  const values = [description, color]; 
  const storyString = `INSERT INTO story (description, color) VALUES ($1, $2)`;

  db 
    .query(storyString, values)
    .then(data => {
      console.log(data);
      return next(); 
    })
    .catch(err => {
      const errorObj = {
        log: 'scrumController.postStory middleware error',
        status: 501,
        message: 'Add story failed'
      };
      return next(errorObj);
    });
};


// UPDATE TASK STATUS
scrumController.updateTask = (req, res, next) => {
  const { status, task_id} = req.body;
  const values = [ status, task_id ];
  const queryString = `UPDATE task SET status = $1 WHERE id = $2`;

  db.query(queryString, values)
    .then(data => {
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'scrumController.updateTask middleware error',
        status: 501,
        message: 'Update task failed'
      };
      return next(errorObj);
    });
}


// DELETE TASK
scrumController.deleteTask = (req, res, next) => {
  const id = req.params.id;
  const values = [id];
  const queryString = `DELETE FROM task WHERE id = $1`;

  db.query(queryString, values)
    .then(data => {
      console.log(data);
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'scrumController.deleteTask middleware error',
        status: 501,
        message: 'Delete task failed'
      };
      return next(errorObj);
    })
}

module.exports = scrumController;