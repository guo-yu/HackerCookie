
/*
 * GET apis.
 */

var api = require('../lib/api.js');

var apis = {
	sn: 'http://7h2oappengine.sinaapp.com/snapi/news.php',
	hn: 'http://api.ihackernews.com/page'
}

exports.fetch = function(type,cb) {

	api('GET',apis[type],function(posts){
		cb(posts)
	})

}

exports.api = function(req, res){
  var type = req.params.type;
  if (type === 'sn' || type === 'hn') {
  	exports.fetch(type,function(posts){
  		console.log(posts);
  		if (type === 'sn') {
	  		res.json({
	  			stat: 'ok',
	  			posts: posts,
	  			flag: type
	  		});
	  	} else if (type === 'hn') {
	  		if(posts.items.length > 0) {
		  		res.json({
		  			stat: 'ok',
		  			posts: posts.items,
		  			flag: type
		  		});
	  		} else {
	  			res.json({
			  		stat :'error',
			  		msg: 'load error'
			  	})
	  		}
	  	}
  	})
  } else {
  	res.json({
  		stat :'error',
  		msg: 'params error'
  	})
  }
};