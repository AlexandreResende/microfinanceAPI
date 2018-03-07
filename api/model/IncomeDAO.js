
const ObjectId = require('mongodb').ObjectId;

class IncomeDAO {
  constructor(connection) {
    this._connection = connection;
  }

  getAllIncomes(req, res) {
    let findAllIncomes;
    let userId = {
      ownerId: ObjectId(req.params.userId)
    };
    let incomesColl = this._connection.collection('incomes');
  
    findAllIncomes = new Promise((resolve, reject) => {
      incomesColl.find(userId).toArray((err, userIncomesResult) => {
        if (err) {
          reject(`${err}`);
        }
        resolve(userIncomesResult);
      });
    });
  
    findAllIncomes
      .then((incomes) => {
        return res.status(200).send({msg: `Returned all incomes successfully`, result: incomes});
      })
      .catch((err) => {
        return res.status(500).send({error: `An error occurred. ${err}`});
      });
  }

  insertIncomes(req, res, incomeInfo) {
    let insertIncome;
    let incomesColl = this._connection.collection('incomes'); 
  
    insertIncome = new Promise((resolve, reject) => {
      incomesColl.insert(incomeInfo, (err, insertResult) => {
        if (err){
          reject(err);
        }
        resolve(insertResult.ops[0]);
      }); 
    });
  
    insertIncome
      .then((insertResult) => {
        return res.status(201).render('dashboard', {msg: `Income inserted`, error: ``, result: insertResult.ops[0]});
      })
      .catch((err) => {
        return res.status(500).render('dashboard', {msg: ``, error: `An error occurred. ${err}`});
      });
  
  }

  updateIncomes(req, res, incomeId, updateInfo) {
    let updateIncome;
    let incomesColl = this._connection.collection('incomes');
  
    updateIncome = new Promise((resolve, reject) => {
      incomesColl.update(incomeId, {$set: updateInfo}, (err, updateResult) => {
        if (err){
          reject(err)
        }
        resolve(updateResult);
      });
    });
  
    updateIncome
      .then((updateResult) => {
        return res.status(200).send({msg: `Income updated`, result: updateResult});
      })
      .catch((err) => {
        return res.status(500).send({error: `An error occurred. ${err}`});
      });
  }

  removeIncomes(req, res, incomeId) {
    let removeIncome;
    let incomesColl = this._connection.collection('incomes');
  
    removeIncome = new Promise((resolve, reject) => {
      incomesColl.remove(incomeId, (err, removeResult) => {
        if (err){
          reject(err);
        }
        resolve(removeResult);
      });
    });
  
    removeIncome
      .then((removeResult) => {
        return res.status(200).send({msg: `Income updated`, result: removeResult});
      })
      .catch((err) => {
        return res.status(500).send({error: `An error occurred. ${err}`});
      });
  }

  getIncomesCurrentMonth(req, res) {
    let getIncomes;
    const date = new Date();
    const month = date.getMonth() + 1; //getMonth starts at 0
    const year = date.getFullYear();
    let searchObj = {
      month: month,
      year: year
    };
    let incomesColl = this._connection.collection('incomes');
  
    getIncomes = new Promise((resolve, reject) => {
      incomesColl.find(searchObj).toArray((err, getIncomesResult) => {
        if (err){
          reject(err)
        }
        resolve(getIncomesResult);
      });
    });
  
    getIncomes
      .then((getIncomesResult) => {
        return res.status(200).send({result: findResult});
      })
      .catch((err) => {
        return res.status(500).send({error: `An error occurred. ${err}`});
      });
  
  }
}

module.exports = IncomeDAO;

/* function IncomeDAO(connection){
  this._connection = connection;
}

IncomeDAO.prototype.getAllIncomes = function(req, res){
  let findAllIncomes;
  let userId = {
    ownerId: ObjectId(req.params.userId)
  };
  let incomesColl = this._connection.collection('incomes');

  findAllIncomes = new Promise((resolve, reject) => {
    incomesColl.find(userId).toArray((err, userIncomesResult) => {
      if (err) {
        reject(`${err}`);
      }
      resolve(userIncomesResult);
    });
  });

  findAllIncomes
    .then((incomes) => {
      return res.status(200).send({msg: `Returned all incomes successfully`, result: incomes});
    })
    .catch((err) => {
      return res.status(500).send({error: `An error occurred. ${err}`});
    });
}

IncomeDAO.prototype.insertIncomes = function(req, res, incomeInfo){
  let insertIncome;
  let incomesColl = this._connection.collection('incomes'); 

  insertIncome = new Promise((resolve, reject) => {
    incomesColl.insert(incomeInfo, (err, insertResult) => {
      if (err){
        reject(err);
      }
      resolve(insertResult.ops[0]);
    }); 
  });

  insertIncome
    .then((insertResult) => {
      return res.status(201).render('dashboard', {msg: `Income inserted`, error: ``, result: insertResult.ops[0]});
    })
    .catch((err) => {
      return res.status(500).render('dashboard', {msg: ``, error: `An error occurred. ${err}`});
    });

}

IncomeDAO.prototype.updateIncomes = function(req, res, incomeId, updateInfo){
  let updateIncome;
  let incomesColl = this._connection.collection('incomes');

  updateIncome = new Promise((resolve, reject) => {
    incomesColl.update(incomeId, {$set: updateInfo}, (err, updateResult) => {
      if (err){
        reject(err)
      }
      resolve(updateResult);
    });
  });

  updateIncome
    .then((updateResult) => {
      return res.status(200).send({msg: `Income updated`, result: updateResult});
    })
    .catch((err) => {
      return res.status(500).send({error: `An error occurred. ${err}`});
    });
}

IncomeDAO.prototype.removeIncomes = function(req, res, incomeId){
  let removeIncome;
  let incomesColl = this._connection.collection('incomes');

  removeIncome = new Promise((resolve, reject) => {
    incomesColl.remove(incomeId, (err, removeResult) => {
      if (err){
        reject(err);
      }
      resolve(removeResult);
    });
  });

  removeIncome
    .then((removeResult) => {
      return res.status(200).send({msg: `Income updated`, result: removeResult});
    })
    .catch((err) => {
      return res.status(500).send({error: `An error occurred. ${err}`});
    });
}

IncomeDAO.prototype.getIncomesCurrentMonth = function(req, res){
  let getIncomes;
  const date = new Date();
  const month = date.getMonth() + 1; //getMonth starts at 0
  const year = date.getFullYear();
  let searchObj = {
    month: month,
    year: year
  };
  let incomesColl = this._connection.collection('incomes');

  getIncomes = new Promise((resolve, reject) => {
    incomesColl.find(searchObj).toArray((err, getIncomesResult) => {
      if (err){
        reject(err)
      }
      resolve(getIncomesResult);
    });
  });

  getIncomes
    .then((getIncomesResult) => {
      return res.status(200).send({result: findResult});
    })
    .catch((err) => {
      return res.status(500).send({error: `An error occurred. ${err}`});
    });

} */