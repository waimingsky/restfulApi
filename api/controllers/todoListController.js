'use strict';

var multer = require('multer');

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks'),
  PicPath = mongoose.model('PicPaths'),
  UserInfo = mongoose.model('UserInfos'),
  PicComment = mongoose.model('PicComments');

var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, '/home/sky/images');
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + file.originalname);
     }
});

var upload = multer({storage: Storage}).single('imageUpload');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

exports.upload_a_file = function(req, res) {
  upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
  });
};


exports.read_id_picComments = function(req, res) {
  PicComment.find({id: req.params.picId},null,{sort:{Created_date: 'desc'}}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.list_all_picComments = function(req, res) {
  PicComment.find({}, null, {sort:{Created_date: 'desc'}},function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_picComment = function(req, res) {
  var new_comment = new PicComment(req.body);
  new_comment.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

//exports.update_a_comment = function(req, res) {
  //PicPath.findOneAndUpdate({_id: req.params.taskId}, {$set: req.body}, {new: true}, function(err, task) {
    //if (err)
      //res.send(err);
    //res.json(task);
  //});
//};

exports.list_all_paths = function(req, res) {
  PicPath.find({}, null, {sort:{Created_date: 'desc'}},function(err, task) {
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


exports.delete_a_picpath = function(req, res) {
  PicPath.remove({_id: req.params.taskId}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'picpath successfully deleted' });
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
      return res.send(err);

    var token = jwt.sign({ id: task._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });

    //res.json(task);
  });
};


exports.read_a_userinfo = function(req, res) {
  UserInfo.findOne({username: req.body.username}, function(err, task) {
    if (err)  
      return res.send(err);
    
    if (!task) 
      return res.status(404).send('No user found.');

    //var passwordIsValid = bcrypt.compareSync(req.body.password, task.password);
    if (req.body.password != task.password) 
      return res.status(401).send({ auth: false, token: null }); 
     
    var token = jwt.sign({ id: task._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
    //res.json(task);
  });
};
