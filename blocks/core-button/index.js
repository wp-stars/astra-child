import {registerBlockStyle, unregisterBlockStyle} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

domReady(() => {
	registerBlockStyle('core/button', {
		name: 'small-primary-button',
		label: 'Small Primary Button',
		isDefault: true,
	});

	registerBlockStyle('core/button', {
		name: 'big-primary-button',
		label: 'Big Primary Button',
	});

	registerBlockStyle('core/button', {
		name: 'small-secondary-button',
		label: 'Small Secondary Button',
	});

	registerBlockStyle('core/button', {
		name: 'big-secondary-button',
		label: 'Big Secondary Button',
	});

	registerBlockStyle('core/button', {
		name: 'small-tertiary-button',
		label: 'Small Tertiary Button',
	});

	registerBlockStyle('core/button', {
		name: 'download-button',
		label: 'Download Button',
	});

	registerBlockStyle('core/button', {
		name: 'read-more',
		label: 'Read more',
	});

	unregisterBlockStyle('core/button', 'fill');
	unregisterBlockStyle('core/button', 'outline');
});
