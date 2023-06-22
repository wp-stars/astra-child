import Swiper, {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

// News Slider
const newsSlider = new Swiper('.ls-shortcode-news-slider', {
	modules: [Navigation],
	// Navigation arrows
	navigation: {
		nextEl: '.news-slider-swiper-button-next',
		prevEl: '.news-slider-swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
	},
	slidesPerView: 3,
	spaceBetween: 20,
	breakpoints: {
		// when window width is >= 400
		340: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		// when window width is >= 768
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		// when window width is >= 1024
		1024: {
			slidesPerView: 3,
		},
	},
});
