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
  res.sendStatus(200); 
})

// update task
router.patch('/task', controller.updateTask, (req, res) => {
  return res.status(200).end('Updated task')
})


module.exports = router;