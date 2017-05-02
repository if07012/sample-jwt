var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Booking = mongoose.model('Booking');
var jwt = require('jsonwebtoken');
var currentApp = undefined;
module.exports = function (app) {
  currentApp = app;
  app.use('/api/Booking/', router);
};

router.post('/', function (req, res) {
  currentApp.verify(req, res, function (information) {
    var id = "";
    User.findOne({
      'userName': information.userName
    }, function (err, user) {})
  });
  var booking = new Booking({
    CityDestination: req.body.CityDestination,
    BookingDate: req.body.BookingDate,
    TravelDate: req.body.TravelDate,
    BookingStatus: req.body.BookingStatus,
    CityOrigin: req.body.CityOrigin,
    User: user
  });

  
  // save the sample user
  booking.save(function (err, booking) {
    if (err) throw err;


    res.json({
      success: true,
      booking: booking
    });
  });
});
router.get('/', function (req, res) {
  currentApp.verify(req, res, function (information) {
    var id = "";
    User.findOne({
      'userName': information.userName
    }, function (err, user) {
      Booking.find({
        'User._id': id
      }, function (err, bookings) {
        res.json(bookings);
      });
    })

  });

});
