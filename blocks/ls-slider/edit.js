import React from 'react';
import {__} from '@wordpress/i18n';
import {useBlockProps, InnerBlocks, InspectorControls} from '@wordpress/block-editor';
import {PanelBody, PanelRow, FormToggle} from '@wordpress/components';

const Edit = ({className, attributes, setAttributes}) => {
	const {arrows, dots, logo} = attributes;
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__('Show Arrows', 'iwgplating')} initialOpen>
					<PanelRow>
						<FormToggle
							checked={arrows}
							onChange={() => setAttributes({arrows: !arrows})}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Show Dots', 'iwgplating')} initialOpen>
					<PanelRow>
						<FormToggle
							checked={dots}
							onChange={() => setAttributes({dots: !dots})}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Logo Slider', 'iwgplating')}>
					<PanelRow>
						<FormToggle
							checked={logo}
							onChange={() => setAttributes({logo: !logo})}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<section className={className}>
				<InnerBlocks
					allowedBlocks={['core/group']}
					template={[
						['core/group', {}],
					]}
					renderAppender={InnerBlocks.ButtonBlockAppender}
				/>
			</section>
		</div>
	);
};

export default Edit;
