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
		$('.header').toggleClass('_active-burger')
	});
	$('.burger__big-word').on('mouseleave', function() {
		$(this).find('span').css({
			'visibility': 'hidden',
			'opacity': 1,
		});
	});
	$('.burger__big-word').on('mousemove', function(e) {
		let pos = $(this).offset();
		let X = e.pageX;
		let Y = e.pageY;
		let x = pos.left;
		let y = pos.top;
		x = X - x;
		y = Y - y;
		$(this).find('span').css({
			'left': x,
			'top': y,
			'visibility': 'visible',
			'opacity': 1,
		});
	})
});