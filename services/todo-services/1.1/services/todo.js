var express = require('express');
var router = express.Router();
const _auth = require('../../../auth-service/authentication');

// Todo Model to Store the Data in MongoDB
var Todo = require('../models/todo.model');
// var sampleTodos = require('./sample/sample.todo.js');

exports.createTodo = function(req, res) {
  // Extract the information from the req.body
  var task = req.body.task;
  var userId = req.body.userId || req.headers.userid;
  var completed = false;

  // Hold all this data in an object AND structured should be same as DB Model
  var todoObj = {
    task: task,
    completed: completed,
    userId: userId
  };

  // Create a new todo model instance, passing in the object
  var todo = new Todo(todoObj);

  // Now, save that 'todo' instance to the database
  todo.save(function(err, data) {
    // If Error in saving, respond back with error
    if (err) {
      var error = {
        status: 'ERROR',
        message: 'Error saving todo.'
      };
      return res.json(error);
    }
    // Now return the json data of the new 'todo'
    var jsonData = {
      status: 'OK',
      todo: data
    };
    return res.json(jsonData);
  });
};
exports.getTodos = function(req, res) {
  // Extract the information from the req.body
  var _userId = req.headers.userid;
  if (_userId != undefined) {
    // mongoose method to find all
    Todo.find(
      {
        userId: _userId
      },
      function(err, data) {
        // If Error OR No Todos found, respond with error
        if (err || data == null) {
          var error = {
            status: 'ERROR',
            message: 'No Todos found.'
          };
          return res.json(error);
        }

        // Otherwise, respond with the all Todo's in responsedata
        var jsonData = {
          status: 'OK',
          todos: data
        };
        res.json(jsonData);
      }
    );
  } else {
    // Otherwise, respond with the all Todo's in responsedata
    var jsonData = {
      status: 'OK',
      todos: []
    };
    res.json(jsonData);
  }
};

exports.getTodo = function(req, res) {};

exports.updateTodo = function(req, res) {
  console.log(req.body);
  console.log('Update Todo Api Requested.');
  var todoId = req.body.id;
  // A Blank Object of Data to Update
  var dataToUpdate = {};
  var task, completed;

  // Update any field if it actually in the req.body otherwise, leave it alone.
  if (req.body.task) {
    task = req.body.task;
    // Add to object that holds updated data
    dataToUpdate['task'] = task;
  }
  if (req.body.completed !== undefined) {
    completed = req.body.completed;
    // Add to object that holds updated data
    dataToUpdate['completed'] = completed;
  }
  console.log('the data to update is ' + JSON.stringify(dataToUpdate));

  // Now, update that todo by using mongoose method findByIdAndUpdate
  Todo.findByIdAndUpdate(todoId, dataToUpdate, function(err, data) {
    // IF Error saving, respond back with error message
    if (err) {
      var error = {
        status: 'ERROR',
        message: 'Error updating Todo'
      };
      return res.json(error);
    }

    // Now return the json data of the new person
    var jsonData = {
      status: 'OK',
      todo: data
    };
    return res.json(jsonData);
  });
};

exports.deleteTodo = function(req, res) {
  var todoId = req.params.id;

  // Remove todo using the Todo Id by default Mongoose method to remove
  Todo.findByIdAndRemove(todoId, function(err, data) {
    // IF Error saving, respond back with error message
    if (err || data == null) {
      var error = {
        status: 'ERROR',
        message: 'Could not find that todo to delete'
      };
      return res.json(error);
    }

    // Otherwise, respond back with success
    var jsonData = {
      status: 'OK',
      message: 'Successfully deleted id: ' + todoId
    };
    res.json(jsonData);
  });
};
