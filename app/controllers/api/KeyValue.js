var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  KeyValue = mongoose.model('KeyValue');
var jwt = require('jsonwebtoken');
var currentApp = undefined;
module.exports = function (app) {
  currentApp = app;
  app.use('/api/Generic/', router);
};

router.get('/data/:group', function (req, res) {
  currentApp.verify(req, res, function () {
    KeyValue.find({
      'group': req.params.group
    }, function (err, users) {
      res.json(users);
    });
  });

});
router.get('/setup', function (req, res, next) {
  var arr = [{
    key: "Select",
    value: "Select",
    group: "departure"
  }, {
    key: "Dipati Ukur",
    value: "Dipati Ukur",
    group: "departure"
  }, {
    key: "Garut",
    value: "Garut",
    group: "departure"
  }, {
    key: "Select",
    value: "Select",
    group: "destination"
  }, {
    key: "Cengkareng",
    value: "Cengkareng",
    group: "destination"
  }, {
    key: "Bekasi",
    value: "Bekasi",
    group: "destination"
  }, {
    key: "Select",
    value: "Select",
    group: "countPassenger"
  }, {
    key: "1 - Person",
    value: "1 - Person",
    group: "countPassenger"
  }, {
    key: "2 - Person",
    value: "2 - Person",
    group: "countPassenger"
  }];
  var count = 0;
  for (var key in arr) {
    if (arr.hasOwnProperty(key)) {
      var element = arr[key];
      var nick = new KeyValue({
        key: element.key,
        value: element.value,
        group: element.group
      });

      // save the sample user
      nick.save(function (err, user) {
        if (err) throw err;
        count++;
        if (count == arr.length)
          res.json({
            success: true
          });
      });
    }
  }

});
