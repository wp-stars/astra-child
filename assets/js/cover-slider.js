import Swiper, {Navigation, Pagination} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const coverSlider = new Swiper('.ls-cover-slider__slides', {
	modules: [Navigation, Pagination],
	navigation: {
		nextEl: '.cover-slider-swiper-button-next',
		prevEl: '.cover-slider-swiper-button-prev',
	},
	pagination: {
		el: '.cover-slider-swiper-pagination',
		type: 'fraction',
	},
	slidesPerView: 1,
	autoHeight: false,
});
