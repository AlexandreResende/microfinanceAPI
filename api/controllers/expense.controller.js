const dbConnection = require('../../config/database');
const ExpenseDAO = require('../model/ExpenseDAO');
const ObjectId = require('mongodb').ObjectId;


module.exports.getAllExpenses = (req, res) => {
  let expenseDAO = new ExpenseDAO(dbConnection.getDb());
  expenseDAO.getAllExpenses(req, res);
};

module.exports.insertExpenses = (req, res) => {
  let expenseInfo = {
    ownerId: ObjectId(req.params.userId),
    month: parseInt(req.body.month),
    year: parseInt(req.body.year),
    value: - parseFloat(req.body.value),
    description: req.body.description
  };

  let expenseDAO = new ExpenseDAO(dbConnection.getDb());
  expenseDAO.insertExpenses(req, res, expenseInfo);

};

module.exports.updateExpenses = (req, res) => {
  let expenseId = {
    _id: ObjectId(req.params.expenseId)
  };
  let updateInfo = req.body;

  let expenseDAO = new ExpenseDAO(dbConnection.getDb());
  expenseDAO.updateExpenses(req, res, expenseId, updateInfo);
};

module.exports.removeExpenses = (req, res) => {
  let expenseId = {
    _id: ObjectId(req.params.expenseId)
  };

  let expenseDAO = new ExpenseDAO(dbConnection.getDb());
  expenseDAO.removeExpenses(req, res, expenseId);
};
