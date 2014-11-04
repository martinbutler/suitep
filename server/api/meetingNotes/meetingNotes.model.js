'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeetingnotesSchema = new Schema({
  user: String,
  notes: String,
  projectName: String
});

module.exports = mongoose.model('Meetingnotes', MeetingnotesSchema);