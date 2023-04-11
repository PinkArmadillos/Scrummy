// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');
const db = require('./scrumBoardModel')
const SALT_WORK_FACTOR = 10;

const teamController = {};

teamController.create = (req, res, next) => {
  console.log('inside password');
  console.log(req.body);

  const createTeam = (team) => {
    return bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(team.password, salt);
      })
      .then(hash => {
        team.password = hash;
        const string = `INSERT INTO team (teamname, password) VALUES ($1, $2)`;
        const value = [team.teamname, hash];
        db.query(string, value)
        return next();
      })
      .then(result => {
        return result;
      })
      .catch(error => {
        console.error('Error creating team:', error);
        throw error;
      });
  }
  createTeam(req.body);
}


teamController.login = async (req, res, next) => {
  console.log("received from frontend :", req.body.password);

  const { teamname, password } = req.body;
  if (!teamname || !password) {
    return next('missing username or password in teamController.login');
  }

  const queryString = `SELECT * FROM team WHERE teamname = $1`;
  const values = [teamname];

  db.query(queryString, values)
    .then(data => {
      console.log(data.rows[0])
      // if (data && data.length > 0) {
      const user = data.rows[0];
      bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) {

            res.redirect('/');
          } else {
            console.log("there is a match!");
            res.locals.user = user;
            return next();
          }
        })
        .catch(err => {
          res.redirect('/');
          return next('Error in teamController.login: ' + JSON.stringify(err));
        });
    })
    .catch(err => {
      console.log('Error in teamController.login:', err);
      res.redirect('/');
      return next('Error in teamController.login: ' + JSON.stringify(err));
    });
};


// Usage of createteam function to save a new team


module.exports = teamController; // export the createteam function for use in other modules


// const createTeam = (team) => {
