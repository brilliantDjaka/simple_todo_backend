const { BadRequestError, NotFoundError } = require('restify-errors')
const TodoModel = require('../../models/Todo');
const {  isNullOrUndefined } = require('util');
let findData = async (req, res) => {
    const {author} = req.params;
    let todo = await TodoModel.find({
        author:author
    }).exec().catch(err => {
        res.send(new Error(err.toString()))
    })
    if(isNullOrUndefined(todo)) res.send(new NotFoundError('data not found'))
    res.send({
        data:todo,
        message: 'success find data'
    });
}



module.exports = {
    findData
}