'use strict';

var _ = require('lodash');
var Createactionitem = require('./createActionItem.model');

// Get list of createActionItems
exports.index = function(req, res) {
  Createactionitem.find(function (err, createActionItems) {
    if(err) { return handleError(res, err); }
    return res.json(200, createActionItems);
  });
};

// Get a single createActionItem
exports.show = function(req, res) {
  Createactionitem.findById(req.params.id, function (err, createActionItem) {
    if(err) { return handleError(res, err); }
    if(!createActionItem) { return res.send(404); }
    return res.json(createActionItem);
  });
};

// Creates a new createActionItem in the DB.
exports.create = function(req, res) {
  Createactionitem.create(req.body, function(err, createActionItem) {
    if(err) { return handleError(res, err); }
    return res.json(201, createActionItem);
  });
};

// Updates an existing createActionItem in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Createactionitem.findById(req.params.id, function (err, createActionItem) {
    if (err) { return handleError(res, err); }
    if(!createActionItem) { return res.send(404); }
    var updated = _.merge(createActionItem, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, createActionItem);
    });
  });
};

// Deletes a createActionItem from the DB.
exports.destroy = function(req, res) {
  Createactionitem.findById(req.params.id, function (err, createActionItem) {
    if(err) { return handleError(res, err); }
    if(!createActionItem) { return res.send(404); }
    createActionItem.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}