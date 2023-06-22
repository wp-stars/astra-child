import {registerBlockStyle} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import {__} from '@wordpress/i18n';

domReady(() => {
	registerBlockStyle('uagb/faq', {
		name: 'read-more',
		label: __('Read more', 'iwgplating'),
		isDefault: false,
	});
});
