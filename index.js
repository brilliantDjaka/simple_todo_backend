require('dotenv').config();
var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware');
const render = require('restify-render-middleware')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: '' })// TODO fill with url
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
server.use(render({
    engine: 'ejs',
    dir: __dirname + '/views'
}))
server.get('/', respond);
// API
server.post('/todo', insertTodo);
server.del('/todo/check/:author', deleteTodo);
server.get('/todo/:author', findData)
server.post('/todo/check/:_id', checkTodo);

// Front End
server.get('/view/:author', async (req, res, next) => {
let data = [];
    await findData({
        params: {
            author: req.params.author
        }
    },{
        send:(result) => {
            if(result.data){
                data = result.data
            }
        }
    })
    res.render('index.ejs', {
        author: req.params.author,
        data:data,
    });
})
server.post('/search',(req,res,next) =>{
    const searchText = req.body["search-text"];

    res.render('search.ejs',{searchText})
})

server.listen(process.env.PORT || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});