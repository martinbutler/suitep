'use strict';

var _ = require('lodash');
var Sendmail = require('./sendMail.model');
var nodemailer = require('nodemailer');

// Get list of sendMails
exports.index = function(req, res) {
  Sendmail.find(function (err, sendMails) {
    if(err) { return handleError(res, err); }
    return res.json(200, sendMails);
  });
};

// Get a single sendMail
exports.show = function(req, res) {
  Sendmail.findById(req.params.id, function (err, sendMail) {
    if(err) { return handleError(res, err); }
    if(!sendMail) { return res.send(404); }
    return res.json(sendMail);
  });
};

// Creates a new sendMail in the DB.
// exports.create = function(req, res) {
//   Sendmail.create(req.body, function(err, sendMail) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, sendMail);
//   });
// };
exports.create = function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'suiteproductivity@gmail.com',
        pass: 'simple!123'
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: req.body.name + ' ✔ ★ ' + req.body.replyTo,  // 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
      replyTo: req.body.replyTo,  // 'martinebutler@gmail.com',
      to: 'martinebutler@gmail.com', // list of receivers
      subject: req.body.projectName.name + ' ✔ ★',  // '✔ ' + req.body.projectName, // Subject line
      // text: 'Hello world ✔', // plaintext body
      html: req.body.content //'<b>Hello world ✔</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
          return res.json(info.response);
      }
  });
   // return res.json(201, sendMail);
};

exports.sendTask = function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'suiteproductivity@gmail.com',
        pass: 'simple!123'
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: req.body.name + ' ★ ' + req.body.replyTo,  // 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
      replyTo: req.body.replyTo,  // 'martinebutler@gmail.com',
      to: req.body.ownerEmail, // list of receivers
      subject: ' ★ ' + 'Task Assignment for: ' + req.body.projectName,  // '✔ ' + req.body.projectName, // Subject line
      // text:   // plaintext body
      text: 'Hello ' + req.body.owner + ',\n\nProject: ' + req.body.projectName + '\nAction Item: ' 
            + req.body.title +':\nDescription: ' + req.body.description + '\n\nDue Date: ' + Date(req.body.dueDate) 
            + '\n\nProvide an update: http://localhost:9000/updateTask/' + req.body.actItemID //'<b>Hello world ✔</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
          return res.json(info.response);
      }
  });
   // return res.json(201, sendMail);
};

exports.sendUpdate = function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'suiteproductivity@gmail.com',
        pass: 'simple!123'
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: req.body.owner + ' ★ ' + req.body.ownerEmail,  // 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
      replyTo: req.body.ownerEmail,  // 'martinebutler@gmail.com',
      to: req.body.userEmail, // list of receivers
      subject: ' ★ ' + 'Task Update for: ' + req.body.projectName,  
      text: 'Hello ' + req.body.user + ',\n\nProject: ' + req.body.projectName + '\nAction Item: ' 
            + req.body.title +':\nDescription: ' + req.body.description + '\n\nDue Date: ' + Date(req.body.dueDate) 
            + '\n\n' + req.body.user  + ' prodived the follwoing update:\n     ' + req.body.updateTxt //'<b>Hello world ✔</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
          return res.json(info.response);
      }
  });
   // return res.json(201, sendMail);
};

// Updates an existing sendMail in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sendmail.findById(req.params.id, function (err, sendMail) {
    if (err) { return handleError(res, err); }
    if(!sendMail) { return res.send(404); }
    var updated = _.merge(sendMail, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, sendMail);
    });
  });
};

// Deletes a sendMail from the DB.
exports.destroy = function(req, res) {
  Sendmail.findById(req.params.id, function (err, sendMail) {
    if(err) { return handleError(res, err); }
    if(!sendMail) { return res.send(404); }
    sendMail.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}