
const ObjectId = require('mongodb').ObjectId;

class ExpenseDAO {
  constructor(connection) {
    this._connection = connection;
  }

  getAllExpenses(req, res) {
    let getExpenses;
    let userId = {
      ownerId: req.params.userId
    };

    let expensesColl = this._connection.collection('expenses');

    getExpenses = new Promise((resolve, reject) => {
      expensesColl.find(userId).toArray((err, userExpensesResult) => {
        if (err){
          reject(err);
        }
        resolve(userExpensesResult);
      });
    });

    getExpenses
      .then((userExpensesResult) => {
        res.status(200).send({msg: `Returned all Expenses successfully`, result: userExpensesResult});
      })
      .catch((err) => {
        res.status(500).send({error: `An error occurred.`});
      });
  }

  insertExpenses(req, res, expenseInfo) {
    let insertExpenses;
    let expensesColl = this._connection.collection('expenses'); 

    insertExpenses = new Promise((resolve, reject) => {
      expensesColl.insert(expenseInfo, (err, insertResult) => {
        if (err){
          reject(err);
        }
        resolve(insertResult.ops[0]);
      });   
    });

    insertExpenses
      .then((insertResult) => {
        return res.status(201).send({msg: `Expense inserted`, result: insertResult});
      })
      .catch((err) => {
        return res.status(500).send({error: `An error occurred. ${JSON.stringify(err)}`});
      });
  }

  updateExpenses(req, res, expenseId, updateInfo) {
    let updateExpense;
    let expensesColl = this._connection.collection('expenses');

    console.log(expenseId);
    console.log(updateInfo);

    updateExpense = new Promise((resolve, reject) => {
      expensesColl.update(expenseId, {$set: updateInfo}, (err, updateResult) => {
        if (err){
          reject(err);
        }
        resolve(updateResult);
      });
    });

    updateExpense
      .then((updateResult) => {
        return res.status(200).send({msg: `Expense updated`, result: updateResult});
      })
      .catch((err) => {
        return res.status(500).send({error: `An error occurred. ${err}`});
      });
  }

  removeExpenses(req, res, ExpenseId) {
    let removeExpenses;
    let expensesColl = this._connection.collection('expenses');
  
    removeExpenses = new Promise((resolve, reject) => {
      expensesColl.remove(ExpenseId, (err, removeResult) => {
        if (err){
          reject(err);
        }
        resolve(removeResult);
      });
    });
  
    removeExpenses
      .then((removeResult) => {
        return res.status(200).send({msg: `Expense removed`, result: removeResult});
      })
      .catch((err) => {
        return res.status(500).send({error: `An error occurred. ${err}`});
      });
  }
}

module.exports = ExpenseDAO;

/* 
function ExpenseDAO(connection){
  this._connection = connection;
}

ExpenseDAO.prototype.getAllExpenses = function(req, res){
  let getExpenses;
  let userId = {
    ownerId: req.params.userId
  };

  let expensesColl = this._connection.collection('expenses');

  getExpenses = new Promise((resolve, reject) => {
    expensesColl.find(userId).toArray((err, userExpensesResult) => {
      if (err){
        reject(err);
      }
      resolve(userExpensesResult);
    });
  });

  getExpenses
  .then((userExpensesResult) => {
    res.status(200).send({msg: `Returned all Expenses successfully`, result: userExpensesResult});
  })
  .catch((err) => {
    res.status(500).send({error: `An error occurred.`});
  });
}

ExpenseDAO.prototype.insertExpenses = function(req, res, expenseInfo){
  let insertExpenses;
  let expensesColl = this._connection.collection('expenses'); 

  insertExpenses = new Promise((resolve, reject) => {
    expensesColl.insert(expenseInfo, (err, insertResult) => {
      if (err){
        reject(err);
      }
      resolve(insertResult.ops[0]);
    });   
  });

  insertExpenses
  .then((insertResult) => {
    return res.status(201).send({msg: `Expense inserted`, result: insertResult});
  })
  .catch((err) => {
    return res.status(500).send({error: `An error occurred. ${JSON.stringify(err)}`});
  });
}

ExpenseDAO.prototype.updateExpenses = function(req, res, expenseId, updateInfo){
  let updateExpense;
  let expensesColl = this._connection.collection('expenses');

  console.log(expenseId);
  console.log(updateInfo);

  updateExpense = new Promise((resolve, reject) => {
    expensesColl.update(expenseId, {$set: updateInfo}, (err, updateResult) => {
      if (err){
        reject(err);
      }
      resolve(updateResult);
    });
  });

  updateExpense
  .then((updateResult) => {
    return res.status(200).send({msg: `Expense updated`, result: updateResult});
  })
  .catch((err) => {
    return res.status(500).send({error: `An error occurred. ${err}`});
  });
}

ExpenseDAO.prototype.removeExpenses = function(req, res, ExpenseId){
  let removeExpenses;
  let expensesColl = this._connection.collection('expenses');

  removeExpenses = new Promise((resolve, reject) => {
    expensesColl.remove(ExpenseId, (err, removeResult) => {
      if (err){
        reject(err);
      }
      resolve(removeResult);
    });
  });

  removeExpenses
  .then((removeResult) => {
    return res.status(200).send({msg: `Expense removed`, result: removeResult});
  })
  .catch((err) => {
    return res.status(500).send({error: `An error occurred. ${err}`});
  });
} */