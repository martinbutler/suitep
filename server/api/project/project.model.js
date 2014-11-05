'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  meetingNotes: [{ type: Schema.Types.ObjectId, ref: 'Meetingnotes' }],
  actionItems: [{ type: Schema.Types.ObjectId, ref: 'Actionitem' }],
  contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Project', ProjectSchema);