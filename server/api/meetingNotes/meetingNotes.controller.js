'use strict';

var _ = require('lodash');
var Meetingnotes = require('./meetingNotes.model');

// Get list of meetingNotess
exports.index = function(req, res) {
  Meetingnotes.find(function (err, meetingNotess) {
    if(err) { return handleError(res, err); }
    return res.json(200, meetingNotess);
  });
};

// Get a single meetingNotes
exports.show = function(req, res) {
  Meetingnotes.findById(req.params.id, function (err, meetingNotes) {
    if(err) { return handleError(res, err); }
    if(!meetingNotes) { return res.send(404); }
    return res.json(meetingNotes);
  });
};

// Creates a new meetingNotes in the DB.
exports.create = function(req, res) {
  console.log("api/meetings.before create");
  Meetingnotes.create(req.body, function(err, meetingNotes) {
    console.log("api/meetingNotes");
    if(err) { return handleError(res, err); }
    return res.json(201, meetingNotes);
  });
};

// Updates an existing meetingNotes in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Meetingnotes.findById(req.params.id, function (err, meetingNotes) {
    if (err) { return handleError(res, err); }
    if(!meetingNotes) { return res.send(404); }
    var updated = _.merge(meetingNotes, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, meetingNotes);
    });
  });
};

// Deletes a meetingNotes from the DB.
exports.destroy = function(req, res) {
  Meetingnotes.findById(req.params.id, function (err, meetingNotes) {
    if(err) { return handleError(res, err); }
    if(!meetingNotes) { return res.send(404); }
    meetingNotes.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}