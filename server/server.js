const path = require('path');
const express = require('express');

const app = express();

const router = require('./routes');

const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', router);



/**
 * 404 handler
 */
app.use((req, res) => {
  console.log('We are in the catch all error handler');
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, ()=> { console.log(`Listening on port ${PORT}...`); });

module.exports = app;