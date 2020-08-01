var restify = require('restify');
const { insertTodo } = require('./modules/Todo/TodoCommand')
function respond(_req, res, next) {
    res.send('server is running properly');
    next();
}
var server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.get('/', respond);
server.post('/todo/insert',insertTodo);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});