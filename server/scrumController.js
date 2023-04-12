const db = require('./scrumBoardModel');
const express = require('express');

const scrumController = {};

// GET STORIES
scrumController.getStories = (req, res, next) => {

	const queryStr = 'SELECT * FROM story';

	db.query(queryStr)
		.then((data) => {
			res.locals.stories = data.rows;
			return next();
		})
		.catch((err) => {
			const errorObj = {
				log: 'scrumController.getStories middleware error',
				status: 501,
				message: 'Unable to fetch stories',
			};
			return next(errorObj);
		});
};

// GET TASKS
scrumController.getTasks = (req, res, next) => {

	const queryStr = 'SELECT * FROM task';

	db.query(queryStr)
		.then((data) => {
			res.locals.tasks = data.rows;
			return next();
		})
		.catch((err) => {
			const errorObj = {
				log: 'scrumcontroller.getTasks middleware error',
				status: 501,
				message: 'Unable to fetch tasks',
			};
			return next(errorObj);
		});

};

// ADD TASK
scrumController.postTask = (req, res, next) => {
	const { taskDesc, taskDiff, taskOwner, taskColor } = req.body;
	const values = [taskDesc, taskDiff, taskOwner, taskColor, 'backlog'];
	const queryString = `
  INSERT INTO task (description, difficulty, name, color, status)
  VALUES ($1, $2, $3, $4, $5)`;

	db.query(queryString, values)
		.then((data) => {
			return next();
		})
		.catch((err) => {
			const errorObj = {
				log: 'scrumController.postTask middleware error',
				status: 501,
				message: 'Add task failed',
			};
			return next(errorObj);
		});
};

// ADD STORY
scrumController.postStory = (req, res, next) => {
	const { storyDesc, storyColor } = req.body;
	const values = [storyDesc, storyColor];
	const storyString = `INSERT INTO story (description, color) VALUES ($1, $2)`;

	db.query(storyString, values)
		.then((data) => {
			return next();
		})
		.catch((err) => {
			const errorObj = {
				log: 'scrumController.postStory middleware error',
				status: 501,
				message: 'Add story failed',
			};
			return next(errorObj);
		});
};

// UPDATE TASK STATUS
scrumController.updateTask = (req, res, next) => {
	const { status, task_id } = req.body;
	const values = [status, task_id];
	const queryString = `UPDATE task SET status = $1 WHERE id = $2`;

	db.query(queryString, values)
		.then((data) => {
			return next();
		})
		.catch((err) => {
			const errorObj = {
				log: 'scrumController.updateTask middleware error',
				status: 501,
				message: 'Update task failed',
			};
			return next(errorObj);
		});
};

// DELETE TASK
scrumController.deleteTask = (req, res, next) => {
	const id = req.params.id;
	const values = [id];
	const queryString = `DELETE FROM task WHERE id = $1`;

	db.query(queryString, values)
		.then((data) => {
			return next();
		})
		.catch((err) => {
			const errorObj = {
				log: 'scrumController.deleteTask middleware error',
				status: 501,
				message: 'Delete task failed',
			};
			return next(errorObj);
		});
};

// DELETE STORY
scrumController.deleteStory = (req, res, next) => {
	const id = req.params.id;
	const values = [id];
	const queryString = `DELETE FROM story WHERE id = $1`;

	db.query(queryString, values)
		.then((data) => {
			return next();
		})
		.catch((err) => {
			const errorObj = {
				log: 'scrumController.deleteStory middleware error',
				status: 501,
				message: 'Delete story failed',
			};
			return next(errorObj);
		});
};

module.exports = scrumController;
