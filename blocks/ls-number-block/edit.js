import React from 'react';
import {useBlockProps, InspectorControls, PanelColorSettings} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, TextControl} from '@wordpress/components';
import {useState} from '@wordpress/element';
import {__} from '@wordpress/i18n';

const Edit = ({attributes, setAttributes}) => {
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<Panel header="Number Block">
					<PanelBody title="Settings" initialOpen={true}>
						<PanelRow>
							<PanelColorSettings
								title={__('Color Settings', 'iwgplating')}
								colorSettings={[
									{
										value: attributes.bgColor,
										onChange: (value) => setAttributes({bgColor: value}),
										label: __('Background Color', 'iwgplating'),
									},
								]}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div className="wp-block-ls-number-block__colorbox" style={{backgroundColor: attributes.bgColor}}></div>
			<TextControl
				label={__('Number', 'iwgplating')}
				value={attributes.textNumber}
				onChange={(value) => setAttributes({textNumber: value})}
			/>
		</div>
	);
};

export default Edit;
