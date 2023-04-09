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
      console.log(`inside of postStory: ${data}`)
      JSON.stringify(data.rows); 
      return next(); 
    })
    .catch(e => console.error(e.stack));

}; 

// UPDATE TASK STATUS
scrumController.updateTask = (req, res, next) => {

}

module.exports = scrumController;

// starWarsController.addCharacter = (req, res, next) => {
//   // write code here
//   const {
//     name, 
//     gender, 
//     species_id, 
//     birth_year, 
//     eye_color, 
//     skin_color, 
//     hair_color, 
//     mass, 
//     height, 
//     homeworld_id
//   } = req.body;
//   const newChar = 'INSERT INTO people(name, gender, species_id, birth_year, eye_color, skin_color, hair_color, mass, height, homeworld_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
//   const people = [name, gender, species_id, birth_year, eye_color, skin_color, hair_color, mass, height, homeworld_id];
//   db
//     .query(newChar, people)
//     .then(data => {
//       console.log('working')
//       res.locals = JSON.stringify(data.rows);
//       return next();
//     })
//     .catch(e => console.error(e.stack));
//   // next();
// };
