'use strict';

var _ = require('lodash');
var Project = require('./project.model');
// var User;

// Get list of projects
exports.index = function(req, res) {
  Project.find(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.json(200, projects);
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.find(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  Project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.json(201, project);
  });

  // create a project
  // Project.create(req.body, function(err, project) {
  //   var projectId = project._id;

  //   // find a user that created that project
  //   User.findById(req.body, function(err, user) {

  //     // push the projectId to user.projects and save the updated user
  //     user.projects.push(projectId);
  //     user.save(function(err, user) {
  //       return res.json(201, user);
  //     });
  //   });
  // });




  //
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  console.log("got to update in projects");
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

exports.updateMeetings = function(req, res) {
  console.log("start of update meetings: req:", req.body);
  console.log("start of update meetings: req_id:", req.body._id);
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    console.log("req:", req.body);
    console.log("project", project);
    project.meetingNotes.push(req.body.meetingNotes);
    project.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}