const path = require('path');
const express = require('express');

const app = express();

const router = require('./routes');

const PORT = 3000;


// app.use(express.static('../uploads'));
/* handle request for static files? */
// app.use(express.static(path.resolve(__dirname, './client')))


app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', router);
/**
* --- Express Routes ---
* Express will attempt to match these routes in the order they are declared here.
* If a route handler / middleware handles a request and sends a response without
* calling `next()`, then none of the route handlers after that route will run!
* This can be very useful for adding authorization to certain routes...
*/


/**
 * 404 handler
 */
app.use((req, res) => {
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