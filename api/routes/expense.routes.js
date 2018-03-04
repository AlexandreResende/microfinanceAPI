
const express = require('express');
const router = express.Router();

const {
  getAllExpenses,
  insertExpenses,
  updateExpenses,
  removeExpenses,
} = require('../controllers/expense.controller');

router.get('/:userId/expenses', getAllExpenses);

router.post('/:userId/expenses', insertExpenses);

router.put('/:userId/expenses/:expenseId', updateExpenses);

router.delete('/:userId/expenses/:expenseId', removeExpenses);

module.exports = router;
