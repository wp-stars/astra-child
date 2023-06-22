import Swiper, {Pagination, Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const swiperSliders = document.querySelectorAll('.wp-block-ls-slider__slider');

swiperSliders.forEach((slider, key) => {
	const uniqueClass = 'ls-swiper-' + key;
	slider.classList.add(uniqueClass);
	slider.parentElement.classList.add(uniqueClass);

	const swiperOptions = {
		modules: [Navigation, Pagination],
		slideClass: 'wp-block-group',
		navigation: {
			enabled: false,
		},
		pagination:  {
			enabled: false,
		},
		freeMode: true,
		autoHeight: true,
		spaceBetween: 2,
		breakpoints: {
			// when window width is >= 400
			340: {
				slidesPerView: 1,
			},
			// when window width is >= 768
			768: {
				slidesPerView: 2,
			},
			// when window width is >= 1024
			1024: {
				slidesPerView: 3,
			},
		},
	};

	const arrowsBoolean = slider.getAttribute('data-ls-swiper-arrows');
	if (arrowsBoolean === 'true') {
		slider.parentElement.classList.add('has-arrows');
		const rightArrow = document.querySelector('.' + uniqueClass + ' .swiper-button-next');
		const leftArrow = document.querySelector('.' + uniqueClass + ' .swiper-button-prev');
		rightArrow.classList.remove('ls-hide-arrows');
		leftArrow.classList.remove('ls-hide-arrows');
		rightArrow.classList.add('swiper-button-next_' + uniqueClass);
		leftArrow.classList.add('swiper-button-prev_' + uniqueClass);

		swiperOptions['navigation'] = {
			nextEl: '.swiper-button-next_' + uniqueClass,
			prevEl: '.swiper-button-prev_' + uniqueClass,
		};
	}
	const paginationBoolean = slider.getAttribute('data-ls-swiper-dots');
	if (paginationBoolean === 'true') {
		const pagination = document.querySelector('.' + uniqueClass + ' .swiper-pagination');
		pagination.classList.remove('ls-hide-pagination');
		slider.parentElement.classList.add('has-dots');
		pagination.classList.add('swiper-pagination_' + uniqueClass);
		swiperOptions['pagination'] = {
			el: '.swiper-pagination_' + uniqueClass,
			type: 'bullets',
			dynamicBullets: true,
			dynamicMainBullets: 3,
			clickable: true,
		};
	}
	const logoBoolean = slider.getAttribute('data-ls-swiper-logo');
	if (logoBoolean === 'true') {
		swiperOptions['breakpoints'] = {
			// when window width is >= 400
			340: {
				slidesPerView: 2,
			},
			// when window width is >= 768
			768: {
				slidesPerView: 3,
			},
			// when window width is >= 1024
			1024: {
				slidesPerView: 4,
			},
		};
		swiperOptions['spaceBetween'] = 3;
	}
	new Swiper('.' + uniqueClass, swiperOptions);
});
