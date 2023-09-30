document.addEventListener('DOMContentLoaded', (e) => {
	let slider = document.querySelector('.top-slider');
	let sliderCount = getSliderCount(window.innerWidth);
	window.addEventListener('resize', (e) => {
		sliderCount = getSliderCount(window.innerWidth);
	});
	slidesDuplicate(slider);
	sliderInit(slider, sliderCount, 10);
	window.addEventListener('resize', (e) => {
		sliderInit(slider, sliderCount, 10);
	});

	let isScroll = false;
	let scrollDirection = 0;
	let prevX = 0;
	let prevMoveX = 0;
	let firstCheck = true;
	slider.addEventListener('mousedown', (e) => {
		isScroll = true;
		firstCheck = true;
		prevX = e.clientX;
	});

	slider.addEventListener('mouseup', (e) => {
		isScroll = false;
	});

	let prependSlideIndex = slider.querySelectorAll('[data-slide]').length - 1;

	let sliderBody = slider.querySelector('.top-slider__body');
	slider.addEventListener('mousemove', (e) => {
		if (isScroll) {
			e.preventDefault();

			if (firstCheck) {
				if (prevX > e.clientX) {
					scrollDirection = 1;
				} else {
					scrollDirection = 0;
				}

				firstCheck = false;
			} else {
				if (e.clientX > prevMoveX) {
					scrollDirection = 0;
				} else {
					scrollDirection = 1;
				}
			}

			prevMoveX = e.clientX;

			scrollDirection ? sliderBody.scrollLeft++ : sliderBody.scrollLeft--;

			if (sliderBody.scrollLeft === 0) {
				addSlidePrev(slider, prependSlideIndex--);

				if (prependSlideIndex === -1) {
					prependSlideIndex = slider.querySelectorAll('[data-slide]').length - 1;
				}
			}
		}
	});

	let slideScrollable = getSlideScrollable(slider);

	window.addEventListener('resize', (e) => {
		slideScrollable = getSlideScrollable(slider);
	});

	const DELAY = 60;

	let sliderIndexAppend = 0;
	setTimeout(function animate() {
		sliderBody.scrollLeft++;

		let slides = slider.querySelectorAll('[data-slide]');
		let preLastSlide = slides[slides.length - 2];
		let preLastSlideBox = preLastSlide.getBoundingClientRect();

		if (preLastSlideBox.left <= window.innerWidth) {
			moveSlideToTheEnd(slider, sliderIndexAppend++);

			if (sliderIndexAppend === slides.length) {
				sliderIndexAppend = 0;
			}
		}

		setTimeout(animate, DELAY);
	}, DELAY);
});

function moveSlideToTheEnd(slider, slideIndex) {
	sliderBody = slider.querySelector('.top-slider__body');
	let slide = slider.querySelector(`[data-slide-id="${slideIndex}"]`);
	sliderBody.append(slide);
	sliderBody.scrollLeft -= slide.clientWidth + parseInt(getComputedStyle(slide).marginLeft);
	styleUpdate(slider, 10);
}

function addSlidePrev(slider, slideIndex) {
	sliderBody = slider.querySelector('.top-slider__body');
	let slide = slider.querySelector(`[data-slide-id="${slideIndex}"]`);
	sliderBody.prepend(slide);
	sliderBody.scrollLeft += slide.clientWidth + parseInt(getComputedStyle(slide).marginLeft);
	styleUpdate(slider, 10);
}

function styleUpdate(slider, spaceBetween) {
	let slides = slider.querySelectorAll('[data-slide]');
	slides.forEach((slide, index) =>
		index >= 1 ? (slide.style.marginLeft = `${spaceBetween}px`) : (slide.style.marginLeft = '')
	);
}

function getSliderCount(windowWidth) {
	if (windowWidth > 1300) {
		return 3;
	} else if (windowWidth > 1160) {
		return 2.5;
	} else if (windowWidth > 760) {
		return 2.1;
	} else if (windowWidth > 560) {
		return 1.4;
	} else {
		return 1;
	}
}

function slidesDuplicate(slider) {
	let sliderBody = slider.querySelector('.top-slider__body');
	let slides = slider.querySelectorAll('[data-slide]');
	let duplicatedSlides = Array.from(slides).map((slide) => slide.cloneNode(true));
	sliderBody.append(...duplicatedSlides);
}

function sliderInit(slider, count, spaceBetween) {
	let container = document.querySelector('.container');
	let slides = slider.querySelectorAll('[data-slide]');
	slides.forEach((slide, index) => {
		let width = getSliderWidth(getContainerWidth(container), count, spaceBetween);
		slide.style.cssText = `
			flex: 0 0 ${width}px;
			width: ${width}px;
			margin-left: ${index > 0 ? spaceBetween : 0}px;
		`;
		slide.dataset.slideId = index;
	});
}

function getSlideWidth(slider) {
	let slides = slider.querySelectorAll('[data-slide]');
	let width = 0;
	slides.forEach((slide) => {
		let sliderStyle = getComputedStyle(slide);
		width += slide.clientWidth + parseInt(sliderStyle.marginLeft);
	});
	return width;
}

function getSlideScrollable(slider) {
	return getSlideWidth(slider) - slider.clientWidth;
}

function getContainerWidth(container) {
	let containerStyle = getComputedStyle(container);
	return container.clientWidth - parseInt(containerStyle.paddingLeft) - parseInt(containerStyle.paddingRight);
}

function getSliderWidth(containerWidth, sliderCount, spaceBetween) {
	return containerWidth / sliderCount - spaceBetween * (sliderCount - 1);
}
