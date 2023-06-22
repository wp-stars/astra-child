const primaryContent = document.querySelector('#primary');
const slider = document.querySelector('.n2-section-smartslider.slider__homepage');
slider.insertAdjacentHTML('afterend', '<div class="ls-homepage-scroll-button"><div class="icon-arrow">SCROLL</div></div>');

const scrollButton = document.querySelector('.ls-homepage-scroll-button');
scrollButton.addEventListener('click', () => {
	scroll({
		top: slider.offsetHeight + primaryContent.offsetTop,
		behavior: 'smooth',
	});
});
