if (document.querySelector('.top-slider__slider')) {
	new Swiper('.top-slider__slider', {
		// Указываем класс нужного слайдера
		// Подключаем модули слайдера
		// для конкретного случая
		observer: true,
		observeParents: true,
		spaceBetween: 10,
		speed: 800,
		loop: true,
		// preloadImages: false,
		// lazy: true,

		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},

		// Брейкпоинты
		breakpoints: {
			320: {
				slidesPerView: 1.2,
			},
			960: {
				slidesPerView: 2.2,
			},
			1200: {
				slidesPerView: 3,
			},
		},
	});
}
