const File = require('./../models/fileModel');
const MongoClient = require('mongodb').MongoClient;

const fileController = {};

fileController.createFile = (req, res, next) => {
  const file = new File(req.body);

  //find object with correct username in database, create a file schema & push into files array
  MongoClient.connect('mongodb://dana:CS2016@ds029456.mlab.com:29456/boardroomdb', (err, db) => {
    console.log('Connected with MongoDB');
      db.collection('users').findOne({
    
      }, (err) => console.log(err));
    
  };

  file.save(function(err){
    if (err) throw err;
    console.log('File created!');
    next();
  });
};


fileController.getFile = (req, res, next) => {
	File.find({}, function(err, docs){
    if (err) {
      throw err;
    } else {
      res.files = docs;
      console.log('res.files: ', res.files);
      next();
    }
  });
};

module.exports = fileController;