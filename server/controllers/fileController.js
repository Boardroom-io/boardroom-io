const File = require('./../models/fileModel');
const MongoClient = require('mongodb').MongoClient;

const fileController = {};

fileController.createFile = (req, res, next) => {
  const file = new File(req.body);
  
  //find object with correct username in database, create a file schema & push into files array
 
      User.findOneAndUpdate({
        {_id : req.cookies.id},
        {$push: {files: file._id}}
      }, (err) => console.log(err));
    

  // file.save(function(err){
  //   if (err) throw err;
  //   console.log('File created!');
  //   next();
  // });
};


fileController.getFile = (req, res, next) => {
	File.findById(req.cookies.id, function(err, docs){
    if (err) {
      throw err;
    } else {
      //do something to load file names into dropdown
      res.files = docs;
      console.log('res.files: ', res.files);
      next();
    }
  });
};

module.exports = fileController;