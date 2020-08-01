const { BadRequestError } = require('restify-errors')
const TodoModel = require('../../models/Todo');
const { isNull, isNullOrUndefined } = require('util');
const { ObjectId } = require('mongodb');

let insertTodo = async (req, res) => {
    const { text, isChecked, author } = req.body;
    if (
        isNullOrUndefined(text) ||
        isNullOrUndefined(isChecked) ||
        isNullOrUndefined(author)
    ) {
        res.send(new BadRequestError('text, isCheck, author is required'));
    }
    let todo = new TodoModel({
        text: text,
        isCheck: isChecked,
        author: author
    });
    todo = await todo.save().catch(err => {
        res.send(new Error(err.toString()))
    })
    res.send({
        data: {
            _id: todo._id
        },
        message: 'success insert data'
    });
}

let deleteTodo = async (req, res, next) => {
    const { _id } = req.params;

    if (
        isNullOrUndefined(_id)
    ) res.send(new BadRequestError('text, isCheck, author is required'));
    let todo = await TodoModel.findById(ObjectId(_id)).catch(err => {
        next(new Error(err.toString()))
        return;
    })
    if (isNullOrUndefined(todo)) {
        next(new Error());
        return;
    }
    await todo.remove().catch(err => {
        next(new Error(err.toString()))
        return;
    });
    res.send({
        message: 'success delete data'
    });
}


module.exports = {
    insertTodo,
    deleteTodo
}