import React from 'react';
import {useBlockProps, InspectorControls, InnerBlocks, BlockControls, RichText, LinkControl} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, ToolbarGroup} from '@wordpress/components';
import {getBlockDefaultClassName} from '@wordpress/blocks';
import {starEmpty, stretchFullWidth, alignLeft} from '@wordpress/icons';

const Edit = ({attributes, setAttributes}) => {
	const {contentType, linkText, link} = attributes;
	const className = getBlockDefaultClassName('ls/card');

	const ALLOWED_BLOCKS = [
		'core/heading',
		'core/paragraph',
		'core/image',
	];

	const contentControls = [
		{
			icon: alignLeft,
			title: 'Card with Image, Heading and Description',
			isActive: contentType === 'card-image-heading-description',
			onClick: () => setAttributes({contentType: 'card-image-heading-description'}),
		},
		{
			icon: stretchFullWidth,
			title: 'Card with Image and Heading',
			isActive: contentType === 'card-image-heading',
			onClick: () => setAttributes({contentType: 'card-image-heading'}),
		},
		{
			icon: starEmpty,
			title: 'Card with Link',
			isActive: contentType === 'card-link',
			onClick: () => setAttributes({contentType: 'card-link'}),
		},
	];

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<Panel header="Card Block Panel">
					<PanelBody title="Card Block Settings" initialOpen={true} className="ls-card-settings-panel">
						<PanelRow title="Set Link Text">
							<div>
								<p>Set Link Text</p>
								<RichText
									onChange = {(value) => setAttributes({linkText: value})}
									value = {attributes.linkText}
								/>
							</div>
							<div>
								<p>Enter URL (including https:// or http://</p>
								<RichText
									onChange = {(value) => setAttributes({link: value})}
									value = {attributes.link}
								/>
							</div>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup controls={contentControls} />
			</BlockControls>
			<div>
				{contentType === 'card-image-heading-description' && <InnerBlocks
					className={className + '__card-image-heading-description'}
					allowedBlocks={ALLOWED_BLOCKS}
					template={[
						['core/image', {sizeSlug: 'thumbnail'}],
						['core/heading', {content: 'Title...', level: 3}],
						['core/paragraph', {content: 'Description...'}],
					]}
					templateLock="all"
				/>}
				{contentType === 'card-link' && <InnerBlocks
					className={className + 'card-link'}
					allowedBlocks={ALLOWED_BLOCKS}
					template={[
						['core/image', {sizeSlug: 'thumbnail'}],
						['core/image', {sizeSlug: 'thumbnail'}],
						['core/heading', {content: 'Title...', level: 3}],
						['core/heading', {content: 'Subtitle...', level: 5}],
						['core/paragraph', {content: 'Description...'}],
					]}
					templateLock="all"
				/>}
				{contentType === 'card-image-heading' && <InnerBlocks
					className={className + 'card-image-heading'}
					allowedBlocks={ALLOWED_BLOCKS}
					template={[
						['core/image', {sizeSlug: 'medium'}],
						['core/heading', {content: 'Title...', level: 3}],
					]}
					templateLock="all"
				/>}
			</div>
		</div>
	);
};

export default Edit;
