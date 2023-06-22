import Swiper, {Controller, Thumbs} from 'swiper';
import 'swiper/css';

// Thumbnail Slider
const productGalleryThumbs = new Swiper('.ls-productdetail__gallery__thumbs', {
	spaceBetween: 20,
	slidesPerView: 2,
	freeMode: true,
	watchSlidesProgress: true,
	slideToClickedSlide: true,
});

// Gallery Slider
const productGallerySlider = new Swiper('.ls-productdetail__gallery__slider', {
	modules: [Controller, Thumbs],
	thumbs: {
		swiper: productGalleryThumbs,
	},
	control: {
		swiper: productGalleryThumbs,
	},
});
