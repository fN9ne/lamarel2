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
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');
//Слушаем изменение размера экрана
window.addEventListener('resize', move);
//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}
//Вызываем функцию
move();
*/;
$(window).on('load', function() {
	$('.preloader').addClass('_active');
});
$(document).ready(function(){
	$('.burger__btn').on('click', function() {
		$('body').toggleClass('_lock');
		$(this).toggleClass('_active');
		$('.burger__content').toggleClass('_opened');
		$('.burger__content').toggleClass('_closed');
		$('.header').toggleClass('_active-burger');
		if ($('.header').hasClass('_active-burger') && $(document).width() > 992) {
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
				$('.burger__big-word').find('span').css({
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
	$('.no-link').on('click', function(e) {
		e.preventDefault();
	});
	$('.burger__content').on('scroll', function() {
		let distance = $(this).scrollTop();
		if (distance > 35) {
			$('.header').addClass('_blur');
		} else {
			$('.header').removeClass('_blur');
		}
	});
	$('.link-popup').on('click', function() {
		let link = $(this).attr('data-popup');
		$(`.${link}`).addClass('_active');
	});
	$('.popup').on('mousemove', function(e) {
		popupCursor($(this), e);
	});
	$('.popup__close').click(function() {
		$(this).closest('.popup').removeClass('_active');
	});
	$('.popup').find('button').on('click', function(e) {
		e.preventDefault();
		let pos = $(this).offset();
		let X = e.pageX;
		let Y = e.pageY;
		let x = pos.left;
		let y = pos.top;
		x = X - x;
		y = Y - y;
		$(this).append('<span></span>');
		let rise = $(this).find('span');
		rise.css({
			'top': y,
			'left': x,
		});
	});
	$('.popup__close').on('mouseenter', function() {
		$('.popup__cursor').addClass('_close');
	});
	$('.popup__close').on('mouseleave', function() {
		$('.popup__cursor').removeClass('_close');
	});
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$('.popup__cursor').addClass('_mobile');
	} else {
		$('.popup__cursor').removeClass('_mobile');
	}
	$('.popup__input').find('input, textarea').on('focus blur input', function() {
		let line = $(this).closest('.popup__input').find('.popup__input-line');
		let cursor = $('.popup__cursor');
		let pos = $(this).offset();
		let x = pos.left;
		let y = pos.top;
		y = y - $(window).scrollTop();
		let width = parseInt($(this).css('width'));
		let height = parseInt($(this).css('height'));
		let text = $(this).val();
		if (!text) text = '';
		let width_text = getTextWidth(text, $(this).css('font'));
		let curr_id = $(this).closest('.popup__input').index();
		$(window).on('resize', function() {
			changePos(curr_id);
		});
		function changePos(curr_id) {
			pos = $('.popup__input').eq(curr_id).find('input, textarea').position();
			x = pos.left;
			y = pos.top;
			cursor.css({
				'left': x + width,
				'top': y + height + $('.popup').scrollTop(),
			});
		}
		if ($(this).is(':focus')) {
			$(this).closest('.popup__input').addClass('_active');
			cursor.addClass('_disable');
			cursor.css({
				'left': x + width,
				'top': y + height + $('.popup').scrollTop(),
			});
			$('.popup').off('mousemove');
			line.css({
				'width': width_text,
				'opacity': 1,
				'visibility': 'visible',
			});
		} else {
			$(this).closest('.popup__input').removeClass('_active');
			cursor.removeClass('_disable');
			$('.popup').on('mousemove', function(e) {
				popupCursor($(this), e);
			});
		}
	});
	for (let i = 0; i < $('.popup__input').length; i++) {
		let item = $('.popup__input').eq(i);
		let input = item.find('input, textarea');
		let placeholder = item.find('span');
		input.css('padding-left', (placeholder.width() * 134 / 105) + 10);
	}
	function getTextWidth(text, font) {
		let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
		let context = canvas.getContext('2d');
		context.font = font;
		let metrics = context.measureText(text);
		return metrics.width;
	}
	function popupCursor(current, e) {
		if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			let pos = current.offset();
			let cursor = $('.popup__cursor');
			let cursor_width = parseInt(cursor.css('width'));
			let X = e.pageX;
			let Y = e.pageY;
			let x = pos.left;
			let y = pos.top;
			x = X - x;
			y = Y - y;
			if (x < cursor_width) x = cursor_width;
			if (x > $(document).width() - cursor_width) x = $(document).width() - cursor_width;
			if (y < cursor_width) y = cursor_width;
			if (y > $(document).height() - cursor_width) y = $(document).height() - cursor_width;
			cursor.css({
				'left': x,
				'top': y,
			});
		}
	}

	const adg_work = $('.advantages-work');
	if (adg_work.length > 0) {
		for (let i = 0; i < adg_work.length; i++) {
			let color = adg_work.eq(i).attr('data-color') || '#fff';
			let image = adg_work.eq(i).find('.advantages-work__image');
			image.css('background', color);
		}
	}

	$('.prices__tabs li').on('click', function() {
		let current;
		let typesOffset = $('.types').offset().top;
		if (!$(this).hasClass('_current')) {
			current = $('.prices__tabs li._current');
			current.removeClass('_current');
			if (current.attr('class').length === 0) current.removeAttr('class');
			$(this).addClass('_current');
			$('.types__content').removeClass('_current');
			$('.types__content').eq($(this).index()).addClass('_current');
		}
		$('html, body').animate({scrollTop: typesOffset - parseInt($('.header').css('height'))}, 500, 'swing');
	});

	let mySlider = new Swiper('.services__content', {
		slidesPerView: 5,
		centeredSlides: true,
		loop: true,
		speed: 500,
		grabCursor: true,
		navigation: {
			nextEl: '.services__next',
			prevEl: '.services__prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
			501: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1281: {
				slidesPerView: 5,
			}
		},
	});
	$('.service').on('click', function() {
		let num = $(this).closest('.swiper-slide').index();
		mySlider.slideTo(num, 500);
	});

	$(window).on('load resize', function() {
		let slides_height = [];
		for (let i = 0; i < $('.advantage__wrapper').length; i++) {
			let item = $('.advantage__wrapper').eq(i);
			slides_height[i] = parseFloat(item.css('height'));
		}
		$('.advantages__slider-container').css('height', maxArray(slides_height));
	});

	new Swiper('.advantages__slider-container', {
		grabCursor: true,
		slidesPerView: 1,
		direction: 'vertical',
		navigation: {
			nextEl: '.advantages__next',
			prevEl: '.advantages__prev',
		},
		pagination: {
			el: '.advantages__bullets',
			clickable: true,
		},
	});

	function maxArray(arr) {
		return Math.max.apply(null, arr);
	}

	$(window).on('load resize', function () {
		let adg = $('.advantages').offset().top;
		let clients = $('.clients').offset().top;
		let types = $('.types').offset().top;
		let scroll = $(window).scrollTop();
		if (scroll > adg - 60) {
			$('.header').removeClass('_dark');
			$('.header').addClass('_lbb');
		} else {
			$('.header').addClass('_dark');
			$('.header').removeClass('_lbb');
		}
		if (scroll > clients - 60) {
			$('.header').addClass('_dark');
			$('.header').removeClass('_lbb');
		}
		if (scroll > types - 60) {
			$('.header').removeClass('_dark');
			$('.header').addClass('_lbb');
		}
		$(window).on('scroll', function() {
			scroll = $(window).scrollTop();
			if (scroll > adg - 60) {
				$('.header').removeClass('_dark');
				$('.header').addClass('_lbb');
			}
			else {
				$('.header').addClass('_dark');
				$('.header').removeClass('_lbb');
			}
			if (scroll > clients - 60) {
				$('.header').addClass('_dark');
				$('.header').removeClass('_lbb');
			}
			if (scroll > types - 60) {
				$('.header').removeClass('_dark');
				$('.header').addClass('_lbb');
			}
		});
	});

	$(document).on('scroll', function() {
		let types = $('.types').offset().top;
		let h = document.documentElement.clientHeight;
		let label = $('.types__label');
		let scroll = $(window).scrollTop();
		let typesHeight = $('.types').css('height');
		typesHeight = parseInt(typesHeight);
		label.css('bottom', typesHeight - 50);
		let scrolled = scroll - (types - h + 50);
		if (scrolled > 0) {
			label.css('bottom', typesHeight - 30 - scrolled);
			if (typesHeight - 30 - scrolled < 70) {
				label.css('bottom', 70);
			}
		}
	});

});