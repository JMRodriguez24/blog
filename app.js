'use strict';
var dirname = __dirname;

/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    PostProvider = require('./providers/articleprovider-mongodb').PostProvider;

var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
    app.set('views', dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(require('stylus').middleware({ src: dirname + '/public' }));
    app.use(app.router);
    app.use(express.static(dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.errorHandler());
});

var PostProvider = new PostProvider();

// Routes

app.get('/', function (req, res) {
    console.log(req.params);
    routes.index(req, res, PostProvider);
});

app.get('/blog/new', function (req, res) {
    routes.new_get(req, res);
});

app.post('/blog/new', function (req, res) {
    routes.new_post(req, res, PostProvider);
});

app.get('/blog/:id', function (req, res) {
    PostProvider.findById(req.params.id, function (error, article) {
        res.render('blog_show.jade',
            {
                locals:
                    {
                        title: article.title,
                        article: article
                    }
            });
    });
});

app.post('/blog/addComment', function (req, res) {
    PostProvider.addCommentToArticle(req.param('_id'), {
        person: req.param('person'),
        comment: req.param('comment'),
        created_at: new Date()
    }, function (error, docs) {
        res.redirect('/blog/' + req.param('_id'));
    });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
