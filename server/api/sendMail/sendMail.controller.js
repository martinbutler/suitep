'use strict';

var _ = require('lodash');
var Sendmail = require('./sendMail.model');

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
exports.create = function(req, res) {
  Sendmail.create(req.body, function(err, sendMail) {
    if(err) { return handleError(res, err); }
    return res.json(201, sendMail);
  });
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