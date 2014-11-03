/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Sendmail = require('./sendMail.model');

exports.register = function(socket) {
  Sendmail.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Sendmail.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('sendMail:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('sendMail:remove', doc);
}