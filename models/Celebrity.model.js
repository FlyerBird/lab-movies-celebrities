//  Add your code here
const mongoose = require('mongoose');
const { Schema } = mongoose;

const celebritySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  catchPhrase: {
    type: String 
  }
})

const Celebrity = mongoose.model('Celebrity.model', celebritySchema);

module.exports = Celebrity;