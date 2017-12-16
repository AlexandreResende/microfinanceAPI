//configuring the server

const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const helmet = require('helmet');

//importing all the routes of the project
const userRoutes = require('../api/routes/user.routes');
const incomeRoutes = require('../api/routes/income.routes');
const expenseRoutes = require("../api/routes/expense.routes");

const app = express();

//configuring the middlewares into the app
app
  .use(helmet())
  .use(bodyParser.urlencoded({ extended: true}))
  .use(bodyParser.json())
  .use(expressValidator())
  .use(userRoutes)
  .use(incomeRoutes)
  .use(expenseRoutes)

module.exports = app;
