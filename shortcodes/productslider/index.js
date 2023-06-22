import Swiper, {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

// News Slider
const productSlider = new Swiper('.ls-shortcode-product-slider__container', {
	modules: [Navigation],
	// Navigation arrows
	navigation: {
		nextEl: '.product-slider-swiper-button-next',
		prevEl: '.product-slider-swiper-button-prev',
	},
	slidesPerView: 1,
	spaceBetween: 20,
	breakpoints: {
		768: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
	},
});
