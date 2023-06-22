import React from 'react';
import {useBlockProps, InnerBlocks} from '@wordpress/block-editor';
import {getBlockDefaultClassName} from '@wordpress/blocks';

const SaveFunction = ({attributes}) => {
	const {arrows, dots, logo} = attributes;
	const className = getBlockDefaultClassName('ls/slider');
	return (
		<div {...useBlockProps.save()}>
			<div className={className + '__slider swiper swiper-container'} data-ls-swiper-arrows={arrows} data-ls-swiper-dots={dots} data-ls-swiper-logo={logo}>
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
			<div className="swiper-button-prev ls-hide-arrows"></div>
			<div className="swiper-button-next ls-hide-arrows"></div>
			<div className="swiper-pagination swiper-pagination-bullets ls-hide-pagination"></div>
		</div>
	);
};

export default SaveFunction;
