function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else{
		document.querySelector('body').classList.add('no-webp');
	}
});;
$(document).ready(function(){
	$('.burger__btn').on('click', function() {
		$(this).toggleClass('_active');
		$('.burger__content').toggleClass('_active');
		$('.header').toggleClass('_active-burger');
		if ($('.header').hasClass('_active-burger')) {
			$('body').on('mousemove', function(e) {
				let pos = $('.burger__big-word').offset();
				let width = $('.burger__big-word').width();
				let height = $('.burger__big-word').height();
				let X = e.pageX;
				let Y = e.pageY;
				let x = pos.left;
				let y = pos.top;
				x = X - x;
				y = Y - y;
				if (x > width + 100) x = width + 100;
				if (x < - 100) x = -100;
				if (y > height + 100) y = height + 100;
				if (y < -100) y = -100;
				$(this).find('span').css({
					'left': x,
					'top': y,
					'visibility': 'visible',
					'opacity': 1,
				});
			})
		} else {
			$('body').unbind('mousemove');
		}
	});
});