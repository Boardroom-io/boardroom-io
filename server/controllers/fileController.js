const File = require('./../models/fileModel');

const fileController = {};

fileController.createFile = (req, res, next) => {
  const file = new File(req.body);
  file.save(function(err){
    if (err) throw err;
    console.log('File created!');
    next();
  });
};

module.exports = fileController;