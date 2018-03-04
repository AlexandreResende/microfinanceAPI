
const express = require('express');
const router = express.Router();

const {
  getAllIncomes,
  insertIncomes,
  updateIncomes,
  removeIncomes,
  getIncomesCurrentMonth,
} = require('../controllers/income.controller');

router.get('/:userId/incomes', getAllIncomes);

router.post('/:userId/incomes', insertIncomes);

router.put('/:userId/incomes/:incomeId', updateIncomes);

router.delete('/:userId/incomes/:incomeId', removeIncomes);

router.get('/:userId/monthlyIncome', getIncomesCurrentMonth);


module.exports = router;
