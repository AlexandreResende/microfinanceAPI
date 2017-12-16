//exporting database connection object

const MongoClient = require('mongodb').MongoClient;

let _db;

module.exports = {
  connect: function(callback){
    MongoClient.connect('mongodb://localhost:27017/microfinance', (err, db) => {
      _db = db;
      return callback(err);
    });
  },

  getDb: function(){
    return _db;
  }
};