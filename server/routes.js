const express = require('express'); 

const router = express.Router();

const controller = require('./scrumController'); 
// get tasks
router.get('/', controller.getStories, controller.getTasks, (req, res) => {
  res.sendStatus(200);
})

// create new task
router.post('/task', controller.postTask, (req, res) => {
  res.sendStatus(200); 
})

// create new story
router.post('/story', controller.postStory, (req, res) => {
  res.sendStatus(200); 
})


module.exports = router;