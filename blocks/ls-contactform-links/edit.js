import React from 'react';
import {useBlockProps, RichText} from '@wordpress/block-editor';
import {getBlockDefaultClassName} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';

const Edit = ({attributes, setAttributes}) => {
	const className = getBlockDefaultClassName('ls/contactform-links');

	return (
		<div {...useBlockProps()}>
			<div className={`${className}__link-text`}>
				<div className={`${className}__inner`}>
					<RichText
						tagName="span"
						onChange={(value) => setAttributes({linkTextContact: value})}
						value={attributes.linkTextContact}
						placeholder={__('Text', 'iwgplating')}
					/>
				</div>
			</div>
			<div className={`${className}__link-text`}>
				<div className={`${className}__inner`}>
					<RichText
						tagName="span"
						onChange={(value) => setAttributes({linkTextProductfinder: value})}
						value={attributes.linkTextProductfinder}
						placeholder={__('Text', 'iwgplating')}
					/>
				</div>
			</div>
		</div>
	);
};

export default Edit;
