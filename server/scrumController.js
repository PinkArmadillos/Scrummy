const db = require('./scrumBoardModel');
const express = require('express');

const scrumController = {};


// GET STORIES
scrumController.getStories = (req, res, next) => {
  const stories = 'SELECT * FROM story';

  db
    .query(stories)
    .then(data => {
      res.locals.stories = data.rows;
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
      return next();
    })
    .catch(e => console.error(e.stack));
};


// ADD TASK
scrumController.postTask = (req, res, next) => {
  const { taskDesc, taskDiff, taskOwner } = req.body;
  const values = [ taskDesc, taskDiff, taskOwner ];
  const queryString = `
  INSERT INTO task (description, difficulty, name)
  VALUES ($1, $2, $3)`;

  db.query(queryString, values)
    .then(data => {
      return next(); 
    })
    .catch(err => {
      const errorObj = {
        log: 'scrumController.postTask middleware error',
        status: 501,
        message: 'Add task failed'
      };
      return next(errorObj);
    });
}


// ADD STORY
scrumController.postStory = (req, res, next) => {
  const { storyDesc } = req.body; 
  const values = [storyDesc]; 
  const storyString = `INSERT INTO story (description) VALUES ($1)`;

  db.query(storyString, values)
    .then(data => {
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


// DELETE STORY
scrumController.deleteStory = (req, res, next) => {
  const id = req.params.id;
  const values = [id];
  const queryString = `DELETE FROM story WHERE id = $1`;

  db.query(queryString, values)
    .then(data => {
      return next();
    })
    .catch(err => {
      const errorObj = {
        log: 'scrumController.deleteStory middleware error',
        status: 501,
        message: 'Delete story failed'
      };
      return next(errorObj);
    })
}

module.exports = scrumController;