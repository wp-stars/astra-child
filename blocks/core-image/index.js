import {registerBlockStyle} from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';
import {__} from '@wordpress/i18n';
import {addFilter} from '@wordpress/hooks';
import {Fragment} from '@wordpress/element';
import {InspectorControls, getColorObjectByColorValue} from '@wordpress/block-editor';
import {PanelBody, PanelRow, SelectControl, ColorPalette} from '@wordpress/components';
import {createHigherOrderComponent} from '@wordpress/compose';
import React from 'react';
const {select} = wp.data;

domReady(() => {
	registerBlockStyle('core/image', {
		name: 'icon-overlay',
		label: 'Icon overlay',
		isDefault: false,
	});
	registerBlockStyle('core/image', {
		name: 'rounded-with-background',
		label: 'Rounded with background',
		isDefault: false,
	});
});

/**
 * Add additional attributes core/image block.
 *
 * @param {Object} settings Settings for the block.
 * @param {Object} name of the Gutenberg Block
 *
 * @return {Object} settings Modified settings.
 */
function addAdditionalAttributes(settings, name) {
	// 	return default settings if it is not an image
	if (name !== 'core/image') {
		return settings;
	}

	//check if object exists for old Gutenberg version compatibility
	if (typeof settings.attributes !== 'undefined') {
		settings.attributes = Object.assign(settings.attributes, {
			bgColor: {
				type: 'string',
				default: '#FFEF00',
			},
			bgColorName: {
				type: 'string',
				default: 'iwg_yellow_CI',
			},
			bgPosition: {
				type: 'string',
				default: 'left',
			},
		});
	}
	return settings;
}
addFilter('blocks.registerBlockType', 'core/image',	addAdditionalAttributes);

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	// eslint-disable-next-line react/display-name
	return (props) => {
		if (props.name !== 'core/image') {
			return <BlockEdit {...props} />;
		}
		const colors = [
			{'name': 'Yellow (IWG)', 'color': '#FFEF00'},
			{'name': 'Dark Yellow (IWG)', 'color': '#FECA14'},
			{'name': 'Light Yellow (IWG)', 'color': '#FFFAAB'},
			{'name': 'Grey (IWG)', 'color': '#DEDCDC'},
			{'name': 'White', 'color': '#ffffff'},
			{'name': 'Black', 'color': '#000000'},
			{'name': 'Red (IWG)', 'color': '#E76E5C'},
			{'name': 'Green (IWG)', 'color': '#7DC792'},
			{'name': 'Secondary Yellow (IWG)', 'color': '#F1E27B'},
			{'name': 'Blue (IWG)', 'color': '#8CD6ED'},
			{'name': 'Darkest Grey', 'color': '#222222'},
			{'name': 'Darker Grey', 'color': '#454545'},
			{'name': 'Dark Grey', 'color': '#676767'},
			{'name': 'Medium Grey', 'color': '#898989'},
			{'name': 'Grey', 'color': '#ACACAC'},
			{'name': 'Light Grey', 'color': '#CFCFCF'},
			{'name': 'Lightest Grey', 'color': '#F9F9F9'},
		];
		const onChangeColor = (color) => {
			let colorName = '';
			if(color) {
				const settings = select('core/editor').getEditorSettings();
				const colorObject = getColorObjectByColorValue(settings.colors, color);
				if (colorObject) {
					colorName = colorObject.slug;
				}
			}
			props.setAttributes({
				bgColor: color,
				bgColorName: colorName,
			});
		};
		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__('Image & Background Position', 'iwgplating')}
						initialOpen={true}
						className="ls-panel_background-settings">
						<PanelRow>
							<SelectControl
								value={props.attributes.bgPosition}
								options={[
									{label: 'Right', value: 'right'},
									{label: 'Left', value: 'left'},
								] }
								onChange={(newBackgroundPosition) => props.setAttributes({bgPosition: newBackgroundPosition})}
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody
						title={__('Background Colors', 'iwgplating')}
						initialOpen={true}
						className="ls-panel_background-settings">
						<PanelRow>
							<ColorPalette title={__('Background Color', 'iwgplating')}
								colors={colors}
								value={props.attributes.bgColor}
								onChange={onChangeColor}
								disableCustomColors={true}
							/>
						</PanelRow>

					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withInspectorControl');
addFilter('editor.BlockEdit', 'core/image', withInspectorControls);

const addBlockClassName = (props, blockType, attributes) => {
	if (blockType.name !== 'core/image') {
		return props;
	}

	const {className} = props;
	const {bgPosition, bgColorName} = attributes;

	if (className.includes('is-style-rounded')) {
		return Object.assign(props, {
			className: `${className} ls-align-${bgPosition} ${bgColorName}`,
		});
	}
	return Object.assign(props, {
		className: `${className}`,
	});
};
addFilter('blocks.getSaveContent.extraProps', 'core/image',	addBlockClassName);
