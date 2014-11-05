'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name: String,
  email: String,
  Project: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  actionItems: [{  type: Schema.Types.ObjectId, ref: 'Actionitem' }],
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Contact', ContactSchema);