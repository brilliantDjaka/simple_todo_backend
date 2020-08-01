require('dotenv').config();
var restify = require('restify');
const { insertTodo, deleteTodo, checkTodo } = require('./modules/Todo/TodoCommand')
const { findData } = require('./modules/Todo/TodoQuery')
function respond(_req, res, next) {
    res.send('server is running properly');
    next();
}
var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.get('/', respond);
server.post('/todo',insertTodo);
server.del('/todo/:_id',deleteTodo);
server.get('/todo',findData)
server.post('/todo/check/:_id',checkTodo);

server.listen(process.env.PORT ||  8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});