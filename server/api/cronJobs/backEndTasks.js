var CronJob = require('cron').CronJob;
var Actionitem = require('../actionItem/actionItem.model');
var Contact = require('../contact/contact.model');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var User = require('../user/user.model');
var Project = require('../project/project.model');

var job = new CronJob({
  cronTime: '* * 5 * * *',
  onTick: function() {
    console.log('Job: You will see this message once a Day');

    Actionitem.find(function (err, actionItems) {
      if(err) { return handleError(res, err); }
      // return res.json(200, actionItems);
      var currentTime = new Date();

      actionItems.forEach(function(obj) {

        var actionItemTitle = obj.title;
        var actionItemDescription = obj.description;


        if (!obj.completed && (((obj.dueDate - currentTime)/(1000 * 3600 *24)) < 1)) {

          Contact.findById(obj.owner, function (err, contact) {
            if(err) { return handleError(res, err); }
            // if(!contact) { return res.send(404); }
            // return res.json(contact);
            var ownerName = contact.name;
            var ownerEmail = contact.email;
            Project.findById(obj.project, function (err, project) {
              if(err) {return handleError(res, err); }
              var userEmail = project.userEmail;
              var projectName = project.name;

              var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'suiteproductivity@gmail.com',
                    pass: 'simple!123'
                }
              });

              // setup e-mail data with unicode symbols
              var mailOptions = {
                  from: userEmail,  // 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
                  replyTo: userEmail,  // 'martinebutler@gmail.com',
                  to: ownerEmail, // list of receivers
                  subject: '★REMINDER★: Task Due Tomorrow', 
                  text: 'Hello ' + ownerName +',' + '\n\nProject: ' + projectName
                        + '\nTitle: ' + actionItemTitle 
                        + '\nDescription: ' + actionItemDescription 
                        + '\n\nUpdate @: http://localhost:9000/updateTask/' + obj._id
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, function(error, info){
                  // if(error){
                  //     console.log(error);
                  // }else{
                  //     console.log('Message sent: ' + info.response);
                  //     return res.json(info.response);
                  // }
              });
            });
          });
        }
      });
    });
  },
  start: false,
  timeZone: "America/New_York"
});
job.start();

var job2 = new CronJob({
  cronTime: '* * 4 * * *',
  onTick: function() {
    console.log('Job2: You will see this message once a day');

    Project.find(function (err, project) {
      if(err) { return handleError(res, err); }
      // return res.json(200, actionItems);
      // var currentTime = new Date();
      // console.log(actionItems);

      project.forEach(function(obj) {
        // console.log(obj);

        var projectName = obj.name;
        // var emailTxt = '\n\nProject: ' + projectName + '\n\nOpen Action Items:\n';

        Project.findById(obj._id)
          .populate('actionItems')
          .exec(function (err, aItem) {
            if(!aItem) return res.send(401);
            // console.log('aItem:', aItem.actionItems);
            var allActionItemsForAProject = aItem.actionItems;

            var emailTxt = '\n\nProject: ' + projectName + '\n\nOpen Action Items:\n';
            var numOfActions = allActionItemsForAProject.length;
            var indexOfActions = 1;

            allActionItemsForAProject.forEach(function(obj) {
              // emailTxt += indexOfActions + ') Title: ' + obj.title + '\nDescription: ' + obj.description + '\ndueDate: ' + obj.dueDate;
              var anAction = obj;

              Actionitem.findById(obj._id)
              .populate('owner')
              .exec(function (err, owner) {
                if(!owner) return res.send(401);

                emailTxt += indexOfActions + ') Title: ' + anAction.title + '\nDescription: ' + anAction.description + '\ndueDate: ' + anAction.dueDate;
                emailTxt += '\nOwner: ' + owner.owner.name + '\nOwner Email: ' + owner.owner.email 
                          + '\nupdate @: http://localhost:9000/updateTask/' + obj._id + '\n\n';
                // console.log(emailTxt);
                console.log(emailTxt) // + emailTxt2);
                indexOfActions++;
                console.log('all', numOfActions);
                console.log('index', indexOfActions);
                if (numOfActions == indexOfActions) {
                  var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'suiteproductivity@gmail.com',
                        pass: 'simple!123'
                    }
                  });

                  // setup e-mail data with unicode symbols
                  var mailOptions = {
                    from: 'martinebutler@gmail.com',  
                    replyTo: 'martinebutler@gmail.com',
                    to: 'martinebutler@gmail.com', 
                    subject: '★Daily Status★ Project: ' + projectName, 
                    text: emailTxt
                  };

                  // send mail with defined transport object
                  // transporter.sendMail(mailOptions, function(error, info){
                    // if(error){
                    //     console.log(error);
                    // }else{
                    //     console.log('Message sent: ' + info.response);
                    //     return res.json(info.response);
                    // }
                  // });
                }
              });
            })
        });
      });
    });

  },
  start: false,
  timeZone: "America/New_York"
});
job2.start();