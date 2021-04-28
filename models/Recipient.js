const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false,
  },
});

// here for a subdocument we simply export it
module.exports = recipientSchema;
