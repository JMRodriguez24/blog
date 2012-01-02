
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

exports.new_post = function(req, res) {
	articleProvider.save( {
			title: req.param('title'),
			body: req.param('body')
		}, function( error, docs)  {
			res.redirect('/')
		});
};

