const dbConnection = require('../../config/database');
const UserDAO = require('../model/UserDAO');

module.exports.signUp = (req, res) => {
  let userInfo = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  let user;

  req.check('username','Username can not be empty.').notEmpty();
  req.check('password', 'Password can not be empty.').notEmpty();
  req.check('email', 'E-mail can not be empty.').notEmpty();
  
  req
  .getValidationResult()
  .then(result => {
    if (!result.isEmpty()) {
      return res.render('error', {
        validation: `${result.array()}`, 
        ok: ``, 
        error: `${result.array()}`, 
        userInfo: ``,
      });
    }

    //calling the model
    user = new UserDAO(dbConnection.getDb());
    user.signUp(req, res, userInfo);

  });  

}

module.exports.login = (req, res) => {
  let userInfo = {
    email: req.body.email,
    password: req.body.password
  };
  let user;

  req.check('email', 'Username can not be empty.').notEmpty();
  req.check('password', 'Password can not be empty.').notEmpty();

  req
  .getValidationResult()
  .then(result => {
    if (!result.isEmpty()) {
      return res.render('error', {
        validation: `${result.array()}`, 
        ok: ``, 
        error: `${result.array()}`, 
        userInfo: ``,
      });
    }

    //calling the model
    user = new UserDAO(dbConnection.getDb());
    user.authenticate(req, res, userInfo);

  });  
};
