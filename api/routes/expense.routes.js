const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense.controller');

router.get('/:userId/expenses', expenseController.getAllExpenses);

router.post('/:userId/expenses', expenseController.insertExpenses);

router.put('/:userId/:expenseId', expenseController.updateExpenses);

router.delete('/:userId/:expenseId', expenseController.removeExpenses);

module.exports = router;
