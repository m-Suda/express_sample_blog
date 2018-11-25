var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
// Express4.xでput, deleteを使用するとき必要
var connect = require('connect');
var methodOverride = require('method-override');
// Express4.x系ではCSRF対策に必要なミドルウェアは別途インストールする必要がある
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var csrf = require('csurf');
// 自作モジュールの読み込み
var post = require('./routes/post');



app = express();

// template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// Express4.xでput, deleteを使用するときは別モジュールを使用する。
// これだとformのactionの中に?_method=PUTと入れる必要がある。
// app.use(methodOverride('_method'));
// 下記の処理を加えることでhiddenのname='_method'のvalueにPUTかDELETEを指定できるようになる。
app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
// csrf対策 ※json, urlencodedより後、morganよりも先に書くようにする。
app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csrf());
app.use((req, res, next) => {
    res.locals.csrftoken = req.csrfToken();
    next();
})

app.use(logger('dev'));

// routing
app.get('/', post.index);
app.get('/posts/:id([0-9]+)', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id', post.update);
app.delete('/posts/:id/', post.destroy);

// エラー処理 ※Express4.xではapp.routerが無くトレースがそのまま表示されてしまうためルーティングの下に記述する。
app.use((error, req, res, next) => {
    res.send(error.message);
});

app.listen(3000);
console.log('Server starting...');