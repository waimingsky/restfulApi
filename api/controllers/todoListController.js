'use strict';

var multer = require('multer');

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  PicPath = mongoose.model('PicPaths'),
  UserInfo = mongoose.model('UserInfos');

var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, '/home/sky/images');
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + file.originalname);
     }
});

var upload = multer({storage: Storage}).single('imageUpload');

exports.upload_a_file = function(req, res) {
  upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
  });
};


exports.update_a_comment = function(req, res) {
  PicPath.findOneAndUpdate({_id: req.params.taskId}, {$set: req.body}, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.list_all_paths = function(req, res) {
  PicPath.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_path = function(req, res) {
  var new_path = new PicPath(req.body);
  new_path.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_path = function(req, res) {
  PicPath.findOneAndUpdate({_id: req.params.taskId}, {$set:{like: req.params.likeValue, dislike: req.params.dislikeValue}}, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};



exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

exports.list_all_userinfos = function(req, res) {
  UserInfo.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_userinfo = function(req, res) {
  var new_task = new UserInfo(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

