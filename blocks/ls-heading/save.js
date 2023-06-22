import React from 'react';
import {getBlockDefaultClassName} from '@wordpress/blocks';
import {useBlockProps, RichText} from '@wordpress/block-editor';

const Save = ({attributes: {topheadline, headline, image}}) => {
	const className = getBlockDefaultClassName('ls/heading');
	return (
		<div {...useBlockProps.save()}>
			<div className={`${className}__text`}>
				<RichText.Content
					tagName="span"
					className={`${className}__topheadline`}
					value={topheadline}
				/>
				<RichText.Content
					tagName="h2"
					className={`${className}__headline`}
					value={headline}
				/>
			</div>
			<div className={`${className}__image`}>
				<img className={`${className}__img`} alt={image} src={image} />
			</div>
		</div>
	);
};

export default Save;
