import {registerBlockStyle} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

domReady(() => {
	registerBlockStyle('core/columns', {
		name: 'productfinder-filter',
		label: 'Productfinder Filter',
		isDefault: false,
	});
});
