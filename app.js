var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var post = require('./routes/post');
// Express4.xでput, deleteを使用するとき必要
var methodOverride = require('method-override');

app = express();

// template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// Express4.xでput, deleteを使用するときは別モジュールを使用する。
app.use(methodOverride('_method'));

app.use(logger('dev'));

// routing
app.get('/', post.index);
app.get('/posts/:id', post.show);
/*
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts:id/edit', post.edit);
app.put('/posts:id/', post.update);
app.delete('/posts:id/', post.destroy);
*/

app.listen(3000);
console.log('Server starting...');