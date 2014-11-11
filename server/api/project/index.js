'use strict';

var express = require('express');
var controller = require('./project.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.put('/updateMeeting/:id', controller.updateMeetings);
router.put('/updateActionItem/:id', controller.updateActions);
router.get('/contacts/:id', controller.getContacts);
// router.get('/userProjects/:id', controller.getUserProjects);
router.get('/actions/:id', controller.getActions);
router.get('/user/:id', controller.getUser);

module.exports = router;