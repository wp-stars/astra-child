import React from 'react';
import {getBlockDefaultClassName} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';

const Save = ({attributes: {mediaPosition}}) => {
	const className = getBlockDefaultClassName('ls/text-media');
	return (
		<div className={`${className}__${mediaPosition}`}>
			<div className={`${className}__media_content`}>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
