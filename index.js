require('dotenv').config();
var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({  
    origins: ["*"],
    allowHeaders: ["Authorization"],
    exposeHeaders: ["Authorization"]
});
const { insertTodo, deleteTodo, checkTodo } = require('./modules/Todo/TodoCommand')
const { findData } = require('./modules/Todo/TodoQuery')
function respond(_req, res, next) {
    res.send('server is running properly');
    next();
}
var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.pre(cors.preflight);  
server.use(cors.actual);  
server.get('/', respond);
server.post('/todo',insertTodo);
server.post('/todo/delete-many',deleteTodo);
server.get('/todo',findData)
server.post('/todo/check/:_id',checkTodo);

server.listen(process.env.PORT ||  8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});