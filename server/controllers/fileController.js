const File = require('./../models/fileModel');
const MongoClient = require('mongodb').MongoClient;

const fileController = {};

fileController.createFile = (req, res) => {
  const file = new File(req.body);

  //find object with correct username in database, create a file schema & push into files array

  User.findByIdAndUpdate(req.cookies.id, { $push: { "files": file._id } }, (err) => console.log(err));
  file.save(function (err) {
    if (err) {
      res.status(503);
      res.send('file creation failed')
    } else {
      console.log('File created!');
      io.broadcast('element', file);
      res.status(200).send('ok');
    }
  });
};


fileController.getFile = (req, res, next) => {
  File.findById(req.cookies.id, function (err, docs) {
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