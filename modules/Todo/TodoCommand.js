const { BadRequestError } = require('restify-errors')
const TodoModel = require('../../models/Todo');
const { isNull, isNullOrUndefined } = require('util');
let insertTodo = async (req, res, _next) => {
    const { text, isCheck, author } = req.body;
    if (
        isNullOrUndefined(text) ||
        isNullOrUndefined(isCheck) || 
        isNullOrUndefined(author)
        ) res.send(new BadRequestError('text, isCheck, author is required'));
    let todo = new TodoModel({
        text: 'test',
        isCheck: true,
        author: 'brian'
    });
    await todo.save().catch(err=>{
        res.send(new Error(err.toString()))
    })
    res.send({
        message:'success insert data'
    });
}


module.exports = {
    insertTodo,
}