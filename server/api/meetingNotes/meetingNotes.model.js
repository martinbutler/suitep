'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MeetingnotesSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  contacts: [ { type: Schema.Types.ObjectId, ref: 'Contact'}, {type: Boolean}],
  notes: String,
  date: Date
});

module.exports = mongoose.model('Meetingnotes', MeetingnotesSchema);