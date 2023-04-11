const express = require('express');

const router = express.Router();
const teamController = require('./teamController');
const controller = require('./scrumController');

// get tasks
router.get('/', controller.getStories, controller.getTasks, (req, res) => {
  const result = {
    stories: res.locals.stories,
    tasks: res.locals.tasks
  };
  res.status(200).json(result);
})

//login your team
router.post('/login', teamController.login, (req, res) => {
  res.redirect('/scrummy');
  // return res.status(200).end('Logged in');
})

//creating a new team
router.post('/create', teamController.create, (req, res) => {
  res.redirect('/scrummy');
  // return res.status(200).end('Team added');
})

// create new task
router.post('/task', controller.postTask, (req, res) => {
  return res.status(200).end('Task added');
})

// create new story
router.post('/story', controller.postStory, (req, res) => {
  return res.status(200).end('Story added');
})

// update task
router.patch('/task', controller.updateTask, (req, res) => {
  return res.status(200).end('Updated task');
})

// delete task
router.delete('/task/:id', controller.deleteTask, (req, res) => {
  return res.status(200).end('Task Deleted');
})

// delete story
router.delete('/story/:id', controller.deleteStory, (req, res) => {
  return res.status(200).end('Story Deleted');
})

module.exports = router;