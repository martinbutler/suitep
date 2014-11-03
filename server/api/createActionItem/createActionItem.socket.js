/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Createactionitem = require('./createActionItem.model');

exports.register = function(socket) {
  Createactionitem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Createactionitem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('createActionItem:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('createActionItem:remove', doc);
}