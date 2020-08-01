const { BadRequestError } = require('restify-errors')
const TodoModel = require('../../models/Todo');
const { isNull, isNullOrUndefined } = require('util');
const { ObjectId } = require('mongodb');

let insertTodo = async (req, res, _next) => {
    const { text, isCheck, author } = req.body;
    if (
        isNullOrUndefined(text) ||
        isNullOrUndefined(isCheck) ||
        isNullOrUndefined(author)
    ) res.send(new BadRequestError('text, isCheck, author is required'));
    let todo = new TodoModel({
        text: text,
        isCheck: isCheck,
        author: author
    });
    await todo.save().catch(err => {
        res.send(new Error(err.toString()))
    })
    res.send({
        message: 'success insert data'
    });
}

let deleteTodo = async (req, res, _next) => {
    const { _id } = req.body;

    if (
        isNullOrUndefined(_id)
    ) res.send(new BadRequestError('text, isCheck, author is required'));
    let todo = await TodoModel.findById(ObjectId(_id)).catch(err => {
        res.send(new Error(err.toString()))
    })
    await todo.remove().catch(err => {
        res.send(new Error(err.toString()))
    });
    res.send({
        message: 'success delete data'
    });
}


module.exports = {
    insertTodo,
    deleteTodo
}