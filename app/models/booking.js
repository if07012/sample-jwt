// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookingSchema = new Schema({
  CityDestination: String,
  BookingDate: Date,
  TravelDate: Date,
  BookingStatus: Boolean,
  CityOrigin: String,
  User : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

mongoose.model('Booking', BookingSchema);

