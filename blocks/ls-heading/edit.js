import React from 'react';
import {useBlockProps, RichText, MediaUploadCheck, MediaUpload} from '@wordpress/block-editor';
import {getBlockDefaultClassName} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';

const Edit = ({attributes, setAttributes}) => {
	const className = getBlockDefaultClassName('ls/heading');
	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="span"
				className={`${className}__topheadline`}
				onChange={(value) => setAttributes({topheadline: value})}
				value={attributes.topheadline}
				placeholder={__('Top Headline', 'iwgplating')}
			/>
			<RichText
				tagName="h2"
				className={`${className}__headline`}
				onChange={(value) => setAttributes({headline: value})}
				value={attributes.headline}
				placeholder={__('Headline', 'iwgplating')}
			/>
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={['image']}
					multiple={false}
					value={attributes.image ? attributes.image.id : ''}
					onSelect={(image) => {
						setAttributes({image: image.sizes.thumbnail.url});
					}}
					render={({open}) => (
						attributes.image ?
							<div>
								<p>
									<img src={attributes.image} width="100%" />
								</p>

								<p>
									<div onClick={() => setAttributes({image: ''})} className="wp-block-button__image">{__('Remove Image', 'iwgplating')}</div>
								</p>
							</div> :
							<div onClick={open} className="wp-block-button__image">{__('Upload Image', 'iwgplating')}</div>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
};

export default Edit;
