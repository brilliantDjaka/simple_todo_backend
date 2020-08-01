var { Schema } = require('../helpers/mongodb');
const mongoose = require('../helpers/mongodb');


var todo = new Schema({
    text: String,
    isCheck: Boolean,
    author: String
});

var model = new mongoose.model('Todo', todo)

module.exports = model;