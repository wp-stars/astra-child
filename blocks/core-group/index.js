import {registerBlockStyle} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

domReady(() => {
	registerBlockStyle('core/group', {
		name: 'footer',
		label: 'Footer',
		isDefault: false,
	});

	registerBlockStyle('core/group', {
		name: 'newsletter',
		label: 'Newsletter',
		isDefault: false,
	});

	registerBlockStyle('core/group', {
		name: 'card-grid',
		label: 'Card Grid',
		isDefault: false,
	});

	registerBlockStyle('core/group', {
		name: 'logo-slider',
		label: 'Logo Slider',
		isDefault: false,
	});

	registerBlockStyle('core/group', {
		name: 'productfinder-filter',
		label: 'Productfinder Filter',
		isDefault: false,
	});

	registerBlockStyle('core/group', {
		name: 'form-order-example',
		label: 'Formular Musterbestellung',
		isDefault: false,
	});

});
