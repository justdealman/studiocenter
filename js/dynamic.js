function slider(t,speed,start,e) {
	t.find('.container').empty();
	t.find('.prev, .next, .pagination').remove();
	t.find('.container').html(t.find('.temp').html());
	t.find('.container, .container > div').width(t.width());
	t.slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: e,
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		fadeSpeed: 250,
		play: speed,
		pause: 2500,
		autoHeight: true,
		start: start,
		animationComplete: function() {
			console.log(t);
			if ( t.selector = '.slider-types, .slider-portfolio' ) {
				setTimeout(function() {
					var h = $(window).scrollTop()+($(window).height()-t.parents('.modal').outerHeight())/2;
					console.log(h);
					if ( h < $(window).scrollTop() ) {
						h = $(window).scrollTop();
					}
					t.parents('.modal').stop().animate({
						'top': h+'px'
					}, 500);
				}, 500);
			}
		}
	});
	t.bind('swipeleft', function() {
		t.find('.next').trigger('click');
	});
	t.bind('swiperight', function() {
		t.find('.prev').trigger('click');
	});
}
function ratioStuff() {
	$('.types-b ul li div').each(function() {
		$(this).height($(this).width()*244/368);
	});
	$('.portfolio-b ul li, .portfolio-b ul li > div').each(function() {
		$(this).height($(this).width()*244/368);
	});
	$('.portfolio-b ul li > div').css({
		'top': $('.portfolio-b ul li').outerHeight()+'px'
	});
	$('.portfolio-b ul li').on('mouseenter', function() {
		var c = $(this).children('div');
		var t = ($(this).outerHeight()-c.children('div').outerHeight())/2;
		if ( t < 0 ) {
			t = 0;
		}
		c.css({
			'top': '0'
		});
		$(this).find('h6').css({
			'top': $(this).height()+'px'
		});
		c.children('div').css({
			'padding-top': t+'px'
		});
	});
	$('.portfolio-b ul li').on('mouseleave', function() {
		$(this).children('div').css({
			'top': -$(this).outerHeight()+'px'
		});
		$(this).find('h6').css({
			'top': '0'
		});
	});
	$('.video-b > div > div').height($('.video-b > div').outerWidth()*506/731);
	$('.video-b ul li').css({
		'min-height': ($('.video-b > div > div').height()-(($('.video-b ul li').size()-1)*4))/$('.video-b ul li').size()+'px'
	});
	$('.video-b ul li div').css({
		'height': $('.video-b ul li').outerHeight()+'px',
		'width': $('.video-b ul li').outerHeight()*120/78+'px'
	});
	$('.video-b ul li').css({
		'padding-left': $('.video-b ul li div').outerWidth()+18+'px'
	});
	$('.video-b ul li p').each(function() {
		var t = ($(this).parent().outerHeight()-$(this).height())/2;
		if ( t < 0 ) {
			t = 0;
		}
		$(this).css({
			'margin-top': t+'px'
		});
	});
	$('.services-b h2, .portfolio-b h2, .contacts-b h2, .request-b h2').each(function() {
		if ( $(this).children('span').outerWidth() > $(this).width() ) {
			$(this).children('span').css({
				'margin-left': ($(this).width()-$(this).children('span').outerWidth())/2+'px'
			});
		}
	});
}
$(function() {
	slider($('.slider-b'),0,1,'slide');
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$('.modal, .fade').stop().fadeOut(250);
		var h = $(window).scrollTop()+($(window).height()-$('.modal[data-target="'+$(this).attr('data-open')+'"]').outerHeight())/2;
		if ( h < $(window).scrollTop() ) {
			h = $(window).scrollTop();
		}
		$('.modal[data-target="'+$(this).attr('data-open')+'"]').css({
			'top': h+'px'
		}).stop(true,true).fadeIn(500);
		$('.fade').stop(true,true).fadeIn(500);
		slider($('.modal[data-target="'+$(this).attr('data-open')+'"]').find('.slider-types, .slider-portfolio'),0,eval($(this).index()+1),'fade');
		h = $(window).scrollTop()+($(window).height()-$('.modal[data-target="'+$(this).attr('data-open')+'"]').outerHeight())/2;
		if ( h < $(window).scrollTop() ) {
			h = $(window).scrollTop();
		}
		$('.modal[data-target="'+$(this).attr('data-open')+'"]').animate({
			'top': h+'px'
		}, 500);
	});
	$('.modal .close, .fade').on('click', function(e) {
		e.preventDefault();
		$('.modal, .fade').stop().fadeOut(250);
	});
	$(window).resize(function() {
		slider($('.slider-b'),10000,1,'slide');
	});
	ratioStuff();
	$(window).on('load resize', function() {
		ratioStuff();
	});
	$('.menu-open').on('click', function() {
		$('.menu-mob').stop().animate({
			'left': '0'
		}, 500);
		$('.fade').stop().fadeIn(500);
	});
	$('.fade, .menu-mob .close').on('click', function() {
		$('.menu-mob').stop().animate({
			'left': '-300px'
		}, 500);
		$('.fade').stop().fadeOut(500);
	});
	$('.menu-mob').on('swipeleft', function() {
		$('.menu-mob').stop().animate({
			'left': '-300px'
		}, 500);
		$('.fade').stop().fadeOut(500);
	});
	$('.menu-show-area').on('swiperight', function() {
		$('.menu-mob').stop().animate({
			'left': '0'
		}, 500);
		$('.fade').stop().fadeIn(500);
	});
});