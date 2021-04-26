const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: Boolean,
});

// here for a subdocument we simply export it
module.exports = recipientSchema;
