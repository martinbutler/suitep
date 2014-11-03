'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeetingnotesSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Meetingnotes', MeetingnotesSchema);