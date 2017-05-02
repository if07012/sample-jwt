// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var KeyValueSchema = new Schema({
  key: String,
  value: String,
  group:String
});

mongoose.model('KeyValue', KeyValueSchema);

