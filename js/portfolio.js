$(document).ready(function() {

	$('.label').appendTo('.footer');

	function pageHeight() {
		let height = $(window).height();
		$('.wrapper').css('min-height', height);
	}

	$(window).on('load resize', pageHeight);

	new Swiper('.portfolio__slider', {
		spaceBetween: 50,
		loop: true,
		centeredSlides: true,
		observer: true,

		navigation: {
			prevEl: '.navigation__prev',
			nextEl: '.navigation__next',
		},

		breakpoints: {
			320: {
				slidesPerView: 1.2,
				spaceBetween: 10,
			},
			769: {
				slidesPerView: 1.8,
				spaceBetween: 15,
			},
			993: {
				slidesPerView: 2.5,
				spaceBetween: 30,
			},
			1281: {
				slidesPerView: 3.5,
			},
		},
	});

});

$(window).on('load', () => {

	const preloader = $('.preloader');
	preloader.addClass('_animate');

	setTimeout(() => {
		preloader.addClass('_end');
		$('.wrapper').addClass('_loaded');
	}, 3500);

});