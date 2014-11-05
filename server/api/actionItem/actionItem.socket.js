/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Actionitem = require('./actionItem.model');

exports.register = function(socket) {
  Actionitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Actionitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('actionItem:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('actionItem:remove', doc);
}