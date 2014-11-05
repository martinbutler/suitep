'use strict';

var _ = require('lodash');
var Actionitem = require('./actionItem.model');

// Get list of actionItems
exports.index = function(req, res) {
  Actionitem.find(function (err, actionItems) {
    if(err) { return handleError(res, err); }
    return res.json(200, actionItems);
  });
};

// Get a single actionItem
exports.show = function(req, res) {
  Actionitem.findById(req.params.id, function (err, actionItem) {
    if(err) { return handleError(res, err); }
    if(!actionItem) { return res.send(404); }
    return res.json(actionItem);
  });
};

// Creates a new actionItem in the DB.
exports.create = function(req, res) {
  Actionitem.create(req.body, function(err, actionItem) {
    if(err) { return handleError(res, err); }
    return res.json(201, actionItem);
  });
};

// Updates an existing actionItem in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Actionitem.findById(req.params.id, function (err, actionItem) {
    if (err) { return handleError(res, err); }
    if(!actionItem) { return res.send(404); }
    var updated = _.merge(actionItem, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, actionItem);
    });
  });
};

// Deletes a actionItem from the DB.
exports.destroy = function(req, res) {
  Actionitem.findById(req.params.id, function (err, actionItem) {
    if(err) { return handleError(res, err); }
    if(!actionItem) { return res.send(404); }
    actionItem.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}