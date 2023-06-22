import React from 'react';
import {useBlockProps} from '@wordpress/block-editor';
import {getBlockDefaultClassName} from '@wordpress/blocks';

const Save = ({attributes}) => {
	const className = getBlockDefaultClassName('ls/number-block');
	return (
		<div {...useBlockProps.save()}>
			<div className={`${className}__colorbox`} style={{backgroundColor: attributes.bgColor}}></div>
			<span className={`${className}__number`}>{ attributes.textNumber }</span>
		</div>
	);
};

export default Save;
