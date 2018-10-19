/* ===================
   Import Node Modules
=================== */
const env = require('./env');
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router();
const mongoose = require('mongoose'); // Node Tool for MongoDB
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const blogs = require('./routes/blogs')(router); // Import Blog Routes
const cors = require('cors');
const port = process.env.PORT || 8080; // Allows heroku to set port
mongoose.Promise = global.Promise;

// Database Connection
mongoose.connect(config.uri, {
  useMongoClient: true,
}, (err) => {
  // Check if database was able to connect
  if (err) {
    console.log('Could NOT connect to database: ', err); // Return error message
  } else {
    console.log('Connected to ' + config.db); // Return success message
  }
});


app.use(cors({
  origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/authentication', authentication);
app.use('/blogs', blogs); // Use Blog routes in application

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});
