const dbConnection = require('../../config/database');
const IncomeDAO = require('../model/incomeDAO');
const ObjectId = require('mongodb').ObjectId;


module.exports.getAllIncomes = (req, res) => {
  let incomeDAO = new IncomeDAO(dbConnection.getDb());
  incomeDAO.getAllIncomes(req, res);
};

module.exports.insertIncomes = (req, res) => {
  let incomeInfo = {
    ownerId: ObjectId(req.params.userId),
    month: parseInt(req.body.month),
    year: parseInt(req.body.year),
    value: parseFloat(req.body.value),
    description: req.body.description
  };


  let incomeDAO = new IncomeDAO(dbConnection.getDb());
  incomeDAO.insertIncomes(req, res, incomeInfo);
};

module.exports.updateIncomes = (req, res) => {
  let incomeId = {
    _id: ObjectId(req.params.incomeId)
  };
  let updateInfo = req.body;

  let incomeDAO = new IncomeDAO(dbConnection.getDb());
  incomeDAO.updateIncomes(req, res, incomeId, updateInfo);
};

module.exports.removeIncomes = (req, res) => {
  let incomeId = {
    _id: ObjectId(req.params.incomeId)
  };

  let incomeDAO = new IncomeDAO(dbConnection.getDb());
  incomeDAO.removeIncomes(req, res, incomeId);
};

module.exports.getIncomesCurrentMonth = (req, res) => {
  let incomeDAO = new IncomeDAO(dbConnection.getDb());
  incomeDAO.getIncomesCurrentMonth(req, res);
};
