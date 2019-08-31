const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const dbConfig = require('./config/db');
const app = express();
const cors = require('cors');
const port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

require('./app/routes/note.routes.js')(app);
app.listen(process.env.PORT||8000, () => {  console.log('We are live on ' + port);});
