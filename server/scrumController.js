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

// VERIFY USER LOGIN
scrumController.verifyUser = (req, res, next) => {
	const { username, password } = req.body;
	const values = [username]
	const queryString = `
	SELECT * FROM "public"."user"
	WHERE username = $1`;

	db.query(queryString, values)
	.then((data) => {
		console.log('data in verifyUser: ', data)
		console.log(data.rows[0].username)
		const dbUser = data.rows[0].username
		const dbPass = data.rows[0].password
		if (!dbUser) {
			const errorObj = {
				log: 'User does not exists',
				status: 501,
				message: 'Username and/or Password is incorrect and/or does not exist',
			};
			return next(errorObj);
		}
		if (dbPass !== password) {
			const errorObj = {
				log: 'Password is incorrect but user exists',
				status: 501,
				message: 'Username and/or Password is incorrect and/or does not exist',
			};
			return next(errorObj);
		}
		if (dbPass === password) {
			console.log(`Successfully found ${dbUser} in the database through verifyUser`)
			const userObj = {
				exists: true,
				user_id: data.rows[0].id,
				username: dbUser
			}
			res.locals.user = userObj;
			return next();
		}
})
	.catch((err) => {
		console.log('we in VerifyUser')

		const errorObj = {
			log: `scrumController.verifyUser middleware error ${err.message}`,
			status: 501,
			message: 'Login failed',
		};
		return next(errorObj);
	});
}

scrumController.getTeams = (req, res, next) => {
	const { user } = res.locals;
	const values = [user.user_id]
	const queryString = `
	SELECT t.id, t.team_name
	FROM "public"."userTeam" ut INNER JOIN "public"."team" t
	ON ut.user_id = $1 AND ut.team_id = t.id`

	db.query(queryString, values)
		.then((data) => {

		user.userTeams = data.rows

		console.log('data in getTeams', user.userTeams);
		return next();
	})
	.catch((err) => {
		console.log('we in getTeams')
		return next(err);
	})
}

// scrumController.createUser = (req, res, next) => {
// 	const { username, password } = req.body;
// 	const values = [username]
// 	const queryString = `
// 	SELECT * FROM "public"."user"
// 	WHERE username = $1`

// 	db.query(queryString, values)
// 	.then((data) => {
// 		console.log('create user data', data.rows)

// 		// const dbUser = data.rows[0].username
// 		// const dbPass = data.rows[0].password

// 		// console.log('dbUser: ', dbUser, 'dbPass: ', dbPass)
// 		if(data.rows != []) {
// 			console.log('user is already in the data base')
// 			next(err);
// 		}
// 		if (data.rows === []) {
// 			console.log('username is good to go')
// 		const user = {
// 			username: dbUser,
// 			password: dbPass
// 		}
// 		res.locals.user = user;
// 		next();
// 	}
// 	}).catch((err) => {
// 		next(err);
// 	})
// 	next();
// }

module.exports = scrumController;
