// var api = require('api')

var hackerCookie = {
	server: 'http://localhost:5600',
	render: {
		single: function(data) {
			var t = ['<div class="single-post clearfix">', '<h3><a href="{{link}}">{{title}}</a></h3>',
				'<div class="meta"><i class="icon-thumbs-up"></i> {{points}} <i class="icon-user"></i> {{by}} <i class="icon-time"></i> {{time}}</div>',
				'</div>'].join('\n');
			return Mustache.render(t, data);
		}
	},
	dropdown: function() {
		$(".container-dropdown .single-post").each(function (i) {
	        $(this).attr("style", "-webkit-animation-delay:" + i * 150 + "ms;"
	                + "-moz-animation-delay:" + i * 150 + "ms;"
	                + "-o-animation-delay:" + i * 150 + "ms;"
	                + "animation-delay:" + i * 150 + "ms;");
	        if (i == $(".container-dropdown .single-post").size() -1) {
	            $(".container-dropdown").addClass("play")
	        }
	    });
	},
	pop: function(type) {
		$('.' + type).fadeIn(300);
	},
	fetch: {
		ui: function(dom) {
			dom.addClass('current');
			dom.find('i').removeClass().addClass('icon-spinner icon-spin')
		},
		destory: function(dom) {
			dom.parents('ul').find('a').removeClass('current');
			dom.parents('ul').find('a i').removeClass('icon-angle-right').addClass('icon-exchange');
			dom.addClass('current');
			dom.find('i').removeClass().addClass('icon-angle-right');
		},
		data: function(type,dom) {
			hackerCookie.fetch.ui(dom);
			$.getJSON(hackerCookie.server + '/api/' + type + '?callback=?', function(posts) {

				if(posts.stat == 'ok') {

					$('.container').empty();
					$('.container').addClass('container-dropdown')
					var posts = posts.posts;

					_.each(posts, function(item) {
						var dom = hackerCookie.render.single(item);
						$('.container').append(dom);
					});

					hackerCookie.fetch.destory(dom);

					hackerCookie.dropdown();

				} else {
					hackerCookie.pop('error')
				}

			})
		}
	},
	bind: function() {
		$(document).on('click', 'a#startupNews', function() {
			hackerCookie.fetch.data('sn',$(this));
		});
		$(document).on('click', 'a#hackerNews', function() {
			hackerCookie.fetch.data('hn',$(this));
		});
	},
	init: function() {
		hackerCookie.fetch.data('sn',$('a#startupNews'));
		this.bind()
	}
}

$(document).ready(function() {
	hackerCookie.init()
});