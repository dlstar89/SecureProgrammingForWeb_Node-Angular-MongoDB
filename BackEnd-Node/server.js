/** Required packages */
let express = require('express');
let app = express();
let config = require('config');
let middleware = require('./app/middleware/middlewatesetup');

middleware.setup(app);

// apply routes to the server
require('./app/routes/_routes').setup(app);

app.get('/', (req, res, err) => {
  res.status(200).json({ message: 'ok' });
});

// error message for unauthorized access
app.use(function (err, req, res, next) {
  // if (err.name === 'UnauthorizedError') {
  if (err.status === 401) {
    res.status(err.status);
    res.json({
      'message': err.name + ': ' + err.message
    });
  }
});

/** Start Server */
let port = process.env.PORT || config.port;
app.listen(port);
console.log('Server running on http://localhost:' + port);

module.exports = app;
