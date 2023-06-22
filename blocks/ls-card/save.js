import React from 'react';
import {useBlockProps, InnerBlocks} from '@wordpress/block-editor';
import {getBlockDefaultClassName} from '@wordpress/blocks';

const Save = ({attributes}) => {
	const {contentType, linkText, link} = attributes;
	const className = getBlockDefaultClassName('ls/card');
	const content =
		<div {...useBlockProps.save()} className={className + '__' + contentType}>
			<InnerBlocks.Content />
			{contentType === 'card-link' && link.length !== 0 &&
				<div className="link-text"><span>{linkText}</span> <i className="icon-arrow"></i></div>
			}
		</div>;

	return (
		<div className={className}>
			{link.length !== 0 && <a href={link}>{content}</a>}
			{link.length === 0 && <a>{content}</a>}
		</div>
	);
};

export default Save;
