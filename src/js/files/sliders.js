/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Parallax, Autoplay } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/


// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.main-slider__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.main-slider__slider', {
			modules: [Navigation, Pagination, Parallax, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			parallax: true,
			speed: 800,
			loop: true,

			// Пагинация
			
			pagination: {
				el: '.main-slider__slider .swiper-pagination',
				clickable: true,
			},

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.main-slider__slider .swiper-button-prev',
				nextEl: '.main-slider__slider .swiper-button-next',
			},

			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
		});
	}

	if (document.querySelector('.cards-products__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.cards-products__slider', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			speed: 600,
			loop: true,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.cards-products .swiper-button-prev',
				nextEl: '.cards-products .swiper-button-next',
			},

			// Брейкпоинты
			breakpoints: {
				320: {
					slidesPerView: 1.5,
					spaceBetween: 8,
				},
				480: {
					slidesPerView: 2.1,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1100: {
					slidesPerView: 4,
					spaceBetween: 24,
				},
			},
			// События
			on: {

			}
		});
	}

	if (document.querySelector('.partners__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.partners__slider', {
			modules: [Navigation, Autoplay],
			observer: true,
			observeParents: true,
			speed: 600,
			loop: true,

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.partners .swiper-button-prev',
				nextEl: '.partners .swiper-button-next',
			},

			// Брейкпоинты
			breakpoints: {
				320: {
					slidesPerView: 2.5,
					spaceBetween: 0,
				},
				480: {
					slidesPerView: 3,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 6,
					spaceBetween: 0,
				},
				1350: {
					slidesPerView: 6,
					spaceBetween: 24,
				},
			},

			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},

			// События
			on: {

			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});