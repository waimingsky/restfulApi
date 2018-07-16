'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);


  app.route('/picPaths/:taskId')
    .delete(todoList.delete_a_picpath);

  app.route('/picPaths')
    .get(todoList.list_all_paths)
    .post(todoList.create_a_path);

  app.route('/picPaths/:taskId/:likeValue/:dislikeValue')
    .put(todoList.update_a_path);

  //obsoleted
  //app.route('/picPaths/updateComment/:taskId')
    //.put(todoList.update_a_comment);
  //

  app.route('/picComments')
    .get(todoList.list_all_picComments)
    .post(todoList.create_a_picComment);

  app.route('/picComments/:picId')
    .get(todoList.read_id_picComments)

  app.route('/fileUpload')
    .post(todoList.upload_a_file);

  app.route('/userInfos')
    .get(todoList.list_all_userinfos)
    .post(todoList.create_a_userinfo);

  app.route('/userInfos/:id')
    .put(todoList.update_a_userinfo)

  app.route('/userInfos/:username')
    .get(todoList.read_a_userinfos);

  app.route('/userLogin')
    .post(todoList.user_authentication);
};
