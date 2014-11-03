/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Meetingnotes = require('./meetingNotes.model');

exports.register = function(socket) {
  Meetingnotes.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Meetingnotes.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('meetingNotes:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('meetingNotes:remove', doc);
}