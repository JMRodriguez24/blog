'use strict';

/*
 * GET home page.
 */

exports.index = function(req, res, articleProvider) {
	articleProvider.findAll(function(error, docs){
		res.render('index.jade', 
			{ locals: 
				{
					title: 'Blog',
					articles: docs
				}
			});
		});
};


/*
 * GET new post page.
 */

exports.new_get = function(req, res) {
	res.render('blog_new.jade', {
		locals: {
				title: 'New Post'
			}
		});
};

/*
 * POST new post page.
 */

exports.new_post = function(req, res, articleProvider) {
	articleProvider.save( {
			title: req.param('title'),
			body: req.param('body')
		}, function( error, docs)  {
			res.redirect('/');
		});
};

