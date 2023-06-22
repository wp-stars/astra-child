import React from 'react';
import {getBlockDefaultClassName} from '@wordpress/blocks';
import {useBlockProps, RichText} from '@wordpress/block-editor';
const {lang} = wpVars;

const Save = ({attributes: {linkTextContact, linkTextProductfinder}}) => {
	const className = getBlockDefaultClassName('ls/contactform-links');

	let link;
	if (document.documentElement.lang === 'de-AT' || document.documentElement.lang === 'de-DE') {
		link = '/productfinder';
	} else if (document.documentElement.lang === 'en-GB') {
		link = '/en/productfinder';
	} else {
		link = '/en/productfinder';
	}

	return (
		<div {...useBlockProps.save()}>
			<div className={`${className}__link-text`}>
				<div className={`${className}__inner active`}>
					<RichText.Content
						tagName="span"
						className={"icon-contact"}
						value={linkTextContact}
					/>
				</div>
			</div>
			<div className={`${className}__link-text`}>
				<a href={link} className={`${className}__inner`}>
					<RichText.Content
						tagName="span"
						className={"icon-muster"}
						value={linkTextProductfinder}
					/>
				</a>
			</div>
		</div>
	);
};

export default Save;
