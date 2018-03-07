
class UserDAO {
  constructor(connectio) {
    this._connection = connection;
  }

  signUp(req, res, userInfo) {
    let isUsernameRegistered;
    let isEmailRegistered;
    let userSearch = this._connection.collection('user');
    let username = {
      username: userInfo.username
    };
    let email = {
      email: userInfo.email
    };
  
    isUsernameRegistered = new Promise((resolve, reject) => {
      userSearch.findOne(username, (err, userResult) => {
        if (err || userResult !== null){
          reject(`Username already being used.`);
        }
        resolve();
      });
    });
  
    isEmailRegistered = new Promise((resolve, reject) => {
      userSearch.findOne(email, (err, emailResult) => {
        if (err || emailResult !== null){
          reject(`Email already being used.`);
        }
        resolve();
      });
    });
  
    Promise
      .all([isUsernameRegistered, isEmailRegistered])
      .then((values) => {
        userSearch.insert(userInfo, (err, userInsertResult) => {
          let username = userInfo.username;
          let id = userInsertResult.ops[0]._id;
          if (err){
            console.log(err);
            return res.status(500).send({
              error: err
            });
          }
    
          //resource created
          return res.status(201).send({
            ok: `User signed up successfully.`,
            userInfo: {
              id: id, 
              username: username
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({
          error: err
        });
      });
  }

  authenticate(req, res, userInfo) {
    let isUserRegistered;
    let userSearch = this._connection.collection('user');
    console.log(JSON.stringify(userInfo));

    isUserRegistered = new Promise((resolve, reject) => {
      userSearch.findOne(userInfo, (err, userResult) => {
        if (err){
          reject(err);
        } else if (userResult === null){
          reject(`User not found or user does not exist.`);
        }
        resolve(userResult);
      });
    });

    isUserRegistered
      .then((user) => {
        //creating session for a authenticated user
        req.session.authenticated = true;
        req.session.userId = user._id; 

        //redirect to the logged page - still dont have it
        return res.status(200).send({
          msg:'teste json'
        });

      })
      .catch((err) => {
        return res.status(404).send({
          error: err, 
        });
      });
  }
}

module.exports = UserDAO;

/* function UserDAO(connection) {
  this._connection = connection;
}

UserDAO.prototype.signUp = function(req, res, userInfo) {
  let isUsernameRegistered;
  let isEmailRegistered;
  let userSearch = this._connection.collection('user');
  let username = {
    username: userInfo.username
  };
  let email = {
    email: userInfo.email
  };

  isUsernameRegistered = new Promise((resolve, reject) => {
    userSearch.findOne(username, (err, userResult) => {
      if (err || userResult !== null){
        reject(`Username already being used.`);
      }
      resolve();
    });
  });

  isEmailRegistered = new Promise((resolve, reject) => {
    userSearch.findOne(email, (err, emailResult) => {
      if (err || emailResult !== null){
        reject(`Email already being used.`);
      }
      resolve();
    });
  });

  Promise
  .all([isUsernameRegistered, isEmailRegistered])
  .then((values) => {
    userSearch.insert(userInfo, (err, userInsertResult) => {
      let username = userInfo.username;
      let id = userInsertResult.ops[0]._id;
      if (err){
        console.log(err);
        return res.status(500).send({
          error: err
        });
      }

      //resource created
      return res.status(201).send({
        ok: `User signed up successfully.`,
        userInfo: {
          id: id, 
          username: username
        }
      });
    });
  })
  .catch((err) => {
    console.log(err);
    return res.status(500).send({
      error: err
    });
  });
}

UserDAO.prototype.authenticate = function(req, res, userInfo){
  let isUserRegistered;
  let userSearch = this._connection.collection('user');
  console.log(JSON.stringify(userInfo));

  isUserRegistered = new Promise((resolve, reject) => {
    userSearch.findOne(userInfo, (err, userResult) => {
      if (err){
        reject(err);
      } else if (userResult === null){
        reject(`User not found or user does not exist.`);
      }
      resolve(userResult);
    });
  });

  isUserRegistered
  .then((user) => {
    //creating session for a authenticated user
    req.session.authenticated = true;
    req.session.userId = user._id; 

    //redirect to the logged page - still dont have it
    return res.status(200).send({
      msg:'teste json'
    });

  })
  .catch((err) => {
    return res.status(404).send({
      error: err, 
    });
  });
} */