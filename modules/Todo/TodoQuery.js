const { BadRequestError } = require('restify-errors')
const TodoModel = require('../../models/Todo');
const {  isNullOrUndefined } = require('util');
const { ObjectId } = require('mongodb');

let findData = async (req, res) => {
    const { _id } = req.params;
    if (isNullOrUndefined(_id)) {
        res.send(new BadRequestError('text, isCheck, author is required'));
    }
    let todo = await TodoModel.findById(ObjectId(_id)).exec().catch(err => {
        res.send(new Error(err.toString()))
    })
    res.send({
        data:{
            ...todo._doc
        },
        message: 'success find data'
    });
}



module.exports = {
    findData
}