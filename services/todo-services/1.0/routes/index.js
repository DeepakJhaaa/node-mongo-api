var express = require('express');
var router = express.Router();
const _todoService = require('../services/todo');

/**
 * @swagger
 * definition:
 *   Todos:
 *     properties:
 *       task:
 *         type: string
 *       completed:
 *         type: boolean
 */

/**
 * @swagger
 * /v1/todos/getTodos:
 *   get:
 *     description: Return all the available todo in an Array.
 *     responses:
 *       200:
 *         description: An array of todos
 *         schema:
 *           $ref: '#/definitions/Todos'
 *     tags:
 *       - Todos
 */
router.get('/getTodos', _todoService.getTodos);

/**
 * @swagger
 * /v1/todos/getTodo/{id}:
 *   get:
 *     description: Returns all users
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Id of the todo Item
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of a todo
 *         schema:
 *           $ref: '#/definitions/Todos'
 *     tags:
 *       - Todos
 */
router.get('/getTodo/:id', _todoService.getTodo);

/**
 * @swagger
 * /v1/todos/deleteTodo/{id}:
 *   delete:
 *     description: Delete an existing todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 *     tags:
 *       - Todos
 */
router.get('/deleteTodo/:id', _todoService.deleteTodo);

/**
 * @swagger
 * /v1/todos/newTodo:
 *   post:
 *     description: Creates a new Todo
 *     requestBody:
 *      content:
 *         schema:
 *           $ref: '#/definitions/Todos'
 *         properties:
 *            task:
 *               type: string
 *            completed:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Todo Updated
 *     tags:
 *       - Todos
 */
router.post('/newTodo', _todoService.newTodo);

/**
 * @swagger
 * /v1/todos/updateTodo:
 *   put:
 *     description: Creates a new Todo
 *     requestBody:
 *      content:
 *         schema:
 *           $ref: '#/definitions/Todos'
 *         properties:
 *            task:
 *               type: string
 *            completed:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Todo Updated
 *     tags:
 *       - Todos
 */
router.put('/updateTodo', _todoService.updateTodo);

module.exports = router;
