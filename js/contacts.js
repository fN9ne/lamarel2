$(document).ready(function() {

	$('.label').appendTo('.footer');

	function pageHeight() {
		let height = $(window).height();
		$('.wrapper').css('min-height', height);
	}

	$(window).on('load resize', pageHeight);

});

$(window).on('load', function() {
	$('.wrapper').addClass('_loaded');
});