const express = require('express');
const router = express.Router();

const incomeController = require('../controllers/income.controller');

router.get('/:userId/incomes', incomeController.getAllIncomes);

router.post('/:userId/incomes', incomeController.insertIncomes);

router.put('/:userId/incomes/:incomeId', incomeController.updateIncomes);

router.delete('/:userId/incomes/:incomeId', incomeController.removeIncomes);

router.get('/:userId/monthlyIncome', incomeController.getIncomesCurrentMonth);


module.exports = router;