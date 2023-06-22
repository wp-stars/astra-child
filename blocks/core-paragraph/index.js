import {registerBlockStyle} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

domReady(() => {
	registerBlockStyle('core/paragraph', {
		name: 'copyright',
		label: 'Copyright',
		isDefault: false,
	});
	registerBlockStyle('core/paragraph', {
		name: 'label-big',
		label: 'Label Big',
		isDefault: false,
	});
	registerBlockStyle('core/paragraph', {
		name: 'label-medium',
		label: 'Label Medium',
		isDefault: false,
	});
	registerBlockStyle('core/paragraph', {
		name: 'label-small',
		label: 'Label Small',
		isDefault: false,
	});
	registerBlockStyle('core/paragraph', {
		name: 'width-70',
		label: 'Width 70%',
		isDefault: false,
	});
});
