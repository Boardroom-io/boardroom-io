const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema = new Schema({
  author: { type: String, required: true, unique: true }, 
  pathName: { type: String, required: true, unique: true } //, 
});

const File = mongoose.model('File', fileSchema);

module.exports = File;


