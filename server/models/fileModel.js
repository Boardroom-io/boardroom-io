const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fileSchema = new Schema({
  fileName: { type: String, required: true, unique: true } 
});

const File = mongoose.model('File', fileSchema);

module.exports = File;


