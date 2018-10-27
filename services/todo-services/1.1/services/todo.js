var Todo = require('../models/todo.model.js');

/**
 * Method to create a new Todo
 * @param {*} req - Incoming requst
 * @param {*} res - response data
 */
exports.newTodo = function(req, res) {
  var task = req.body.task;
  var completed = false;

  var todoObj = {
    task: task,
    completed: completed,
  };

  var todo = new Todo(todoObj);

  if (req.body.task == undefined) {
    var error = { status: 'ERROR', message: 'Error saving todo.' };
    return res.json(error);
  }

  todo.save(function(err, data) {
    if (err) {
      var error = { status: 'ERROR', message: 'Error saving todo.' };
      return res.json(error);
    }
    var jsonData = { status: 'OK', todo: data };
    return res.json(jsonData);
  });
};

/**
 * Method to fetch a single Todo
 * @param {*} req - Incoming requst
 * @param {*} res - response data
 */
exports.getTodo = function(req, res) {
  var todoId = req.params.id;

  Todo.findById(todoId, function(err, data) {
    if (err || data == null) {
      var error = { status: 'ERROR', message: 'Todo Not found.' };
      return res.json(error);
    }
    var jsonData = { status: 'OK', todo: data };
    res.json(jsonData);
  });
};

/**
 * Method to fetch all Todo Items
 * @param {*} req - Incoming requst
 * @param {*} res - response data
 */
exports.getTodos = function(req, res) {
  Todo.find(function(err, data) {
    if (err || data == null) {
      var error = { status: 'ERROR', message: 'No Todos found.' };
      return res.json(error);
    }
    var jsonData = { status: 'OK', todos: data };
    res.json(jsonData);
  });
};

/**
 * Method to fetch a single Todo
 * @param {*} req - Incoming requst
 * @param {*} res - response data
 */
exports.updateTodo = function(req, res) {
  var todoId = req.body.id;
  var dataToUpdate = {};
  var task, completed;

  if (req.body.task) {
    task = req.body.task;
    dataToUpdate['task'] = task;
  }
  if (req.body.completed !== undefined) {
    completed = req.body.completed;
    dataToUpdate['completed'] = completed;
  }

  Todo.findByIdAndUpdate(todoId, dataToUpdate, function(err, data) {
    if (err) {
      var error = { status: 'ERROR', message: 'Error updating Todo' };
      return res.json(error);
    }

    var jsonData = {
      status: 'OK',
      todo: data,
    };
    return res.json(jsonData);
  });
};

/**
 * Method to fetch a single Todo
 * @param {*} req - Incoming requst
 * @param {*} res - response data
 */
exports.deleteTodo = function(req, res) {
  var todoId = req.params.id;

  Todo.findByIdAndRemove(todoId, function(err, data) {
    if (err || data == null) {
      var error = {
        status: 'ERROR',
        message: 'Could not find that todo to delete',
      };
      return res.json(error);
    }

    var jsonData = {
      status: 'OK',
      message: 'Successfully deleted id: ' + todoId,
    };
    res.json(jsonData);
  });
};
