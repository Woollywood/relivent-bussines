document.addEventListener('DOMContentLoaded', (e) => {
	let slider = document.querySelector('.top-slider');
	let sliderCount = getSliderCount(window.innerWidth);
	window.addEventListener('resize', (e) => {
		sliderCount = getSliderCount(window.innerWidth);
	});
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
		}
	});

	let slideScrollable = getSlideScrollable(slider);

	window.addEventListener('resize', (e) => {
		slideScrollable = getSlideScrollable(slider);
	});

	let direction = 1;

	setTimeout(function animate() {
		if (direction) {
			sliderBody.scrollLeft++;

			if (sliderBody.scrollLeft >= slideScrollable) {
				direction = 0;
			}
		} else {
			sliderBody.scrollLeft--;

			if (sliderBody.scrollLeft === 0) {
				direction = 1;
			}
		}

		setTimeout(animate, 20);
	}, 20);
});

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
