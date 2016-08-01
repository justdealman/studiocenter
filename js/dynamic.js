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
$(function() {
	slider($('.slider-b'),0,1,'slide');
	$('.img-bg').each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
	$('.portfolio-b ul li div > div').each(function() {
		var p = ($(this).parent().height()-$(this).height())/2;
		if ( p < 0 ) {
			p = 0;
		}
		$(this).css({
			'padding-top': p+'px'
		});
	});
	$('.video-b ul li p').each(function() {
		var p = (parseInt($(this).parent().css('min-height'),10)-$(this).height())/2;
		if ( p < 0 ) {
			p = 0;
		}
		$(this).css({
			'padding-top': p+'px'
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
});