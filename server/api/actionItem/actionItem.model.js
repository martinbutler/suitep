'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActionitemSchema = new Schema({
  title: String,
  description: String,
  dueDate: Date,
  completed: {type: Boolean, default: false },
  completionDate: Date,
  owner: {type: Schema.Types.ObjectId, ref: 'Contact' },
  updates: [ String, Date ],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  ownerName: String,
  ownerEmail: String
});

module.exports = mongoose.model('Actionitem', ActionitemSchema);