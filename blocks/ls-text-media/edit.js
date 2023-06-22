import React from 'react';
import {useBlockProps, InnerBlocks, BlockControls} from '@wordpress/block-editor';
import {getBlockDefaultClassName} from '@wordpress/blocks';
import {ToolbarGroup} from '@wordpress/components';
import {pullLeft, pullRight} from '@wordpress/icons';
const {__} = wp.i18n;

const Edit = ({attributes, setAttributes}) => {
	const className = getBlockDefaultClassName('ls/text-media');
	const {mediaPosition, mediaType} = attributes;

	const ALLOWED_BLOCKS = [
		'core/column',
		'core/image',
	];

	const toolbarControls = [
		{
			icon: pullLeft,
			title: __('Show media on the left', 'iwgplating'),
			isActive: mediaPosition === 'left',
			onClick: () => setAttributes({mediaPosition: 'left'}),
		},
		{
			icon: pullRight,
			title: __('Show media on the right', 'iwgplating'),
			isActive: mediaPosition === 'right',
			onClick: () => setAttributes({mediaPosition: 'right'}),
		},
	];

	return (
		<div {...useBlockProps()}>
			<BlockControls label="Options">
				<ToolbarGroup controls={toolbarControls} />
			</BlockControls>
			<div className={`${className}__${mediaPosition}`}>
				{mediaType === 'image' && <InnerBlocks
					className={`${className}__content`}
					allowedBlocks={ALLOWED_BLOCKS}
					template={[
						['core/column', {className: `${className}__column`}],
						['core/image', {sizeSlug: 'full', className: `${className}__image`}],
					]}
				/>}
			</div>
		</div>
	);
};

export default Edit;
