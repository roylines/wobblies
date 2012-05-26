var express = require('express');
var connectStreamS3 = require('connect-stream-s3');
var amazon = require('awssum').load('amazon/amazon');
var fs = require('fs');
var exec = require('child_process').exec;
var util = require('util');

var uploads = {}

uploads.initialise = function(app) {    
  app.post('/upload', uploads.upload);
  return app;
};

uploads.upload = function(req, res) {
  var user = req.headers.user;
  if(user == undefined) {
    console.log('missing user');
    return res.send('no user', 404);
  }

  if(req.files == undefined) {
    console.log('missing belly');
    return res.send('no files', 404);
  } else {
    var name = 'uploads/' + user + '_' + req.files.upload.lastModifiedDate.toJSON() + '.jpg';
    console.log('belly received: ' + name);

    exec("mv " + req.files.upload.path + ' ' + name, function(err) {
      if(err) {
        console.log('failed to save: ' + err);
        return res.send('failed to save', 500);
      }

      console.log('file saved');
      res.send();
    });
  }
};

module.exports = uploads;


/*
var access = process.env.WOBBLIES_ACCESS_KEY;
var secret = process.env.WOBBLIES_ACCESS_SECRET;
var account = process.env.WOBBLIES_ACCOUNT;
*/
