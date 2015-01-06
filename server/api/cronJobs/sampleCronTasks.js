var CronJob = require('cron').CronJob;
var Actionitem = require('../actionItem/actionItem.model');
var Contact = require('../contact/contact.model');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var User = require('../user/user.model');
var Project = require('../project/project.model');

// var jobA = new CronJob({
//   cronTime: '10 * * * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('Job A: You will see this message every time the seconds are equal to 10 (i.e 11:17:10). The date/time is ' + now);
//   },
//   start: true,
//   timeZone: "America/New_York"
// });

// var jobB = new CronJob({
//   cronTime: '*/15 * * * * *',
//   onTick: function() {
//     var now = new Date();
//     // console.log('jobH:', jobH);
//     console.log('Job B: you will see this message at the quarter minute. The date/time is ' + now);
//   },
//   start: true,
//   timeZone: "America/New_York"
// });

// var jobC = new CronJob({
//   cronTime: '1-5 * * * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('Job C: you will this message every time the seconds are equal to 1,2,3,4 and 5. The date/time is ' + now);
//   },
//   start: true,
//   timeZone: "America/New_York"
// });

// var jobD = new CronJob({
//   cronTime: '6-10 * * * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('Job D: you should see this message every time the seconds are equal 6, 7, 8, 9, and 10 but will stop early. The date/time is ' + now);
//   },
//   start: true,
//   timeZone: "America/New_York",
//   onComplete: function() {
//     console.log('*****************someone stop me, Job D!');
//   }
// });

// var jobE = new CronJob({
//   cronTime: '8 * * * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('Job E: will stop job D when the seconds are eaqual to 8. The date/time is ' + now);
//     jobD.stop();
//   },
//   start: true,
//   timeZone: "America/New_York"
// });

// var jobE2 = new CronJob({
//   cronTime: '15 * * * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('Job E2: will start job D when the seconds are eaqual to 15. The date/time is ' + now);
//     jobD.start();
//   },
//   start: true,
//   timeZone: "America/New_York"
// });


// var jobF = new CronJob({
//   cronTime: '0 11 17 * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('Job F: forces New York time zone. The date/time is ' + now);
//   },
//   start: true,
//   timeZone: "America/New_York"
// });

// var jobG = new CronJob({
//   cronTime: '0 11 14 * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('Job G: forces Los_Angeles time zone. The date/time is ' + now);
//   },
//   start: true,
//   timeZone: "America/Los_Angeles"
// });

// var jobH = new CronJob({
//   cronTime: '0 34 9 * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('jobH:', jobH); 
//     console.log('Job H: no time zone. it will default to the server time. The date/time is ' + now);
//   },
//   start: true
// });

// var jobI = new CronJob({
//   cronTime: '25 * * * * *',
//   onTick: function() {
//     var now = new Date();
//     console.log('this:', this);
//     console.log('Job I: Set context. The date/time is ' + now);
//   },
//   start: true,
//   context: {hello: 'world'}
// });

var hitcount = 2;

var jobJ = new CronJob({
  cronTime: '31,34,38,42 * * * * *',
  onTick: function() {
    var now = new Date();
    console.log('JobJ this:', this.JamesB);
    console.log('Job J: changing context. The date/time is ' + now);
    console.log(jobJ);
    // jobJ.cronTime = '31,24,28,42,44 * * * * *';
  },
  start: true,
  context: {JamesB: 'hit me ' + (hitcount++) + ' times' }
});


var jobK = new CronJob({
  cronTime: '32,36,40 * * * * *',
  onTick: function() {
    var now = new Date();
    jobJ.context = {JamesB: 'hit me ' + (hitcount++) + ' times' };
    console.log('Job K: pass context to Job J. The date/time is ' + now);
  },
  start: true
});
