const { BadRequestError, NotFoundError } = require('restify-errors')
const TodoModel = require('../../models/Todo');
const {  isNullOrUndefined } = require('util');
let findData = async (req, res) => {
    let todo = await TodoModel.find({}).exec().catch(err => {
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