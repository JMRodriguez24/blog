var articleCounter = 1;

ArticleProvider = function() {};
ArticleProvider.prototype.dummyData = [];
	
ArticleProvider.prototype.findAll = function( callback ) {
	callback( null, this.dummyData );
};

ArticleProvider.prototype.FindById = function( id, callback ) {
	var result = null;
	var i ;
	
	for( i = 0; i < this.dummyData.length; i++ ) {
		if( this.dummyData[i]._id == id ) {
			result = this.dummyData[i];
			break;
		}
	}
	callback( null, result );
};

ArticleProvider.prototype.save = function( articles, callback ) {
	var article = null;
	var j = 0;
    var i = 0;

    if( typeof( articles.length ) == "undefined" ) {
		articles = [articles];
	}
	
    for( ; i < articles.length; i++ ) {
		article = articles[i];
		article._id = articleCounter ++;
		article.greated_at = new Date();
		
		if( article.comments === undefined ) {
			article.comments = [];
		}
        for( ; j < article.comments.length; j++ ) {
            article.comments[j].created_at = new Date();
        }
        this.dummyData[this.dummyData.length] = article;
    }
    callback(null, articles);
};

var ap = new ArticleProvider().save([
        {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
        {title: 'Post two', body: 'Body two'},
        {title: 'Post three', body: 'Body three'}
        ], function(error, articles){});

exports.ArticleProvider = ArticleProvider;
