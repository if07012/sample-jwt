var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  faker = require('faker'),
  User = mongoose.model('User');
var jwt = require('jsonwebtoken');

var currentApp = undefined;
module.exports = function (app) {
  currentApp = app;

  app.use('/api/User/', router);
};

router.get('/setup', function (req, res, next) {
  // create a sample user
  var nick = new User({
    userName: "admin",
    password: "admin",
    imageUrl: faker.image.imageUrl(),
    address: faker.address.streetName(),
    admin: true
  });

  // save the sample user
  nick.save(function (err, user) {
    if (err) throw err;
  });
  for (var i = 0; i < 10; i++) {
    nick = new User({
      userName: faker.internet.userName(),
      password: faker.internet.password(),
      imageUrl: faker.image.imageUrl(),
      address: faker.address.streetName(),
      admin: false
    });

    // save the sample user
    nick.save(function (err, user) {
      if (err) throw err;



    });
  }
  res.json({
    success: true,
    user: {

    }
  });
});
router.get('/:userName*?', function (req, res) {
  currentApp.verify(req, res, function (information) {
    var name = req.params.userName;
    if (name === undefined)
      name = "";
    console.log(name);
    User.find({
      userName: new RegExp("^"+ name, "i")
    }, function (err, users) {
      res.json(users);
    });
  });


});
router.get('/reset', function (req, res) {
  User.find({}, function (err, users) {
    User.remove(users, function (err, user) {
      res.json({
        success: true,
        message: 'Reset user',
        users: users
      });
    })

  });


});

router.post('/authenticate', function (req, res) {
  console.log(req.body);
  // find the user
  User.findOne({
    userName: req.body.userName
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        code: 404,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          code: 401,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign({
          Username: user.userName,
          Password: user.password
        }, 'j4s4medik4');

        // return the information including token as JSON
        setTimeout(function () {
          res.json({
            success: true,
            code: 200,
            message: 'Enjoy your token!',
            token: token
          });
        }, 2000);

      }

    }

  });
});
