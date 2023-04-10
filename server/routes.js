const express = require('express'); 

const router = express.Router();

const controller = require('./scrumController'); 
// get tasks
router.get('/', controller.getStories, controller.getTasks, (req, res) => {
  const result = {
    stories: res.locals.stories,
    tasks: res.locals.tasks
  };
  res.status(200).json(result);
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