// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: String,
  password: String,
  imageUrl:String,
  address:String
});

mongoose.model('User', UserSchema);

